"use strict";
exports.__esModule = true;
var Admin = /** @class */ (function () {
    function Admin(datas, theadcolumns) {
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
        this.thead.insertAdjacentHTML("beforeend", this.theadcolumns);
    }
    Admin.prototype.updateEventListenerButton = function () {
        var _this = this;
        this.editButtons = document.querySelectorAll(".edit");
        this.deleteButtons = document.querySelectorAll(".delete");
        this.editButtons.forEach(function (editButton) { return editButton.addEventListener("click", function (e) {
            if (confirm("Do you want to edit this record ?")) {
                _this.idInputEdit.value = editButton.dataset.id;
                _this.submitBtnEdit.click();
            }
        }); });
        this.deleteButtons.forEach(function (deleteButton) { return deleteButton.addEventListener("click", function (e) {
            if (confirm("Do you want to edit this record ?")) {
                _this.idInputDelete.value = deleteButton.dataset.id;
                _this.submitBtnDelete.click();
            }
        }); });
    };
    return Admin;
}());
