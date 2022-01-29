"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var AdminAdmin = /** @class */ (function (_super) {
    __extends(AdminAdmin, _super);
    function AdminAdmin(datas, theadcolumns) {
        var _this = 
        /**
         * Parameters:
         * datas: Array<any> - the datas of all teachers
         * theadcolumns: str - the header of the table
         */
        _super.call(this, datas, theadcolumns) || this;
        // sorting the data based on which one is active
        _this.datas.sort(function (a, b) {
            return a.disabled - b.disabled || a.category_name.localeCompare(b.category_name);
        });
        _this.updateTable();
        _this.updateEventListenerButton();
        // enabling tab for the content of the category
        _this.textarea = document.getElementById("contentt");
        _this.textarea.onkeydown = function (e) {
            if (e.keyCode === 9) { // tab was pressed
                // get caret position/selection
                var val = _this.textarea.value, start = _this.textarea.selectionStart, end = _this.textarea.selectionEnd;
                // set textarea value to: text before caret + tab + text after caret
                _this.textarea.value = val.substring(0, start) + '\t' + val.substring(end);
                // put caret at right position again
                _this.textarea.selectionStart = _this.textarea.selectionEnd = start + 1;
                // prevent the focus lose
                return false;
            }
        };
        return _this;
    }
    /***************************************************************************************/
    // PRIVATE METHOD
    AdminAdmin.prototype.updateEventListenerButton = function () {
        /**
         * This is a method for adding event listener for all buttons
         *
         * -------------------------------------------
         * Parameter
         * None
         * -------------------------------------------
         *
         * -------------------------------------------
         * Return
         * None
         * -------------------------------------------
         */
        var _this = this;
        // adding event listener for delete button 
        this.deleteButtons = document.querySelectorAll(".delete");
        this.deleteButtons.forEach(function (deleteButton) { return deleteButton.addEventListener("click", function (e) {
            var data = _this.datas.filter(function (data) { return data.category_id == deleteButton.dataset.id; });
            data = data[0];
            // confirmation for enabling the category again
            if (data.disabled) {
                if (confirm("Do you want to enable this record ?")) {
                    _this.idInputDelete.value = deleteButton.dataset.id;
                    _this.submitBtnDelete.click();
                }
            }
            // confirmation for disabling the category again
            else {
                if (confirm("Do you want to delete this record ?")) {
                    _this.idInputDelete.value = deleteButton.dataset.id;
                    _this.submitBtnDelete.click();
                }
            }
        }); });
        // validate the submit button so that it cannot be bypassed
        this.submitBtnDelete.addEventListener("click", function (e) {
            if (_this.idInputDelete.value == null) {
                alert("You cannot bypass this");
                e.preventDefault();
                return;
            }
        });
    };
    AdminAdmin.prototype.updateTable = function () {
        var _this = this;
        /**
         * This is a method for showing the datas in the tables
         *
         * -------------------------------------------
         * Parameter
         * None
         * -------------------------------------------
         *
         * -------------------------------------------
         * Return
         * None
         * -------------------------------------------
         */
        if (this.datas) {
            this.datas.forEach(function (data) {
                // inserting all data and make the edit and delete button
                var new_row;
                // enabled visualization
                if (data.disabled == false) {
                    new_row =
                        "\n                        <tr>\n                            <td>".concat(data.category_id, "</td>\n                            <td>").concat(data.category_name, "</td>\n                            <td>\n                                <div class=\"response\">\n                                    <button class=\"edit\" data-id=\"").concat(data.category_id, "\"> <i class=\"fa fa-pencil-square-o\" aria-hidden=\"true\"></i></button>\n                                    <button class=\"delete\" data-id=\"").concat(data.category_id, "\"> <i class=\"fa fa-trash-o\"></i></button>\n                                </div> \n                            </td>\n                        </tr>\n                        ");
                }
                // disabled visualization
                else {
                    new_row =
                        "\n                        <tr style=\"text-decoration:line-through;\">\n                            <td>".concat(data.category_id, "</td>\n                            <td>").concat(data.category_name, "</td>\n                            <td>\n                                <div class=\"response\">\n                                    <button class=\"edit\" data-id=\"").concat(data.category_id, "\"> <i class=\"fa fa-pencil-square-o\" aria-hidden=\"true\"></i></button>\n                                    <button class=\"delete\" data-id=\"").concat(data.category_id, "\"> <i class=\"fa fa-refresh\" aria-hidden=\"true\"></i></button>\n                                </div> \n                            </td>\n                        </tr>\n                        ");
                }
                _this.tbody.insertAdjacentHTML("beforeend", new_row);
            });
        }
    };
    return AdminAdmin;
}(Admin));
var AddCategoryForm = /** @class */ (function (_super) {
    __extends(AddCategoryForm, _super);
    function AddCategoryForm(id) {
        var _this = 
        /**
         * Parameters:
         * id: str - the id of the add popup window
         */
        _super.call(this, id) || this;
        _this.nameCategoryForm = document.querySelector(".addcategoryname");
        _this.contentCategoryForm = document.querySelector(".addcategorycontent");
        _this.submitButton = document.querySelector(".btnsubmit");
        _this.urutanCategoryAccepted = document.querySelector(".urutan-accepted");
        _this.available_jurusan = document.getElementById("add-available-jurusan");
        _this.accepted_by = document.getElementById("add-accepted-by");
        _this.updateSubmitEventListener();
        _this.updateKeyPressEventListener();
        return _this;
    }
    AddCategoryForm.prototype.updateSubmitEventListener = function () {
        var _this = this;
        this.submitButton.addEventListener("click", function (e) {
            console.log("This");
            _this.validCategoryName();
            _this.validCategoryContent();
            _this.validUrutanAccepted();
            console.log(_this.nameCategoryOk, _this.contentCategoryOk, _this.urutanOk);
            if (!_this.nameCategoryOk || !_this.contentCategoryOk || !_this.urutanOk) {
                e.preventDefault();
                return;
            }
        });
        var available_jurusan_childrens = this.available_jurusan.children;
        var accepted_by_childrens = this.accepted_by.children;
        for (var index = 0; index < available_jurusan_childrens.length; index++) {
            var element = available_jurusan_childrens[index];
            var checkbox = element.querySelector("input[type=checkbox]");
            checkbox.addEventListener("change", function (e) { return _this.add_accepted_by(e); });
        }
        for (var index = 0; index < accepted_by_childrens.length; index++) {
            var element = accepted_by_childrens[index];
            var checkbox = element.querySelector("input[type=checkbox]");
            checkbox.addEventListener("change", function (e) { return _this.remove_accepted_by(e); });
        }
        console.log(available_jurusan_childrens);
    };
    AddCategoryForm.prototype.add_accepted_by = function (element) {
        var _this = this;
        /**
         * This is a method for adding the accepted by role for the required role accept
         *
         * -------------------------------------------
         * Parameter
         * element - the element that is clicked
         * -------------------------------------------
         *
         * -------------------------------------------
         * Return
         * None
         * -------------------------------------------
         */
        // parsing which element is clicked
        var updated = element.target.parentNode;
        var clone_updated = updated.cloneNode(true);
        // remove it from the available jurusan
        this.available_jurusan.removeChild(updated);
        // append it to the accepted by order
        this.accepted_by.appendChild(clone_updated);
        // add the event listener for it
        clone_updated.addEventListener("change", function (e) { return _this.remove_accepted_by(e); });
        // insert new data into the form
        var new_role = element.target.nextElementSibling.textContent;
        this.urutanCategoryAccepted.value += (this.urutanCategoryAccepted.value) ? ",".concat(new_role) : "".concat(new_role);
    };
    AddCategoryForm.prototype.remove_accepted_by = function (element) {
        var _this = this;
        /**
         * This is a method for removing the accepted by role for the required role accept
         *
         * -------------------------------------------
         * Parameter
         * element - the element that is clicked
         * -------------------------------------------
         *
         * -------------------------------------------
         * Return
         * None
         * -------------------------------------------
         */
        // parsing which element is clicked
        var updated = element.target.parentNode;
        var clone_updated = updated.cloneNode(true);
        // remove it from the accepted by order
        this.accepted_by.removeChild(updated);
        // append it to the available jurusan
        this.available_jurusan.appendChild(clone_updated);
        // add the event listener for it
        clone_updated.addEventListener("change", function (e) { return _this.add_accepted_by(e); });
        // delete the data from the form
        var deleted_role = element.target.nextElementSibling.textContent;
        var urutan = this.urutanCategoryAccepted.value.split(",");
        urutan = urutan.filter(function (data) { return data != deleted_role; });
        this.urutanCategoryAccepted.value = urutan.join(",");
    };
    AddCategoryForm.prototype.updateKeyPressEventListener = function () {
        var _this = this;
        /**
         * This is a method for validating the user input
         *
         * -------------------------------------------
         * Parameter
         * None
         * -------------------------------------------
         *
         * -------------------------------------------
         * Return
         * None
         * -------------------------------------------
         */
        // adding some constraint for the category name form so that it can be inputted only string data
        this.nameCategoryForm.addEventListener("keypress", function () { return _this.validateStringOnly(); });
    };
    return AddCategoryForm;
}(AddForm));
var EditCategroryForm = /** @class */ (function (_super) {
    __extends(EditCategroryForm, _super);
    function EditCategroryForm(datas, class_edit_buttons, class_edit_container, class_back_button) {
        /**
         * Parameters:
         * datas: Array<any> - the datas of all teachers
         * class_edit_buttons: str - the class of edit buttons
         * class_edit_container: str - the class of edit popup container
         * class_back_button: str - the class of back button
         */
        var _this = _super.call(this, datas, class_edit_buttons, class_edit_container, class_back_button) || this;
        _this.nameCategoryForm = document.querySelector(".editcategoryname");
        _this.contentCategoryForm = document.querySelector(".editcontent");
        _this.urutanCategoryAccepted = document.querySelector(".edit-urutan-accepted");
        _this.availableJurusanList = document.querySelector(".edit-available-jurusan");
        _this.acceptedByList = document.querySelector(".edit-accepted-by");
        _this.availableJurusan = [];
        _this.confirmButton = document.querySelector(".confirm");
        _this.submitButton = document.querySelector(".submit-edit");
        var tmp = document.querySelector("#add-available-jurusan");
        // insert initial available major of the teacher
        for (var index = 0; index < tmp.children.length; index++) {
            var element = tmp.children[index];
            _this.availableJurusan.push(element.lastChild.textContent);
        }
        // remove the value for each form if user click outside the popup
        document.addEventListener("click", function (e) {
            if (!e.target.closest(class_edit_container)) {
                _this.idForm.value = null;
                _this.nameCategoryForm.value = null;
                _this.contentCategoryForm.value = null;
                _this.urutanCategoryAccepted.value = null;
                _this.acceptedByList.innerHTML = '';
                _this.availableJurusanList.innerHTML = '';
                _this.editContainer.classList.remove("show");
            }
        }, true);
        _this.updateInputEventListener();
        _this.updateEventListener();
        _this.updateConfirmationEventListener();
        return _this;
    }
    /***************************************************************************************/
    // PRIVATE METHOD
    EditCategroryForm.prototype.updateEventListener = function () {
        var _this = this;
        /**
         * This is a method for initialize the edit popup
         *
         * -------------------------------------------
         * Parameter
         * None
         * -------------------------------------------
         *
         * -------------------------------------------
         * Return
         * None
         * -------------------------------------------
         */
        // get initial value for each form when user click an edit button
        this.editButtons.forEach(function (button) {
            return button.addEventListener("click", function (e) {
                var editData = _this.datas.filter(function (data) { return data['user_id'] == button.dataset.id; });
                editData = editData[0];
                var data = _this.datas.filter(function (d) { return d.category_id == button.dataset.id; });
                data = data[0];
                // fetch the data from the server and initialize the value for each form
                fetch(data.path_format)
                    .then(function (res) { return res.text(); })
                    .then(function (content) {
                    _this.idForm.value = button.dataset.id;
                    _this.nameCategoryForm.value = data.category_name;
                    _this.contentCategoryForm.value = _this.filterContent(content);
                    _this.urutanCategoryAccepted.value = data.required_role_accept.join(",");
                    _this.editContainer.classList.add("show");
                    var available_jurusan = _this.availableJurusan.filter(function (role) { return data.required_role_accept.indexOf(role) == -1; });
                    available_jurusan.forEach(function (role) {
                        var checkbox = "<li><input type=\"checkbox\" id=".concat(role, "><label for=").concat(role, ">").concat(role, "</label></li>");
                        _this.availableJurusanList.insertAdjacentHTML("beforeend", checkbox);
                    });
                    data.required_role_accept.forEach(function (role) {
                        var checkbox = "<li><input type=\"checkbox\" id=".concat(role, " checked><label for=").concat(role, ">").concat(role, "</label></li>");
                        _this.acceptedByList.insertAdjacentHTML("beforeend", checkbox);
                    });
                    // updating the event listener
                    for (var index = 0; index < _this.availableJurusanList.children.length; index++) {
                        var element = _this.availableJurusanList.children[index];
                        element.addEventListener("click", function (e) { return _this.add_accepted_by(e); });
                    }
                    for (var index = 0; index < _this.acceptedByList.children.length; index++) {
                        var element = _this.acceptedByList.children[index];
                        element.addEventListener("click", function (e) { return _this.remove_accepted_by(e); });
                    }
                });
            });
        });
        // remove the value if user click outside the popup window
        this.backButton.addEventListener("click", function (e) {
            _this.idForm.value = null;
            _this.nameCategoryForm.value = null;
            _this.contentCategoryForm.value = null;
            _this.urutanCategoryAccepted.value = null;
            _this.acceptedByList.innerHTML = '';
            _this.availableJurusanList.innerHTML = '';
            _this.editContainer.classList.remove("show");
        });
    };
    EditCategroryForm.prototype.add_accepted_by = function (e) {
        var _this = this;
        /**
         * This is a method for adding the accepted by role for the required role accept
         *
         * -------------------------------------------
         * Parameter
         * element - the element that is clicked
         * -------------------------------------------
         *
         * -------------------------------------------
         * Return
         * None
         * -------------------------------------------
         */
        // parsing which element is clicked
        var updated = e.target.parentNode;
        var add = updated.cloneNode(true);
        // remove it from the available jurusan
        this.availableJurusanList.removeChild(updated);
        // append it to the accepted by order
        this.acceptedByList.appendChild(add);
        // add the event listener for it
        add.querySelector("input[type=checkbox]").checked = true;
        add.addEventListener("click", function (e) { return _this.remove_accepted_by(e); });
        // insert new data into the form
        var new_role = add.querySelector("label").textContent;
        this.urutanCategoryAccepted.value += (this.urutanCategoryAccepted.value) ? ",".concat(new_role) : "".concat(new_role);
    };
    EditCategroryForm.prototype.remove_accepted_by = function (e) {
        var _this = this;
        /**
         * This is a method for removing the accepted by role for the required role accept
         *
         * -------------------------------------------
         * Parameter
         * element - the element that is clicked
         * -------------------------------------------
         *
         * -------------------------------------------
         * Return
         * None
         * -------------------------------------------
         */
        // parsing which element is clicked
        var updated = e.target.parentNode;
        var removed = updated.cloneNode(true);
        // remove it from the accepted by order
        this.acceptedByList.removeChild(updated);
        // append it to the available jurusan
        this.availableJurusanList.appendChild(removed);
        // add the event listener for it
        removed.querySelector("input[type=checkbox]").checked = false;
        removed.addEventListener("click", function (e) { return _this.add_accepted_by(e); });
        // delete the data from the form
        var removed_role = removed.querySelector("label").textContent;
        var urutan = this.urutanCategoryAccepted.value.split(",");
        urutan = urutan.filter(function (data) { return data != removed_role; });
        this.urutanCategoryAccepted.value = urutan.join(",");
    };
    EditCategroryForm.prototype.filterContent = function (content) {
        /**
         * This is a method for filtering the data from the previous template
         *
         * -------------------------------------------
         * Parameter
         * content: str - the content of the letter
         * -------------------------------------------
         *
         * -------------------------------------------
         * Return
         * content: str - cleaned content of the letter
         * -------------------------------------------
         */
        // filter only the content of the letter
        content = content.match(/<div class="content">([\S\s]*?)<\/div>/)[1];
        console.log(content);
        // remove the <p>, <span>, data. and <br>
        content = content.replaceAll(/<p>|<\/p>|<\/span>|<br>|\|safe/g, "");
        content = content.replaceAll("data.", "");
        // convert <span> to tab
        content = content.replaceAll("<span>", "\t");
        var splitcontent = content.split("\n");
        // clean the content
        for (var index = 0; index < splitcontent.length; index++) {
            splitcontent[index] = splitcontent[index].trim();
        }
        return splitcontent.join("\n").trim();
    };
    EditCategroryForm.prototype.updateConfirmationEventListener = function () {
        var _this = this;
        /**
         * This is a method for validating the user input
         *
         * -------------------------------------------
         * Parameter
         * None
         * -------------------------------------------
         *
         * -------------------------------------------
         * Return
         * None
         * -------------------------------------------
         */
        // validate user input when confirm button is clicked
        // submit form if already valid
        this.confirmButton.addEventListener("click", function (e) {
            _this.validCategoryName();
            _this.validCategoryContent();
            _this.validUrutanAccepted();
            console.log(_this.nameCategoryOk, _this.contentCategoryOk, _this.urutanOk);
            if (!_this.nameCategoryOk || !_this.contentCategoryOk || !_this.urutanOk) {
                e.preventDefault();
                return;
            }
            _this.submitButton.click();
        });
    };
    EditCategroryForm.prototype.updateInputEventListener = function () {
        var _this = this;
        /**
         * This is a method for making some constraint in some inputs
         *
         * -------------------------------------------
         * Parameter
         * None
         * -------------------------------------------
         *
         * -------------------------------------------
         * Return
         * None
         * -------------------------------------------
         */
        // adding some constraint for the category name form so that it can be inputted only string data
        this.nameCategoryForm.addEventListener("keypress", function (e) { return _this.validateStringOnly(e); });
    };
    return EditCategroryForm;
}(EditForm));
// the table columns
var theadColumns = "\n<tr>\n    <th>ID</th>\n    <th>Name</th>\n    <th>Actions</th>\n</tr>\n";
// make the admin category data UI
var categoryrAdmin = new AdminAdmin(datas.categories, theadColumns);
// make the add popup window UI
var addForm = new AddCategoryForm("myForm");
// make the edit popup window UI
var editForm = new EditCategroryForm(datas.categories, ".edit", ".categoryeditpopupcontainer", ".back");
