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
var Admin = /** @class */ (function () {
    function Admin(datas, theadcolumns) {
        /**
         * Parameters:
         * datas: Array<any> - the datas that will be displayed
         * theadcolumns: str - the header of the table
         */
        this.thead = document.querySelector(".table-header");
        this.tbody = document.querySelector(".table-body");
        this.idInputDelete = document.querySelector(".id-input-delete");
        this.submitBtnDelete = document.querySelector(".submit-delete");
        this.idInputEdit = document.querySelector(".id-input-edit");
        this.submitBtnEdit = document.querySelector(".submit-edit");
        this.editButtons = null;
        this.deleteButtons = null;
        this.datas = datas;
        this.theadcolumns = theadcolumns;
        this.editContainer = document.querySelector(".editpopupcontainer");
        this.thead.insertAdjacentHTML("beforeend", this.theadcolumns);
    }
    /***************************************************************************************/
    // PROTECTED METHOD
    Admin.prototype.updateEventListenerButton = function () {
        var _this = this;
        /**
         * This is a method for giving event listener for all delete buttons
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
        // confirmation for deleting the record
        this.deleteButtons = document.querySelectorAll(".delete");
        this.deleteButtons.forEach(function (deleteButton) { return deleteButton.addEventListener("click", function (e) {
            if (confirm("Do you want to delete this record ?")) {
                _this.idInputDelete.value = deleteButton.dataset.id;
                _this.submitBtnDelete.click();
            }
        }); });
        // adding some validation so user cannot bypass
        this.submitBtnDelete.addEventListener("click", function (e) {
            if (_this.idInputDelete.value == null) {
                alert("You cannot bypass this");
                e.preventDefault();
                return;
            }
        });
    };
    return Admin;
}());
var AddForm = /** @class */ (function (_super) {
    __extends(AddForm, _super);
    function AddForm(id) {
        var _this = 
        /**
         * Parameters:
         * id: str - the id of the add popup container
         */
        _super.call(this) || this;
        _this.form = document.getElementById(id);
        var addButton = document.querySelector(".addbutton");
        var backButton = document.querySelector(".btncancel");
        // close popup window if user click outside the popup window
        document.addEventListener("click", function (e) {
            if (!e.target.closest("#".concat(id))) {
                _this.form.style.display = "none";
            }
        }, true);
        // open the popup window if user click add button
        if (addButton) {
            addButton.addEventListener("click", function () { return _this.form.style.display = "block"; });
        }
        // close popup window if user click the back button
        if (backButton) {
            backButton.addEventListener('click', function () { return _this.form.style.display = "none"; });
        }
        return _this;
    }
    return AddForm;
}(Form));
var SidebarDropdown = /** @class */ (function () {
    function SidebarDropdown(class_button, class_container) {
        var _this = this;
        /**
         * Parameters:
         * class_button: str - the class of the user dropdown in the sidebar
         * class_container: str - the class of the sidebar content that will be dropdowned
         */
        this.button = document.querySelector(class_button);
        this.container = document.querySelector(class_container);
        // open or close the container if user click the button
        this.button.addEventListener("click", function (e) {
            _this.button.classList.toggle("active");
            _this.container.classList.toggle("active");
        });
    }
    return SidebarDropdown;
}());
var EditForm = /** @class */ (function (_super) {
    __extends(EditForm, _super);
    function EditForm(datas, class_edit_buttons, class_edit_container, class_back_button) {
        var _this = 
        /**
         * Parameters:
         * datas: Array<any> - the datas that can be modified
         * class_edit_buttons: str - the class of edit buttons
         * class_edit_container: str - the class of edit popup window
         * class_back_button: str - the class for closing the popup window
         */
        _super.call(this) || this;
        _this.editButtons = document.querySelectorAll(class_edit_buttons);
        _this.editContainer = document.querySelector(class_edit_container);
        _this.backButton = document.querySelector(class_back_button);
        _this.idForm = document.querySelector(".id-input-edit");
        _this.datas = datas;
        _this.idOk = 0;
        _this.reset();
        return _this;
    }
    /***************************************************************************************/
    // PROTECTED METHOD
    EditForm.prototype.validID = function () {
        /**
         * This is a method for validating the id form
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
        // make some validation for id so that user cannot bypass it
        if (!this.checkNull(this.idForm.value.trim())) {
            alert("You cannot Bypass this");
            this.idOk = 0;
            return;
        }
        this.idOk = 1;
    };
    return EditForm;
}(Form));
