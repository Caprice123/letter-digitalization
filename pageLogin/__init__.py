from flask import render_template, request, url_for, redirect, flash
from Handler.Login import LoginHandler
from server import app, db, ts, autodoc
from Models.UserRole import UserRole
from threading import Thread
from Models.Teacher import Teachers

@autodoc.doc(groups='login')
@app.route('/')
def index():
    """ This is endpoint for home page and will be redirect to login page """
    return redirect(url_for('login_page'))

@autodoc.doc(groups='login')
@app.route("/login", methods=["GET", "POST"])
def login_page():
    """ This is endpoint for login page """
    login_handler = LoginHandler()
    
    # handle GET method
    if request.method == "GET":
        
        # getting all available major for registering user
        available_jurusan = Teachers.query.with_entities(Teachers.jurusan).distinct().all()[1:]
        available_jurusan = [str(jurusan[0]) for jurusan in available_jurusan]
        
        return render_template("Login_page/sign_in.html", available_jurusan = available_jurusan)    
    
    # handle POST method
    elif request.method == "POST":
        
        # loginning user
        response = login_handler.login(request.form)
        
        return response
    
@autodoc.doc(groups='login')
@app.route("/logout")
def logout_page():
    """ This is endpoint for logoutting user """
    
    # logout user
    login_handler = LoginHandler()
    response = login_handler.logout()
    return response

def confirm_token(token: str, expiration: int=3600) -> int:
    """
    Confirming token for confirmation link email
    
    Parameters
    -----------
    token : str
        token for confirmation link token
        
    expiration : int
        token lifetime before it is expired
    
    Return
    -----------
    id 
        id of the user that forget the password
    
    """
    try:
        # try to confirm the token
        id = ts.loads(token,
                    salt=app.config['SECURITY_PASSWORD_SALT'],
                    max_age=expiration)
    except:
        return False
    return id       

@autodoc.doc(groups='login')
@app.route('/confirm/<string:token>')
def confirm_email(token):
    """ This is endpoint for rendering reset password page """
    try:
        # confirm token
        id = confirm_token(token)
        if id:
            return render_template("Login_page/reset_password.html", id=id)
        
        # user is not detected in database and will be redirected to login page again
        flash("Invalid Token", "Error")
        return redirect(url_for('login_page'))
    
    except:
        # token has expired and will be redirected to login page again
        flash("Expired Token", "Error")
        return redirect(url_for('login_page'))

@autodoc.doc(groups='login')
@app.route('/sign-up', methods=["POST"])
def signUp():
    """ This is endpoint for registering new student account """
    # registering new user with role student
    login_handler = LoginHandler()
    response = login_handler.register(request.form)
    return response


@autodoc.doc(groups='login')
@app.route('/forgot-password', methods=["POST"])
def forgot_password():
    """ This is endpoint for generating the token and sending email to user for resetting password """
    
    # cheking the email confirmation whether it is inside database
    email = request.form['restoration-email']
    user = UserRole.query.filter_by(email = email).first()
    if user:
        # generating new token
        login_handler = LoginHandler()
        token = login_handler.generate_confirmation_token(user.id)
        
        # generating email
        confirm_url = url_for('confirm_email', token=token, _external=True)
        html = render_template('Login_page/forgot_password.html', confirm_url=confirm_url)
        subject = "Reset your password"
        
        # sending email
        thr = Thread(target=login_handler.send_confirmation_email, args=[subject, email, html])
        thr.start()
        
        # email has been sent and redirect to login page again
        flash("Email confirmation is being sent. Check your outlook", "Success")
        return redirect(url_for('login_page'))
    else:
        # email inputted not detected in database and redirect to login page again
        flash("Email not registered", "Error")
        return redirect(url_for('login_page'))
    
@autodoc.doc('login')
@app.route("/reset-password", methods=["POST"])
def reset_password():
    """ This is endpoint for resetting password """
    # searching for the user
    user = UserRole.query.filter_by(id=request.form['userid']).first_or_404()
    
    # checking whether the new password and confirm new password the same
    if request.form['createnewpassword'] == request.form['confirmnewpassword']:
        # updating the password in database
        user.password = request.form['createnewpassword']
        db.session.commit()
        
        # password has been changed and redirect to login page again
        flash("Successfully changed password", "Success")
        return redirect(url_for('login_page'))
    else:
        # refresh the page because the password and confirmation password not the same
        token = request.referrer.split("/")[-1]
        flash("Password and confirmation password doesn't match", "Error")
        return redirect(url_for('confirm_email', token=token))
