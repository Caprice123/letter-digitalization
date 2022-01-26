"use strict";
exports.__esModule = true;
var Flash = /** @class */ (function () {
    function Flash() {
        this.form = document.getElementById("myForm");
        this.nav = document.getElementById("myNav");
        this.failedform = document.getElementById("failedsignin");
    }
    Flash.prototype.openforgot = function () {
        if (this.failedform) {
            this.failedform.style.display = "none";
        }
        this.form.style.display = "block";
    };
    Flash.prototype.closeform = function () {
        if (this.failedform) {
            this.failedform.style.display = "none";
        }
        this.form.style.display = "none";
    };
    Flash.prototype.openNav = function () {
        this.nav.style.width = "100%";
    };
    Flash.prototype.closeNav = function () {
        this.nav.style.width = "0%";
    };
    Flash.prototype.closeFailed = function () {
        this.form.style.display = "none";
        this.failedform.style.display = "none";
    };
    return Flash;
}());
var flash = new Flash();
var openforgot = function () { return flash.openforgot(); };
var closeForm = function () { return flash.closeform(); };
var openNav = function () { return flash.openNav(); };
var closeNav = function () { return flash.closeNav(); };
var closefailed = function () { return flash.closeFailed(); };
var Form = /** @class */ (function () {
    function Form() {
    }
    Form.prototype.checkNull = function (value) {
        return (value.length == 0) ? false : true;
    };
    Form.prototype.checkEmail = function (email) {
        var extension = "binus.ac.id";
        var indexadd = email.indexOf("@");
        if (indexadd == -1) {
            return false;
        }
        if (email.substr(indexadd + 1, email.length) != extension) {
            return false;
        }
        return true;
    };
    return Form;
}());
