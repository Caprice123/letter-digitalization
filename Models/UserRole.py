from server import db, brcypt
from flask_login import UserMixin



class UserRole(db.Model, UserMixin):
    __tablename__ = 'UserRole'
    id = db.Column(db.Integer(), primary_key=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    password_hash = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(255), nullable=False)
    
    
    @property
    def password(self):
        return self.password_hash
    
    @password.setter
    def password(self, plain_text_password):
        self.password_hash = brcypt.generate_password_hash(plain_text_password).decode('utf-8')
        # self.password_hash = plain_text_password
    
    
    def __repr__(self):
        return f"User : {self.email}"
            
    """
    ADD
    new_user = UserRole(email="abc", password="admin123", role_id=1)
    new_user1 = UserRole(email="a", password="teacher123", role_id=2)
    new_user2 = UserRole(email="z", password="student123", role_id=3)
    
    UPDATE
    new_user.password = "ada123"
    
    """
    
    
    