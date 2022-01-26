from server import db

class Teachers(db.Model):
    __tablename__ = 'Teacher'
    user_id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(255), nullable=False) 
    jurusan = db.Column(db.String(255))
    can_see_records = db.Column(db.Boolean, nullable=False, default=False)
    
    def __repr__(self):
        return f'Teacher {self.name}'


    """
    ADD
    new_teacher = Teachers(user_id=2, name="Endra", role="HOP ARE")
    
    UPDATE
    new_teacher.name = "Endra, M.E"
    
    """
    