import os.path
import requests
import time
from bs4 import BeautifulSoup
import pandas as pd
import random

import make_genre_table

headers = {
    'Cookie': '__T_=1; __T_=1; PCID=16786163418833250161631; PC_PCID=16786163418833250161631; VIDEOVOLUME=0.5; __T_=1; POC=WP10; melonlogging=1000002502; wcs_bt=s_f9c4bde066b:1679219452; _T_ANO=e3E6LurO7CdAXb797Y0czhc+x4Dktbk1uYBEIA9hqaJ2plUVONXFuStaZOPJ5DaQwIwWBlQ3iBKR0E5feAkZUt7F9bcPmbkg9a8ro5GAC5SC4p5/rxp43A+j15JIfHokxP/uhsq7cea8F/3CblSEchymD5XcvpI4uvEXWMGmWBiOjFmxyeilHui5IUrcumYObhdAfzAS8wDF+zUYWDl/OM3jrHPznCWyfGKwGPHRwE14tD2+UYZDbgMRTbwr9ijPcEZuoCWeo4g4yDtuTkIm6IArNR6/jJ7+JZd+Okv0jyyoN7w+Dcavw5Hs+p6XhpuNiEXhs/YALX6wY9HYtLdpAw==',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36 Edg/110.0.1587.63'
}

make_genre_table.make_genre_table()

if os.path.isfile('./melon_song_data/song_df.xlsx'):
    song_df = pd.read_excel('./melon_song_data/song_df.xlsx', index_col=0)
    song_genre_df = pd.read_excel('./melon_song_data/song_genre_df.xlsx', index_col=0)
    song_artist_df = pd.read_excel('./melon_song_data/song_artist_df.xlsx', index_col=0)
    song_album_df = pd.read_excel('./melon_song_data/song_artist_df.xlsx', index_col=0)
    song_lyrics_df = pd.read_excel('./melon_song_data/song_lyrics_df.xlsx', index_col=0)
    album_df = pd.read_excel('./melon_song_data/album_df.xlsx', index_col=0)
    artist_df = pd.read_excel('./melon_song_data/artist_df.xlsx', index_col=0)
    group_artist_df = pd.read_excel('./melon_song_data/group_artist_df.xlsx', index_col=0)

else:
    song_df = pd.DataFrame(columns= ['song_id', 'title'])
    song_genre_df = pd.DataFrame(columns = ['song_id', 'genre_name'])
    song_artist_df = pd.DataFrame(columns = ['song_id', 'artist_id'])
    song_album_df = pd.DataFrame(columns = ['song_id', 'album_id'])
    song_lyrics_df = pd.DataFrame(columns = ['song_id', 'lyrics'])
    album_df = pd.DataFrame(columns=['album_id', 'album_title', 'album_img_path', 'release_dt'])
    artist_df = pd.DataFrame(columns=['artist_id', 'artist_name', 'artist_img_path', 'is_group'])
    group_artist_df = pd.DataFrame(columns=['group_id', 'artist_id'])


def id_selector(txt, idx):
    selected_id = ''
    while True:
        if txt[idx].isdigit():
            selected_id += txt[idx]
        else:
            break
        idx += 1
    return int(selected_id)

classCd = 'DP0200'

