from server import app, autodoc

@autodoc.doc(groups='documentation')
@app.route('/routes/documentation/login')
def login_documentation():
    """ This is endpoint for displaying login page documentation """
    return autodoc.html(groups='login',
                        title='Login Page Documentation',
                        author='Devina Gunawan, Irvine, Kelvin Cendra, Raymond Winsher, Richie Eviendy')
    
    
@autodoc.doc(groups='documentation')
@app.route('/routes/documentation/admin')
def admin_documentation():
    """ This is endpoint for displaying admin page documentation """
    return autodoc.html(groups='admin',
                        title='Admin Page Documentation',
                        author='Devina Gunawan, Irvine, Kelvin Cendra, Raymond Winsher, Richie Eviendy')


@autodoc.doc(groups='documentation')
@app.route('/routes/documentation/student')
def student_documentation():
    """ This is endpoint for displaying student page documentation """
    return autodoc.html(groups='student',
                        title='Student Page Documentation',
                        author='Devina Gunawan, Irvine, Kelvin Cendra, Raymond Winsher, Richie Eviendy')

@autodoc.doc(groups='documentation')
@app.route('/routes/documentation/teacher')
def teacher_documentation():
    """ This is endpoint for displaying teacher page documentation """
    return autodoc.html(groups='teacher',
                        title='Teacher Page Documentation',
                        author='Devina Gunawan, Irvine, Kelvin Cendra, Raymond Winsher, Richie Eviendy')

@autodoc.doc(groups='documentation')
@app.route('/routes/documentation/help-guide')
def help_guide_documentation():
    """ This is endpoint for displaying help guide page documentation """
    return autodoc.html(groups='help-guide',
                        title='Help Guide Page Documentation',
                        author='Devina Gunawan, Irvine, Kelvin Cendra, Raymond Winsher, Richie Eviendy')
    
@app.route('/routes/documentation')
def documentation():
    return autodoc.html(groups='documentation',
                        title='Page Documentation',
                        author='Devina Gunawan, Irvine, Kelvin Cendra, Raymond Winsher, Richie Eviendy')