from server import db

class Admins(db.Model):
    __tablename__ = "Admin"
    user_id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    history = db.relationship('History', backref="has_history", lazy=True)
    
    def __repr__(self):
        return f'Admin {self.name}'

    """
    1. jalanin userrole dulu
    ADD
    admin = Admins(user_id=3, name="Admin")
    
    """