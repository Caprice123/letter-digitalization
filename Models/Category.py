from server import db

class Category(db.Model):
    __tablename__ = "Category"
    category_id = db.Column(db.Integer, primary_key=True)
    category_name = db.Column(db.String(255), nullable=False, unique=True)
    path_format = db.Column(db.String(255), nullable=False, unique=True)
    visible_role = db.Column(db.String(255), nullable=False, default="Operational")
    required_role_accept = db.Column(db.String(255), nullable=False)
    
    disabled = db.Column(db.Boolean, nullable=False, default=False)
    records = db.relationship("Records", backref="category", lazy=True)
    columns = db.relationship("CategoryColumns", backref="category", lazy=True)
    
    def __repr__(self):
        return f"Category {self.category_name}"
    
    """
    [nama pengaju, nim pengaju]
    ADD
    new_rec = Category(category_name="Surat Internship", path_format="pdf_template/surat_internship.html")
    
    UPDATE
    new_rec.category_name = "Surat ..."
    
    """
    