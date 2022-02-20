from server import app
from flask import render_template



# @autodoc.doc(groups='help-guide')
@app.route('/help-guide')
def help_guide_home():
    """ This is endpoint for home page of help guide """
    
    return render_template('help_guide/home.html')

# @autodoc.doc(groups='help-guide')
@app.route('/help-guide/student')
def help_guide_student():
    """ This is endpoint for displaying all help guide for student page """
    
    return render_template('Student_page/help_guide.html')

# @autodoc.doc(groups='help-guide')
@app.route('/help-guide/teacher')
def help_guide_teacher():
    """ This is endpoint for displaying all help guide for teacher page """
    
    return render_template('Teacher_page/help_guide.html')

# @autodoc.doc(groups='help-guide')
@app.route('/help-guide/admin')
def help_guide_admin():
    """ This is endpoint for displaying all help guide for admin page """
    
    return render_template("Admin_page/help_guide.html")





# @autodoc.doc(groups='help-guide')
@app.route('/help-guide/authors')
def help_guide_authors():
    """ This is endpoint for displaying authors of this project """
    
    return render_template('help_guide/authors.html')

# @autodoc.doc(groups='help-guide')
@app.route('/help-guide/changes')
def help_guide_changes():
    """ This is endpoint for displaying versions of this project """
    
    return render_template('help_guide/version.html')