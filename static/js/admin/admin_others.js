"use strict";
exports.__esModule = true;
var clock = new Clock("ct7");
clock.update();
var AddForm = /** @class */ (function () {
    function AddForm(id) {
        var _this = this;
        this.form = document.getElementById(id);
        var addButton = document.querySelector(".addbutton");
        var backButton = document.querySelector(".btncancel");
        if (addButton) {
            addButton.addEventListener("click", function (e) {
                _this.openForm();
            });
        }
        if (backButton) {
            backButton.addEventListener('click', function (e) {
                _this.closeForm();
            });
        }
    }
    AddForm.prototype.openForm = function () {
        this.form.style.display = "block";
    };
    AddForm.prototype.closeForm = function () {
        this.form.style.display = "none";
    };
    return AddForm;
}());
var addForm = new AddForm("myForm");
var ProfileDropdown = /** @class */ (function () {
    function ProfileDropdown(class_dropdown) {
        var _this = this;
        this.dropdown = document.querySelector(class_dropdown);
        var button = document.querySelector(".user");
        button.addEventListener("click", function (e) {
            profileDropdown.openDropdown();
        });
        window.addEventListener("click", function (e) {
            if (!e.target.matches(".user")) {
                _this.closeDropdown();
            }
        }, true);
    }
    ProfileDropdown.prototype.openDropdown = function () {
        this.dropdown.classList.toggle("show");
    };
    ProfileDropdown.prototype.closeDropdown = function () {
        this.dropdown.classList.remove("show");
    };
    return ProfileDropdown;
}());
var profileDropdown = new ProfileDropdown(".dropdown-content");
var SidebarDropdown = /** @class */ (function () {
    function SidebarDropdown(class_button, class_container) {
        var _this = this;
        this.button = document.querySelector(class_button);
        this.container = document.querySelector(class_container);
        this.button.addEventListener("click", function (e) {
            _this.button.classList.toggle("active");
            _this.container.classList.toggle("active");
        });
    }
    return SidebarDropdown;
}());
var sidebar = new SidebarDropdown(".dropdown-btn", ".dropdown-container");