for age in ['2000', '2010', '2020']:
    
    for yy in range(10):
        
        year = str(int(age) + yy)
        if int(year) < 2004:
            continue
        
        for month in ['01','02','03','04','05','06','07','08','09','10','11','12']:
            
            if year == '2004' and month in ['01','02','03','04','05','06','07','08','09','10']:
                continue
                
            month_chart_url = f'https://www.melon.com/chart/search/list.htm?chartType=MO&age={age}&year={year}&mon={month}&classCd={classCd}&moved=Y'
            
            time.sleep(random.randint(10,20))
            
            # 월간 차트 조회
            month_chart_req = requests.get(month_chart_url, headers=headers)

            chart_bs = BeautifulSoup(month_chart_req.text, 'lxml')

            for song_rank in range(100):

                if song_rank >= 50:
                    lst = '100'
                    
                if song_rank >= 50:
                    i = song_rank-50
                else:
                    i = song_rank

                try:
                    for rank_no in ['1','2', '3']:
                        lst = '50'
                        if i >= 50:
                            i = i-50
                            lst = '100'
                        chart_obj = chart_bs.findAll('tr', { 'class' : f'lst{lst}'})[i].find('div', {'class' : f'ellipsis rank0{rank_no}'})

                        # 노래 id 추출  
                        if rank_no == '1':
                            chart_obj = str(chart_obj)
                            s_idx = chart_obj.find(",'")+2
                            song_id = id_selector(chart_obj, s_idx)
                            
                        # 아티스트 id 추출
                        elif rank_no == '2':
                            chart_obj = chart_obj.select('a')
                            chart_obj = chart_obj[:len(chart_obj)//2]
                            for one in chart_obj:
                                art_str = str(one['href'])
                                art_idx = art_str.find("('")+2
                                artist_id = id_selector(art_str, art_idx)
                                song_artist_df.loc[len(song_artist_df)] = [song_id, artist_id]
                        
                        # 앨범 id 추출
                        elif rank_no == '3':
                            album_str = str(chart_obj.select_one('a')['href'])
                            a_idx = album_str.find("('")+2
                            album_id = id_selector(album_str, a_idx)
                            song_album_df.loc[len(song_artist_df)] = [song_id, album_id]
                    
                    # 노래 중복 검사
                    if (song_df['song_id'] == song_id).any():
                        print('이 노래 중복임 ㅋ')
                        continue
                    elif s_idx == 1:
                        print('정보 수집이 불가능한 노래!')
                        continue
                    
                    # 크롤링의 시간차 두기
                    else:
                        time.sleep(random.randint(100, 170)/100)
                        
                    # 노래 detail 페이지 저장
                    song_detail_bs = BeautifulSoup(requests.get(f'https://www.melon.com/song/detail.htm?songId={str(song_id)}', headers=headers).text, 'lxml')

                    # 노래 제목
                    song_title = song_detail_bs.select_one('#downloadfrm > div > div > div.entry > div.info > div.song_name').text.replace('\r','').replace('\n', '').replace('\t', '').replace('곡명', '')
                    # song 테이블 저장
                    song_df.loc[len(song_df)] = [song_id, song_title]

                    # 아티스트가 여럿일 수 있으니, 순회하며 저장
                    artist_list = song_detail_bs.select('#downloadfrm > div > div > div.entry > div.info > div.artist > a')

                    for artist_idx in range(len(artist_list)):
                        artist = artist_list[artist_idx]
                        
                        # 아티스트 이름
                        artist_name = artist['title']
                        artist_id = id_selector(artist['href'], artist['href'].index("('")+2)

                        # 테이블 내에 데이터가 이미 있는 경우 다음으로 건너가기
                        if (artist_df['artist_id'] == artist_id).any():
                            print(f'{artist_name}은 이미 있지롱')
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
                    genre = song_detail_bs.select_one('#downloadfrm > div > div > div.entry > div.meta > dl > dd:nth-child(6)')

                    # 장르가 두 개 이상일 수 있으므로, 반점으로 스플릿하여 리스트로 반환
                    if ', ' in genre.text:
                        genres = genre.text.split(', ')
                    else:
                        genres = [genre.text]

                    # 장르 정보 저장
                    for g in genres:
                        song_genre_df.loc[len(song_genre_df)] = [song_id, g]
                    
                    # 가사 내 \n을 남기기 위해 str로 변환하여 직접 리플레이스로 줄 바꿈 적용시켜주기
                    lyrics = str(song_detail_bs.select_one('#d_video_summary')).replace('<br/>', ' \\n ').replace('\n</div>', '').replace('\r','').replace('\t','')

                    # 가사를 가져올 수 없는 경우(19세 노래)는 None값으로 저장됨.
                    if lyrics != 'None':
                        lyrics = lyrics[lyrics.index('-->')+4:]

                    # 가사 정보 저장
                    song_lyrics_df.loc[len(song_lyrics_df)] = [song_id, lyrics]
                    
                    # 중복 검사
                    if not (album_df['album_id'] == album_id).any():
                        
                        # 앨범 제목 추출
                        album_title = song_detail_bs.select_one('#downloadfrm > div > div > div.entry > div.meta > dl > dd:nth-child(2) > a').text

                        # 노래나 앨범이나 릴리즈 데이트는 똑같으므로 앨범에 릴리즈 데이트 저장
                        release_dt = song_detail_bs.select_one('#downloadfrm > div > div > div.entry > div.meta > dl > dd:nth-child(4)').text
                        
                        # 앨범 커버 또한 노래와 중복되므로 앨범에 저장
                        album_img_path = song_detail_bs.select_one('#downloadfrm > div > div > div.thumb > a > img')['src']
                        album_img_path[:album_img_path.find('jpg?')+3]
                        
                        # 앨범 정보 저장
                        album_df.loc[len(album_df)] = [album_id, album_title, album_img_path, release_dt]
                
                    print(f'{year} - {month} - {i} 성공')
                
                except:
                    print(f'{year} - {month} - {i} 번째 오류 발생')
                
                
            # 월간 단위로 끊어서 엑셀로 저장
            song_df.to_excel('./data/song_df.xlsx')
            song_genre_df.to_excel('./data/song_genre_df.xlsx')
            song_artist_df.to_excel('./data/song_artist_df.xlsx')
            song_album_df.to_excel('./data/song_album_df.xlsx')
            song_lyrics_df.to_excel('./data/song_lyrics_df.xlsx')
            album_df.to_excel('./data/album_df.xlsx')
            artist_df.to_excel('./data/artist_df.xlsx')
            group_artist_df.to_excel('./data/group_artist_df.xlsx')
        
        # 연간 단위로 끊어서도 저장
        song_df.to_excel('./y_data/song_df.xlsx')
        song_genre_df.to_excel('./y_data/song_genre_df.xlsx')
        song_artist_df.to_excel('./y_data/song_artist_df.xlsx')
        song_album_df.to_excel('./y_data/song_album_df.xlsx')
        song_lyrics_df.to_excel('./y_data/song_lyrics_df.xlsx')
        album_df.to_excel('./y_data/album_df.xlsx')
        artist_df.to_excel('./y_data/artist_df.xlsx')
        group_artist_df.to_excel('./y_data/group_artist_df.xlsx')