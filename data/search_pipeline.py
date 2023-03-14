import os
import pandas as pd
import requests
from bs4 import BeautifulSoup
import time
import random

import make_genre_table

make_genre_table.make_genre_table()

def id_selector(txt, idx):
    selected_id = ''
    while True:
        if txt[idx].isdigit():
            selected_id += txt[idx]
        else:
            break
        idx += 1
    return int(selected_id)


headers = {
    'User-agent': 'daumoa'
}

if not os.path.isdir('./melon_song_data'):
    os.makedirs('./melon_song_data')

if len(os.listdir('./melon_song_data/')) >= 9:
    song_df = pd.read_excel('./melon_song_data/song_df.xlsx', index_col=0)
    artist_df = pd.read_excel('./melon_song_data/artist_df.xlsx', index_col=0)
    album_df = pd.read_excel('./melon_song_data/album_df.xlsx', index_col=0)
    song_artist_df = pd.read_excel('./melon_song_data/song_artist_df.xlsx', index_col=0)
    song_album_df = pd.read_excel('./melon_song_data/song_album_df.xlsx', index_col=0)
    song_genre_df = pd.read_excel('./melon_song_data/song_genre_df.xlsx', index_col=0)
    genre_df = pd.read_excel('./melon_song_data/genre_df.xlsx', index_col=0)
    group_artist_df = pd.read_excel('./melon_song_data/group_artist_df.xlsx', index_col=0)
    song_lyrics_df = pd.read_excel('./melon_song_data/song_lyrics_df.xlsx', index_col=0)

else:
    if input('누락된 파일이 있어, 새로운 파일을 생성합니다. 이전 데이터는 모두 초기화됩니다. 진행합니까? (y,n) >').upper() == 'Y':
        pd.DataFrame(columns= ['song_id', 'title']).to_excel('./melon_song_data/song_df.xlsx')
        pd.DataFrame(columns = ['song_id', 'genre_name']).to_excel('./melon_song_data/song_genre_df.xlsx')
        pd.DataFrame(columns = ['song_id', 'artist_id']).to_excel('./melon_song_data/song_artist_df.xlsx')
        pd.DataFrame(columns = ['song_id', 'album_id']).to_excel('./melon_song_data/song_album_df.xlsx')
        pd.DataFrame(columns = ['song_id', 'lyrics']).to_excel('./melon_song_data/song_lyrics_df.xlsx')
        pd.DataFrame(columns=['album_id', 'album_title', 'album_img_path', 'release_dt']).to_excel('./melon_song_data/album_df.xlsx')
        pd.DataFrame(columns=['artist_id', 'artist_name', 'artist_img_path', 'is_group']).to_excel('./melon_song_data/artist_df.xlsx')
        pd.DataFrame(columns=['group_id', 'artist_id']).to_excel('./melon_song_data/group_artist_df.xlsx')
        song_df = pd.read_excel('./melon_song_data/song_df.xlsx', index_col=0)
        artist_df = pd.read_excel('./melon_song_data/artist_df.xlsx', index_col=0)
        album_df = pd.read_excel('./melon_song_data/album_df.xlsx', index_col=0)
        song_artist_df = pd.read_excel('./melon_song_data/song_artist_df.xlsx', index_col=0)
        song_album_df = pd.read_excel('./melon_song_data/song_album_df.xlsx', index_col=0)
        song_genre_df = pd.read_excel('./melon_song_data/song_genre_df.xlsx', index_col=0)
        genre_df = pd.read_excel('./melon_song_data/genre_df.xlsx', index_col=0)
        group_artist_df = pd.read_excel('./melon_song_data/group_artist_df.xlsx', index_col=0)
        song_lyrics_df = pd.read_excel('./melon_song_data/song_lyrics_df.xlsx', index_col=0)
    else:
        "파일을 백업하세양"

# 장르 테이블 생성

genre_dic = {}
for i, g in zip(genre_df['genre_id'], genre_df['genre_name']):
    genre_dic[g] = i

