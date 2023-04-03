user = 'root'
password = '3xlasql'
host = 'J8E203.p.ssafy.io'
port = 3306
database = 'music'

SQLALCHEMY_DATABASE_URI = f'mysql+pymysql://{user}:{password}@{host}:{port}/{database}?charset=utf8mb4'
SQLALCHEMY_TRACK_MODIFICATIONS = False