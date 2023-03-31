from flask import Blueprint, Response, json, request
from flask_restful import fields, Resource, Api

import pandas as pd

from recommend.models import Song, Artist, Album, SongAlbum, SongArtist, SongEmotionKeyword

bp = Blueprint('main', __name__, url_prefix='/api/v1/')

api = Api(bp)


class MusicRecommend(Resource):
    def get(self):
        song_emotion_keyword = SongEmotionKeyword.query.all()
        print(song_emotion_keyword)
        return {'a' : 1}
        
api.add_resource(MusicRecommend, '/')