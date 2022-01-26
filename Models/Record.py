from server import db
from datetime import datetime


class Records(db.Model):
    __tablename__ = "Records"
    record_id = db.Column(db.Integer(), primary_key=True)
    sent_by_user_id = db.Column(db.Integer(), db.ForeignKey('Student.user_id'), nullable=False)
    category_id = db.Column(db.Integer(), db.ForeignKey('Category.category_id'), nullable=False)
    jurusan = db.Column(db.String(255), nullable=False)
    
    status = db.Column(db.String(255), nullable=False, default="sent")
    last_updated_by = db.Column(db.String(1000), nullable=False, default="")
    date_sent = db.Column(db.String(20), nullable=False)
    date_updated = db.Column(db.String(20))
    
    
    def __repr__(self):
        return f"Record ID : {self.record_id} category: {self.category_id}"
    
    
    """
    ADD
    new_rec = Records(sent_by_user_id=1, category_id=1, title="internship", status="sent", description="testing")
    
    SEARCH category_id
    new_rec.category_id
    
    SEARCH who has record
    new_rec.has_record
    
    SEARCH name category
    new_rec.category
    
    UPDATE
    new_rec.date_sent = "2021-11-19"
    
    """
