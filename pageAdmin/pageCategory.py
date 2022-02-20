from flask import render_template, request, url_for, redirect, flash
from Handler.Admin import AdminCategoryHandler
from server import app, check_token, role_required
import time
from flask_login import current_user, login_required
from threading import Thread
from Models.Teacher import Teachers

# @autodoc.doc(groups='admin') 
@app.route('/admin/category')
@login_required
@role_required("Admin")
@check_token
def admin_category_page(token):
    """ This is endpoint for rendering category.html and showing all categories """
    
    # parsing argument
    page = request.args.get("page", 1)
    if int(page) < 1:
        return redirect(url_for('admin_category_page', page=1))
    
    # extracting current user id
    id = current_user.id
    
    # getting category view
    category_handler = AdminCategoryHandler(token, id)
    categories, user = category_handler.get_category_page(page)
    
    # getting all unique role of teacher
    available_role = Teachers.query.with_entities(Teachers.role).distinct()
    return render_template("Admin_page/category.html", datas = categories, destination="category", name=user['name'], available_role = available_role)
        
        
# @autodoc.doc(groups='admin') 
@app.route('/admin/category/create', methods=["POST"])
@login_required
@role_required("Admin")
@check_token   
def admin_add_category_page(token):   
    """ This is endpoint for creating new category record """
    
    t0 = time.time()
    # extracting current user id
    id = current_user.id
    
    # creating new template html for record
    data = request.form
    category_handler = AdminCategoryHandler(token, id)
    content_category = category_handler.create_new_category(data)
    thr = Thread(target=category_handler.create_new_template, args=[data['categoryname'], content_category])
    thr.start()
    print(time.time() - t0)
    
    # redirect to category page at page 1
    flash("You have successfully added new category", "Success")
    return redirect(url_for('admin_category_page', page=1))


# @autodoc.doc(groups='admin')         
@app.route("/admin/category/delete", methods=["POST"])
@login_required
@role_required("Admin")
@check_token
def admin_category_delete_page(token):
    """ This is endpoint for changing visibility of a category """
    
    # extracting current user id
    id = current_user.id
    
    # changing visibility of the category
    category_handler = AdminCategoryHandler(token, id)
    data = request.form
    category_handler.change_visibility_category(data)
    
    # redirect to category page at page 1
    flash("You have successfully changed visiblity of category", "Success")
    return redirect(url_for('admin_category_page', page=1))


# @autodoc.doc(groups='admin')
@app.route("/admin/category/edit", methods=["POST"])
@login_required
@role_required("Admin")
@check_token
def admin_category_edit_page(token):
    """ This is endpoint for editting a category """
    
    t0 = time.time()
    # extracting current user id
    id = current_user.id
    
    # editing the a category
    category_handler = AdminCategoryHandler(token, id)
    content_category = category_handler.edit_category(request.form)
    thr = Thread(target=category_handler.create_new_template, args=[request.form['categoryname'], content_category])
    thr.start()
    print(time.time() - t0)
    
    # redirect to category page at page 1
    flash("You have successfully edited category", "Success")
    return redirect(url_for('admin_category_page', page=1))



    