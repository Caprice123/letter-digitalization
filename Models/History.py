from server import db
from datetime import datetime

class History(db.Model):
    __tablename__ = "History"
    id = db.Column(db.Integer, primary_key=True)
    admin_id = db.Column(db.Integer, db.ForeignKey("Admin.user_id"), nullable=False)
    description = db.Column(db.String(1000), nullable=False)
    date = db.Column(db.String(20), nullable=False, default=str(datetime.now().strftime('%Y/%m/%d  %H:%M:%S')))
    
    
    def __repr__(self):
        return f"History {self.id} : {self.description}"
    