from recommend import db

class Test_table(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(45))

class Test_table_2(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    test_table_id = db.Column(db.Integer, db.ForeignKey('test_table.id', ondelete='CASCADE'))
    test_table = db.relationship('Test_table', backref=db.backref('test_table_2_set', cascade='all, delete-orphan'))
    content = db.Column(db.String(45))
