from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

import pandas as pd
import torch

import config

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    CORS(app, resources={r"/api/*" : {"origins" : '*'}})
    
    app.config.from_object(config)
    
    #ORM 활성화
    db.init_app(app)
    
    from .views import song_recommend, feedback
    app.register_blueprint(song_recommend.bp)
    app.register_blueprint(feedback.bp)
    
    return app