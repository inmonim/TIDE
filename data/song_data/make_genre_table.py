import pandas as pd
import os

def make_genre_table():
    if not os.path.isfile('./melon_song_data/genre_df.xlsx'):
        genre_df = pd.DataFrame(columns=['genre_id', 'genre_name'])

        genre_list = [
            [101, '발라드'],
            [102, '포크/블루스'],
            [103, '성인가요/트로트'],
            [104, '록/메탈'],
            [105, '국내영화'],
            [106, '댄스'],
            [107, '국내드라마'],
            [108, '뉴에이지'],
            [109, '클래식'],
            [110, '크로스오버'],
            [111, '교향/관현악'],
            [112, '랩/힙합'],
            [113, '-'],
            [114, '재즈'],
            [115, '보컬재즈'],
            [116, '인디음악'],
            [117, 'R&B/Soul'],
            [118, '애시드/퓨전/팝'],
            [119, '애니메이션/웹툰'],
            [120, 'POP'],
            [121, '일렉트로니카'],
            [122, 'J-POP'],
            [123, 'CCM'],
            [124, '국내CCM'],
            [125, '워십'],
            [126, '찬송가'],
            [127, '게임'],
            [128, '키즈'],
            [129, '만화'],
            [130, '국외영화'],
            [131, '국내뮤지컬']
        ]

        for x,y in genre_list:
            genre_df.loc[len(genre_df)] = [x, y]
            
        genre_df.to_excel('./melon_song_data/genre_df.xlsx')