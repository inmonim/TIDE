from flask import Flask, Blueprint, Response, json, g
from flask_sqlalchemy import SQLAlchemy

import pandas as pd


import config


db = SQLAlchemy()


from . import modules
module = modules()


def create_app():
    app = Flask(__name__)
    app.config.from_object(config)
    
    #ORM 활성화
    db.init_app(app)
    
    from . import models
    
    from .views import song_recommend
    
    app.register_blueprint(song_recommend.bp)
    
    
    @app.before_first_request
    def load_data():
        conn = db.engine.connect()
        g.data = pd.read_sql_table('song_emotion_keyword', conn)
    
    
    @app.route('/')
    def test():
        return ''
    
    return app