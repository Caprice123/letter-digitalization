"use strict";
exports.__esModule = true;
var Flash = /** @class */ (function () {
    function Flash(idfail) {
        var _this = this;
        /**
         * Parameters:
         * idfail: str - id of the flash container
         */
        this.form = document.getElementById("myForm");
        this.nav = document.getElementById("myNav");
        this.failedform = document.getElementById(idfail);
        document.addEventListener("click", function (e) {
            if (_this.failedform) {
                // close all if the user click outside the flash
                if (!_this.failedform.contains((e.target)) && !_this.form.contains((e.target))) {
                    _this.closeAll();
                }
                // close the forgot password form if user click inside the flash
                else if (!_this.failedform.contains((e.target))) {
                    _this.closeFailed();
                }
                // close the flash if user clic inside the forgot password
                else if (!_this.form.contains((e.target))) {
                    _this.closeform();
                }
            }
            else {
                if (!_this.form.contains((e.target))) {
                    _this.closeform();
                }
            }
        }, true);
    }
    /***************************************************************************************/
    // PUBLIC METHOD
    Flash.prototype.openforgot = function () {
        /**
         * This is a method for opening forgot password popup
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
        if (this.failedform) {
            this.failedform.style.display = "none";
        }
        this.form.style.display = "block";
    };
    Flash.prototype.closeform = function () {
        /**
         * This is a method for closing forgot password popup
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
        if (this.failedform) {
            this.failedform.style.display = "flex";
        }
        this.form.style.display = "none";
    };
    Flash.prototype.openNav = function () {
        /**
         * This is a method for opening sign up form
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
        this.nav.style.width = "100%";
    };
    Flash.prototype.closeNav = function () {
        /**
         * This is a method for closing sign up form
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
        this.nav.style.width = "0%";
    };
    Flash.prototype.closeFailed = function () {
        /**
         * This is a method for closing flash popup
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
        this.form.style.display = "block";
        if (this.failedform) {
            this.failedform.style.display = "none";
        }
    };
    Flash.prototype.closeAll = function () {
        /**
         * This is a method for closing all popup window
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
        this.form.style.display = "none";
        this.failedform.style.display = "none";
    };
    return Flash;
}());
