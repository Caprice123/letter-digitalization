from server import db

class Students(db.Model):
    __tablename__ = 'Student'
    user_id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    nim = db.Column(db.String(10), nullable=False)
    jurusan = db.Column(db.String(255), nullable=False)
    records = db.relationship('Records', backref='has_record', lazy=True)
    
    def __repr__(self):
        return f'Student {self.name}'
    
    
    """
    from server import db
    from Models.Students import *
    no1 = Students(user_id=1,name="Richie",nim=2301919001, batch=23, jurusan=ARE)
    
    newRecord = Records(category_id = 1, category_name="surat", path_format="")
    no1.record.append(newRecord)
    no1.records.append(new_rec)
    db.session.add(no1)
    db.session.add(newRecord)
    db.session.commit()

    """
    