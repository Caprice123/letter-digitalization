from server import db

class CategoryColumns(db.Model):
    __tablename__ = "CategoryColumn"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    category_id = db.Column(db.Integer, db.ForeignKey("Category.category_id"), nullable=False)
    column_name = db.Column(db.String(255), nullable=False)
    
    def __repr__(self):
        return f"Category Column: {self.category_id} {self.column_name}"
    """
    cc = CategoryColumns(category_id=1, column_name="nama pengaju internship")
    cc1 = CategoryColumns(category_id=1, column_name="perusahaan tujuan internship")
    
    """