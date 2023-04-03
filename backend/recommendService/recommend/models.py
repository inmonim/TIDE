from recommend import db
from sqlalchemy import Column, Integer, String, ForeignKey, Text
from sqlalchemy.orm import relationship



class Song(db.Model):
    
    __tablename__ = 'song'
    
    id = Column(Integer, primary_key=True)
    song_id = Column(Integer)
    title = Column(String(100))
    video_id = Column(String(100))
    
class Artist(db.Model):
    
    __tablename__ = 'artist'

    id = Column(Integer, primary_key=True)
    artist_id = Column(Integer)
    artist_name = Column(String(70))
    artist_img_path = Column(Text)

class Album(db.Model):
    
    __tablename__ = 'album'
    
    id = Column(Integer, primary_key=True)
    album_id = Column(Integer)
    album_title = Column(String(80))
    album_img_path = Column(Text)
    release_dt = Column(String(20))
    
class SongEmotionKeyword(db.Model):
    
    __tablename__ = 'song_emotion_keyword'
    
    id = Column(Integer, primary_key=True)
    song_id = Column(Integer)
    emotion_1 = Column(Integer)
    emotion_2 = Column(Integer)
    emotion_3 = Column(Integer)
    key_sentence = Column(Text)


class SongArtist(db.Model):
    
    __tablename__ = 'song_artist'
    
    id = Column(Integer, primary_key=True)
    song_id = Column(Integer, ForeignKey('song.song_id', ondelete='CASCADE'))
    artist_id = Column(Integer, ForeignKey('artist.artist_id', ondelete='CASCADE'))
    artist = relationship('Artist')

class SongAlbum(db.Model):
    
    __tablename__ = 'song_album'
    
    id = Column(Integer, primary_key=True)
    song_id = Column(Integer, ForeignKey('song.song_id', ondelete='CASCADE'))
    album_id = Column(Integer, ForeignKey('album.album_id', ondelete='CASCADE'))
    album = relationship('Album')


