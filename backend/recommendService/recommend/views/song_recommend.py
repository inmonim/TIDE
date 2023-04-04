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
    def post(self):
        
        txt = request.json['content']
        
        try:
            response = {}
            
            emotion_list_1 = emotion_predict(model_1, txt)
            emotion_list_2 = emotion_predict(model_2, txt)
            
            t3_model_1_song_id = recommend_song(t3_emotion_keysen, emotion_list_1)
            t3_model_2_song_id = recommend_song(t3_emotion_keysen, emotion_list_2)
        
                
            # 중요!
            # 아래 song_id_list와 song_cls는 매핑되는 관계이므로, 순서를 잘 맞춰줘야 함! 
            song_id_list = recommend_cosine(ten_emotion, emotion_list_2) + recommend_cosine(ten_emotion, emotion_list_1) + [t3_model_2_song_id, t3_model_1_song_id]
            song_cls = ['model1CosineTop', 'model2CosineTop', 'model1T3Top', 'model2T3Top']
            recommend_list = {}
            
            cnt = 0
            for i in song_id_list:
                
                song_dict = {}
                
                cls_nm = song_cls[cnt]
            
                song = Song.query.filter(Song.song_id==i).first()
                
                song_dict['songId'] = song.song_id
                song_dict['title'] = song.title
                
                album = SongAlbum.query.filter(SongAlbum.song_id==i).first()
                
                try:
                    album = album.album
                    song_dict['albumTitle'] = album.album_title
                    song_dict['albumImgPath'] = album.album_img_path
                except:
                    song_dict['albumTitle'] = 'unknown album'
                    song_dict['albumImgPath'] = 'unknown_img'
                    
                    
                artists = SongArtist.query.filter(SongArtist.song_id==i).all()
                artist_list = []
                for ar in artists:
                    try:
                        ar = ar.artist
                        artist_nm = ar.artist_name
                    except:
                        artist_nm = 'unknown artist'
                        
                    artist_list.append(artist_nm)
                song_dict['artist'] = artist_list
                    
                recommend_list[f'song_{cls_nm}'] = song_dict
                cnt += 1
            
            response = {'song_list' : recommend_list, }
            
            response = Response(json.dumps(response, ensure_ascii=False), headers=({'Access-Control-Allow-Origin': '*'}), content_type='application/json; charset=utf-8', status=200)
            return response
        except AttributeError:
            return Response(json.dumps({'error' : '노래 데이터 불러오기를 실패했습니다.'}, ensure_ascii=False), content_type='application/json; charset=utf-8', status=404)
        except NameError:
            return Response(json.dumps({'error' : '모듈 불러오기에 실패했습니다. 관리자에게 문의 바랍니다.'}, ensure_ascii=False), content_type='application/json; charset=utf-8', status=500)
        except:
            return Response(json.dumps({'error' : '알 수 없는 오류가 발생했습니다. 관리자에게 문의 바랍니다.'}, ensure_ascii=False), content_type='application/json; charset=utf-8', status=500)


class RefreshDf(Resource):
    def get(self):
        global ten_emotion, t3_emotion_keysen
        ten_emotion, t3_emotion_keysen = refresh_df()
        print(ten_emotion.tail())
        return {'status': 200, 'message': '음악 감정 분석 테이블 수정이 완료되었습니다.'}


api.add_resource(MusicRecommend, '/diarymusic')
api.add_resource(RefreshDf, '/refresh')