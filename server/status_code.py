import requests
from werkzeug.utils import redirect
from server import app
from flask import render_template, url_for, session, flash, request
from flask_wtf.csrf import CSRFError

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
    flash("Unsuccessful Creating or Updating Data", "Error")
    return redirect(request.referrer)
#########################################################################################################

#########################################################################################################
# INTERNAL SERVER ERROR
@app.errorhandler(500)
def internal_server_error(e):
    return render_template("response_code.html", error_code = 500, status_desc = "Internal Server Error", destination_link = session['default_url'] if session['default_url'] else url_for('login_page'))
#########################################################################################################

#########################################################################################################
# CSRF TOKEN MISSING
@app.errorhandler(CSRFError)
def csrf_missing(e):
    flash("CSRF Token is missing", "Error")
    return redirect(url_for('login_page'))
#########################################################################################################
