import pandas as pd
from urllib.parse import quote
from sqlalchemy import create_engine


def engine_create():
    user = 'root'
    password = '3xlasql'
    host = 'J8E203.p.ssafy.io'
    port = 3306
    database = 'music'

    db_uri = f'mysql+pymysql://{user}:{password}@{host}:{port}/{database}?charset=utf8mb4'
    engine = create_engine(db_uri, echo=True)

    return engine.connect()


def refresh_df():
    conn = engine_create()
    ten_emotion = pd.read_sql_table('song_10emotion', con=conn, index_col=0)
    t3_emotion_keysen = pd.read_sql_table('song_emotion_keyword', con=conn, index_col=0)
    print('[song_10emtion, song_emotion_keyword] data load')
    return ten_emotion, t3_emotion_keysen
