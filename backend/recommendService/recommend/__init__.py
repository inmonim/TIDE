from flask import Flask
from flask_sqlalchemy import SQLAlchemy

import pandas as pd
import torch

import config

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config.from_object(config)
    
    #ORM 활성화
    db.init_app(app)
    
    from .views import song_recommend
    app.register_blueprint(song_recommend.bp)
    
    return app