while True:
    # 키워드 입력
    print('\n=================================================')
    keyword = input('노래 타이틀을 입력해주세용 (종료하시려면 "ㄴㄴ"입력) >>>  ')
    print('=================================================')
    
    if keyword in ['ss','ㄴㄴ']:
        print('종료합니당')
        break
    
    try:
        base_url = f'https://www.melon.com/search/total/index.htm?q={keyword}'

        search_res_bs = BeautifulSoup(requests.get(url=base_url, headers=headers).text, 'lxml')

        # 키워드 검색 결과 반환 후 선택
        
        
        print('\n=================================================')
        print('    순번  |  아티스트  |  제목    ' )
        print('=================================================')
        cnt = 1
        for tr in search_res_bs.select('#frm_searchSong > div > table > tbody > tr'):
            if cnt-1 < len(search_res_bs.select('#frm_searchSong > div > table > tbody > tr')):
                if tr.select_one('td:nth-child(3) > div > div > a.fc_gray'):
                    song_ti = tr.select_one('td:nth-child(3) > div > div > a.fc_gray').text
                else:
                    song_ti = '선택할 수 없는 노래입니다'
                
                # various artist 걸러내기
                if tr.select_one('td:nth-child(4) > div > div > a'):
                    art_name = tr.select_one('td:nth-child(4) > div > div > a').text
                else:
                    art_name = 'various artist'
                print(f'{cnt}  {art_name} - {song_ti}')
            cnt += 1
        print('=================================================')
        
        if cnt == 1:
            print('\n=================================================')
            print('키워드로 검색된 결과가 없습니다!')
            print('=================================================')
            continue
        
        print('\n=================================================')
        idx = int(input('번호를 입력해주세용 (찾는 노래가 없으면 0) >>> '))-1
        
        if idx == -1:
            continue
        
        print('=================================================')

        # 검색결과 창에서 노래 기본 정보 저장
        song_bs = search_res_bs.select('#frm_searchSong > div > table > tbody > tr')[idx]
        song_href = song_bs.select_one('td:nth-child(3) > div > div > a.fc_gray')['href']
        song_id = id_selector(song_href, song_href.rfind(',')+1)
        song_title = song_bs.select_one('td:nth-child(3) > div > div > a.fc_gray').text

        if (song_df['song_id'] == song_id).any():
            print('\n=================================================')
            print('이 노래는 중복이네요. 처음으로 돌아갑니다.')
            print('=================================================')
            continue

        print('\n=================================================')
        print('새로운 노래를 추가합니다 >>> ', song_title)
        print('=================================================')

        # 노래 제목 저장
        song_df.loc[len(song_df)] = [song_id, song_title]

        # 아티스트 목록 생성
        artist_list = []
        for art_bs in song_bs.select('td:nth-child(4) > div > div > a'):
            art_id = id_selector(art_bs['href'], art_bs['href'].find("('")+2)
            artist_list.append(art_id)

        # 앨범 제목과 id 추출
        album_href = song_bs.select_one('td:nth-child(5) > div > div > a')['href']
        album_id = id_selector(album_href, album_href.rfind("tail('")+6)

        # 노래 - 앨범 아이디 저장
        song_album_df.loc[len(album_df)] = [song_id, album_id]

        # 노래 세부정보 크롤링
        song_detail_bs = BeautifulSoup(requests.get(f'https://www.melon.com/song/detail.htm?songId={str(song_id)}', headers=headers).text, 'lxml')


        # 아티스트 목록 순회
        for artist_bs in song_bs.select('td:nth-child(4) > div > div > a'):
            
            # 아티스트 이름
            artist_name = artist_bs.text
            
            # 아티스트 ID
            artist_id = id_selector(artist_bs['href'], artist_bs['href'].find("('")+2)
            
            # 노래 - 아티스트 테이블 추가
            song_artist_df.loc[len(song_artist_df)] = [song_id, art_id]
            
            # 테이블 내에 데이터가 이미 있는 경우 다음으로 건너가기
            if (artist_df['artist_id'] == artist_id).any():
                print(f'\n{artist_name} 은(는) 이미 있지롱')
                continue
            
            # 없으면 아티스트 상세정보 크롤링
            time.sleep(random.randint(100, 170)/100)
            artist_detail = BeautifulSoup(requests.get(f'https://www.melon.com/artist/timeline.htm?artistId={str(artist_id)}', headers=headers).text, 'lxml')
            
            # 솔로든, 그룹이든 일단 대표사진 가져오기
            artist_img_path = artist_detail.select_one('#artistImgArea > img')['src']
            
            if artist_detail.select_one('#conts > div.wrap_dtl_atist > div > div.wrap_atist_info > div') == None:
                # 솔로인 경우
                artist_df.loc[len(artist_df)] = [artist_id, artist_name, artist_img_path, 0]
            
            else:
                # 그룹인 경우
                # 그룹을 아티스트 테이블에 저장
                artist_df.loc[len(artist_df)] = [artist_id, artist_name, artist_img_path, 1]
                
                # 그룹 내 아티스트를 개별적으로 추출
                for gi in artist_detail.select_one('#conts > div.wrap_dtl_atist > div > div.wrap_atist_info > div').select('a'):
                    group_artist_id = id_selector(gi['href'], gi['href'].find('l(')+2)
                    group_artist_name = gi['title']
                    group_artist_img_path = gi.select_one('img')['src'][:gi.select_one('img')['src'].find('.jpg')+4]
                    
                    # 그룹 내 아티스트 개별 저장
                    artist_df.loc[len(artist_df)] = [group_artist_id, group_artist_name, group_artist_img_path, 0]
                                
                    # 아티스트의 그룹 정보 저장
                    group_artist_df.loc[len(group_artist_df)] = [artist_id, group_artist_id]

        # 장르 추출
        genres = song_detail_bs.select_one('#downloadfrm > div > div > div.entry > div.meta > dl > dd:nth-child(6)')

        # 장르가 두 개 이상일 수 있으므로, 반점으로 스플릿하여 리스트로 반환
        for genre in genres.text.split(', '):

            # 장르 테이블에서 장르 ID 꺼내오기
            genre_id = genre_dic.get(genre)

        # 장르 정보 저장
            song_genre_df.loc[len(song_genre_df)] = [song_id, genre_id]

        # 가사 내 \n을 남기기 위해 str로 변환하여 직접 리플레이스로 줄 바꿈 적용시켜주기
        lyrics = str(song_detail_bs.select_one('#d_video_summary')).replace('<br/>', ' \\n ').replace('\n</div>', '').replace('\r','').replace('\t','')

        # 가사를 가져올 수 없는 경우(19세 노래)는 None값으로 저장됨.
        if lyrics != 'None':
            lyrics = lyrics[lyrics.index('-->')+4:]

        # 가사 정보 저장
        song_lyrics_df.loc[len(song_lyrics_df)] = [song_id, lyrics]

        # 중복 검사
        # 앨범 제목 추출
        album_title = song_detail_bs.select_one('#downloadfrm > div > div > div.entry > div.meta > dl > dd:nth-child(2) > a').text
        if not (album_df['album_id'] == album_id).any():
            
            # 노래나 앨범이나 릴리즈 데이트는 똑같으므로 앨범에 릴리즈 데이트 저장
            release_dt = song_detail_bs.select_one('#downloadfrm > div > div > div.entry > div.meta > dl > dd:nth-child(4)').text
            
            # 앨범 커버 또한 노래와 중복되므로 앨범에 저장
            album_img_path = song_detail_bs.select_one('#downloadfrm > div > div > div.thumb > a > img')['src']
            album_img_path[:album_img_path.find('jpg?')+3]
            
            # 앨범 정보 저장
            album_df.loc[len(album_df)] = [album_id, album_title, album_img_path, release_dt]
        else:
            print(f'\n{album_title} 은(는) 이미 있는 앨범이네용')

        print('입력 중...')

        song_df.to_excel('./melon_song_data/song_df.xlsx')
        song_genre_df.to_excel('./melon_song_data/song_genre_df.xlsx')
        song_artist_df.to_excel('./melon_song_data/song_artist_df.xlsx')
        song_album_df.to_excel('./melon_song_data/song_album_df.xlsx')
        song_lyrics_df.to_excel('./melon_song_data/song_lyrics_df.xlsx')
        album_df.to_excel('./melon_song_data/album_df.xlsx')
        artist_df.to_excel('./melon_song_data/artist_df.xlsx')
        group_artist_df.to_excel('./melon_song_data/group_artist_df.xlsx')
        
        print('\n=================================================')
        print(f'''{artist_name}의 <{song_title}> ({album_title} 수록) 입력 완료!
    song_id = {song_id}
    album_id = {album_id}
    artist_id = {artist_id}''')
        print('=================================================')
    except:
        print('\n=================================================')
        print('알 수 없는 오류 발생! 처음으로 돌아갑니다')
        print('=================================================')