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
    ten_emotion = ten_emotion.iloc[:,:]
    
    t3_emotion_keysen = pd.read_sql_table('song_emotion_keyword', con=conn, index_col=0)
    t3_emotion_keysen = t3_emotion_keysen.iloc[: , :]
    
    
    song_category = pd.read_sql_table('song_category', con=conn, index_col=0)
    song_category = song_category.drop(columns=['id','song_title', 'artist_name'])
    result = pd.DataFrame(columns = song_category.columns)
    for i in range(len(song_category)):
        if sum(song_category.iloc[i, 2:11]):
            result.loc[len(result),:] = song_category.iloc[i, :]
            
    print('[song_10emtion, song_emotion_keyword, song_category] data load')
    
    return ten_emotion, t3_emotion_keysen, result


# def refresh_song_category_df():
#     conn = engine_create()
#     song_category = pd.read_sql_table('song_category', con=conn, index_col=0)
#     song_category = song_category.drop(columns=['song_title', 'artist_name'])
    
#     result = pd.DataFrame(columns = song_category.columns)

#     for i in range(len(song_category)):
#         if sum(song_category.iloc[i, 2:11]):
#             result.loc[len(result),:] = song_category.iloc[i, :]
            
#     return result





emotion_message = {
    0 : '오늘은 화나는 일이 있었나요? 이렇게 된 거, 분노를 한 번 터뜨려 볼까요!',
    1 : '화가 많이 나셨군요 ㅠㅠ 릴렉스 할 수 있는 음악을 알려드릴게요.',
    2 : '슬픈 일이 있으셨나요? 노래와 함께 조금 울어볼까요?.',
    3 : '절망적인 날을 보내셨나봐요... 기운이 나는 노래를 알려드릴게요.',
    4 : '많이 당황하셨군요! 노래와 함께 웃으며 진정해보는 건 어떨까요?',
    5 : '걱정스러운 일이 있으신가요? 걱정은 떨쳐버릴 수 있는 당당한 노래를 알려드릴게요.',
    6 : '때로는 컴플렉스가 생길 수 있다고 생각해요. 이럴 때는 .',
    7 : '상처가 된 날이었나봐요. 노래로 위로를 받아보는 건 어떨까요?',
    8 : '사랑이 느껴져요! 더욱 더 사랑스러운 노래를 들어봐요!',
    9 : '행복함이 느껴지네요! 노래와 함께 이 행복을 더욱 즐겨봐요!',
    10 : '두 번째로는 분노가 느껴져요!',
    11 : '두 번째로는 악의가 느껴져요!',
    12 : '두 번째로는 슬픔이 느껴져요!',
    13 : '두 번째로는 절망스러움이 느껴져요!',
    14 : '두 번째로는 당황스러움이 느껴져요!',
    15 : '두 번째로는 걱정스러움이 느껴져요!',
    16 : '두 번째로는 컴플렉스가 느껴져요!',
    17 : '두 번째로는 상처 받은 게 느껴져요!',
    18 : '두 번째로는 사랑이 느껴져요!',
    19 : '두 번째로는 행복이 느껴져요!',
    
}