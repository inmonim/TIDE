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
    ten_emotion = ten_emotion.iloc[1600:,:]
    t3_emotion_keysen = pd.read_sql_table('song_emotion_keyword', con=conn, index_col=0)
    t3_emotion_keysen = t3_emotion_keysen.iloc[1600: , :]
    print('[song_10emtion, song_emotion_keyword] data load')
    return ten_emotion, t3_emotion_keysen


emotion_message = {
    '1' : '오늘은 화나는 일이 있었나요? 신나는 음악을 알려드릴게요!',
    '2' : '화가 많이 나셨군요 ㅠㅠ 릴렉스 할 수 있는 음악을 알려드릴게요.',
    '3' : '슬픈 일이 있으셨나요? 편하게 음악과 함께 릴렉스 해보는 건 어떨까요?',
    '4' : '절망적인 날을 보내셨나봐요... 기운이 나는 노래를 알려드릴게요.',
    '5' : '많이 당황하셨군요! 노래와 함께 웃으며 진정해보는 건 어떨까요?',
    '6' : '걱정스러운 일이 있으신가요? '
}