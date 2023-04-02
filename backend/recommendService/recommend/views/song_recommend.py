from flask import Blueprint, Response, json, request
from flask_restful import fields, Resource, Api

import pandas as pd


from recommend.models import Song, Artist, Album, SongAlbum, SongArtist
from recommend.ai_modules import emotion_predict, recommend_cosine, emotion_rank, recommend_song, load_model_1, load_model_2
from recommend.data_module import refresh_df

bp = Blueprint('main', __name__, url_prefix='/api/v1/')
api = Api(bp)


@bp.before_app_first_request
def load_data():
    global ten_emotion, t3_emotion_keysen, model_1, model_2
    ten_emotion, t3_emotion_keysen = refresh_df()
    model_1, model_2 = load_model_1(), load_model_2()

class MusicRecommend(Resource):
    def get(self, txt):
        try:
            response = {}
            
            emotion_list_1 = emotion_predict(model_1, txt)
            emotion_list_2 = emotion_predict(model_2, txt)
            
            t3_model_1_song_id = recommend_song(t3_emotion_keysen, emotion_list_1)
            t3_model_2_song_id = recommend_song(t3_emotion_keysen, emotion_list_2)
            
            song_id_list = recommend_cosine(ten_emotion, emotion_list_1) + recommend_cosine(ten_emotion, emotion_list_2) + [t3_model_1_song_id, t3_model_2_song_id]
            recom_song_one = []
            
            song_cls = ['model_1_cosine_top', 'model_2_cosine_top', 'model_1_t3_top', 'model_2_t3_top']
            cnt = 0
            for i in song_id_list:
            
                song = Song.query.filter(Song.song_id==i).first()
                
                song_dict = {}
                song_dict['song_id'] = song.song_id
                song_dict['title'] = song.title
                
                album = SongAlbum.query.filter(SongAlbum.song_id==i).first()
                
                album_dict = {}
                try:
                    album = album.album
                    album_dict['album_id'] = album.album_id
                    album_dict['album_title'] = album.album_title
                    album_dict['album_img_paht'] = album.album_img_path
                except:
                    album_dict['album_id'] = 404
                    album_dict['album_title'] = 'unknown album'
                    album_dict['album_img_paht'] = 'unknown_img'
                    
                    
                artists = SongArtist.query.filter(SongArtist.song_id==i).all()
                artist_list = []
                for ar in artists:
                    
                    artist = {}
                    
                    try:
                        ar = ar.artist
                        artist['artist_id'] = ar.artist_id
                        artist['artist_name'] = ar.artist_name
                    except:
                        artist['artist_id'] = 404
                        artist['artist_name'] = 'unknown artist'
                        
                    artist_list.append(artist)
                    
                recom_song_one.append({f'song_{song_cls[cnt]}' : {'song' : song_dict, 'album' : album_dict, 'artists' : artist_list}})
                cnt += 1
            
            response['recommend_song_list'] = recom_song_one
            
            response = Response(json.dumps(response, ensure_ascii=False), content_type='application/json; charset=utf-8', status=200)
            return response
        # except AttributeError:
            # return Response(json.dumps({'error' : '노래 데이터 불러오기를 실패했습니다.'}, ensure_ascii=False), content_type='application/json; charset=utf-8', status=404)
        except NameError:
            return Response(json.dumps({'error' : '모듈 불러오기에 실패했습니다. 관리자에게 문의 바랍니다.'}, ensure_ascii=False), content_type='application/json; charset=utf-8', status=500)
        # except:
        #     return Response(json.dumps({'error' : '알 수 없는 오류가 발생했습니다. 관리자에게 문의 바랍니다.'}, ensure_ascii=False), content_type='application/json; charset=utf-8', status=500)


# class RefreshDf(Resource):
#     def get(self):
#         global ten_emotion, t3_emotion_keysen
#         ten_emotion, t3_emotion_keysen = refresh_df()
#         print(ten_emotion.tail())
#         return {'ok':200}


api.add_resource(MusicRecommend, '/<txt>')
# api.add_resource(RefreshDf, '/refresh')