from flask import Flask
from flask import Blueprint

from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Resource, Api



import config


db = SQLAlchemy()
migrate = Migrate()


def create_app():
    app = Flask(__name__)
    app.config.from_object(config)
    
    # ORM
    db.init_app(app)
    migrate.init_app(app, db)
    
    from . import models
    from .views import index
    
    app.register_blueprint(index.bp)
    
    
    return app