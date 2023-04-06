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


class SongCategory(db.Model):
    
    __tablename__ = 'song_category'
    
    id = Column(Integer, primary_key=True)
    song_id = Column(Integer)
    sadly = Column(Integer)
    calm = Column(Integer)
    love = Column(Integer)
    farewell = Column(Integer)
    cool = Column(Integer)
    myway = Column(Integer)
    commic = Column(Integer)
    anger = Column(Integer)
    exciting = Column(Integer)
    
    def as_list(self):
        return [self.sadly, self.calm, self.love, self.farewell, self.cool, self.myway, self.commic, self.anger, self.exciting]

class SongCategoryVotedUser(db.Model):
    
    __tablename__ = 'song_category_voted_user'
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    song_id = Column(Integer)
    user_id = Column(Integer)
    
    
class TextFeedback(db.Model):
    
    __tablename__ = 'text_feedback'
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer)
    text = Column(Text)
    emotion_label = Column(Integer)