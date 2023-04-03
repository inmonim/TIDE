import os.path
import requests
import time
from bs4 import BeautifulSoup
import pandas as pd
import random

# import make_genre_table

headers = {
    'Cookie': '__T_=1; __T_=1; PCID=16786163418833250161631; PC_PCID=16786163418833250161631; VIDEOVOLUME=0.5; __T_=1; POC=WP10; melonlogging=1000002502; wcs_bt=s_f9c4bde066b:1679219452; _T_ANO=e3E6LurO7CdAXb797Y0czhc+x4Dktbk1uYBEIA9hqaJ2plUVONXFuStaZOPJ5DaQwIwWBlQ3iBKR0E5feAkZUt7F9bcPmbkg9a8ro5GAC5SC4p5/rxp43A+j15JIfHokxP/uhsq7cea8F/3CblSEchymD5XcvpI4uvEXWMGmWBiOjFmxyeilHui5IUrcumYObhdAfzAS8wDF+zUYWDl/OM3jrHPznCWyfGKwGPHRwE14tD2+UYZDbgMRTbwr9ijPcEZuoCWeo4g4yDtuTkIm6IArNR6/jJ7+JZd+Okv0jyyoN7w+Dcavw5Hs+p6XhpuNiEXhs/YALX6wY9HYtLdpAw==',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36 Edg/110.0.1587.63'
}

# make_genre_table.make_genre_table()

song_album_df = pd.DataFrame(columns=['song_id', 'album_id'])


def id_selector(txt, idx):
    selected_id = ''
    while True:
        if txt[idx].isdigit():
            selected_id += txt[idx]
        else:
            break
        idx += 1
    return int(selected_id)

classCd = 'KPOP'

for age in ['1990', '2000', '2010', '2020']:
    
    for yy in range(10):
        if classCd == 'break':
            break
        
        year = str(int(age) + yy)
        
        for month in ['01','02','03','04','05','06','07','08','09','10','11','12']:
            
            if age == '2000' and yy == 4 and month == '11':
                classCd = 'DP0000'
            elif age == '2010' and yy == 8:
                classCd = 'GN0000'
            elif age == '2020' and yy == 3 and month == '04':
                classCd = 'break'
                break
                
            month_chart_url = f'https://www.melon.com/chart/search/list.htm?chartType=MO&age={age}&year={year}&mon={month}&classCd={classCd}&moved=Y'
            
            time.sleep(random.random())
            
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
                            
                        
                        # 앨범 id 추출
                        elif rank_no == '3':
                            album_str = str(chart_obj.select_one('a')['href'])
                            a_idx = album_str.find("('")+2
                            album_id = id_selector(album_str, a_idx)
                            song_album_df.loc[len(song_album_df)] = [song_id, album_id]
                
                    print(f'{year} - {month} - {i} 성공')
                
                except:
                    print(f'{year} - {month} - {i} 번째 오류 발생')
                
                
            # 월간 단위로 끊어서 엑셀로 저장
            song_album_df.to_excel('./song_album_df.xlsx')
            song_album_df.to_csv('./song_album_df.csv')
        
        # 연간 단위로 끊어서도 저장
        song_album_df.to_excel('./song_album_df.xlsx')
        song_album_df.to_csv('./song_album_df.csv')