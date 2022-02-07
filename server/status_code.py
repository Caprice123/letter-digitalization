import requests
from Interface.Admin import AdminInterface
from Models.UserRole import UserRole
from server import app, mail, token_required
from flask import render_template, url_for, session, flash, request, redirect
from flask_wtf.csrf import CSRFError
from flask_mail import Message
from threading import Thread
from server.error_code import InsufficientStorage

#########################################################################################################
# UNAUTHORIZED
@app.errorhandler(403)
def unauthorized(e):
    return render_template("response_code.html", error_code = 403, status_desc = "Unauthorized", destination_link = session['default_url'] if session['default_url'] else url_for('login_page'))
#########################################################################################################

#########################################################################################################
@app.errorhandler(404)
# RESOUCE NOT FOUND
def page_not_found(e):
    return render_template("response_code.html", error_code = 404, status_desc = "Page Not Found", destination_link = url_for('login_page'))
#########################################################################################################

#########################################################################################################
# METHOD NOT ALLOWED
@app.errorhandler(405)
def method_not_allowed(e):
    return render_template("response_code.html", error_code = 405, status_desc = "Method Not Allowed", destination_link = session['default_url'] if session['default_url'] else url_for('login_page'))
#########################################################################################################

#########################################################################################################
# FORBIDDEN
@app.errorhandler(406)
def forbidden(e):
    return render_template("response_code.html", error_code = 406, status_desc = "Forbidden", destination_link = session['default_url'] if session['default_url'] else url_for('login_page'))
#########################################################################################################

#########################################################################################################
# RESOURCE CONFLICT
@app.errorhandler(409)
def already_exists(e):
    print(request.referrer)
    flash("Unsuccessful Creating or Updating Data", "Error")
    return redirect(request.referrer)
#########################################################################################################

#########################################################################################################
# PRECONDITIONAL FAILED
@app.errorhandler(412)
def preconditional_failed(e):
    if "student" in request.referrer:
        flash("There are records still in progress", 'Error')
    elif "teacher" in request.referrer:
        flash("Conflict with Required Role Accept in Category", "Error")
    return redirect(request.referrer)
#########################################################################################################

#########################################################################################################
# INTERNAL SERVER ERROR
@app.errorhandler(500)
def internal_server_error(e):
    return render_template("response_code.html", error_code = 500, status_desc = "Internal Server Error", destination_link = session['default_url'] if session['default_url'] else url_for('login_page'))
#########################################################################################################

#########################################################################################################
# INSUFFICIENT STORAGE

@app.errorhandler(InsufficientStorage)
def insufficient_storage(e):
    admins = UserRole.query.filter(UserRole.role == "Admin").all()
    recipients = [admin.email for admin in admins]
    recipients = [app.config['MAIL_USERNAME']]
    message = Message("Insufficient Memory. Please clean some memory by deleting some files",
                      sender = app.config['MAIL_USERNAME'],
                      recipients=recipients,
                      )
    message.body = "Insufficient Memory. Please clean some memory by deleting some files"
    mail.send(message)
    return render_template("response_code.html", error_code = 507, status_desc = "Insufficient Storage", destination_link = session['default_url'] if session['default_url'] else url_for('login_page'))
#########################################################################################################

#########################################################################################################
# CSRF TOKEN MISSING
@app.errorhandler(CSRFError)
def csrf_missing(e):
    flash("CSRF Token is missing", "Error")
    return redirect(url_for('login_page'))
#########################################################################################################
