"use strict";
exports.__esModule = true;
var AddRecordForm = /** @class */ (function () {
    function AddRecordForm(categories) {
        /**
         * Parameters:
        * categories: Array<any> - all available record category
         */
        this.addButton = document.querySelector(".button1");
        this.popupContainer = document.querySelector(".popup1");
        this.backpopupButton = document.querySelector(".back");
        this.containerPopupPage = document.querySelector(".containerpopuppage");
        this.popup = document.querySelector(".containerpopup");
        this.buttonContainer = document.querySelector(".pop1");
        this.submitPopupButton = document.querySelector(".submit");
        this.inputContainer = document.querySelector(".new-record-form");
        this.idInput = document.querySelector(".category_id");
        this.submitFormButton = document.querySelector(".submit-form");
        this.categories = categories;
        this.updateEventListener();
    }
    /***************************************************************************************/
    // PUBLIC METHODS
    AddRecordForm.prototype.getCategory = function () {
        var _this = this;
        /**
         * This is a method for showing all category of the letter
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
        if (this.categories) {
            // making button that can be clicked for making new records
            this.categories.forEach(function (category) {
                var newCategoryButton = "\n                        <button  data-name=".concat(category.category_name.replaceAll(" ", "_"), " data-categoryID=").concat(category.category_id, " class=\"cat\">\n                        <h1>").concat(category.category_name, "</h1\n                        </button>\n                    ");
                _this.buttonContainer.insertAdjacentHTML("beforeend", newCategoryButton);
            });
        }
        this.updateCategoryForm();
    };
    /***************************************************************************************/
    /***************************************************************************************/
    // PRIVATE METHODS
    AddRecordForm.prototype.updateEventListener = function () {
        var _this = this;
        /**
         * This is a method for assigning event listener to all buttons
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
        // open the popup window if add button is clicked
        this.addButton.addEventListener("click", function (e) {
            _this.popupContainer.classList.add("show");
        });
        // back to original popup window view and remove all value inside the form
        this.backpopupButton.addEventListener("click", function (e) {
            _this.inputContainer.innerHTML = '';
            _this.popup.classList.remove("buttonselected");
            _this.idInput.value = null;
            _this.containerPopupPage.classList.add("hidden");
        });
        // validate all input inside the form if submit button is clicked
        this.submitPopupButton.addEventListener("click", function (e) {
            var inputs = _this.inputContainer.querySelectorAll("input");
            var accepted = true;
            for (var x = 0; x < inputs.length; x++) {
                if (inputs[x].value.length == 0) {
                    accepted = false;
                    break;
                }
            }
            if (accepted) {
                _this.submitFormButton.click();
            }
            else {
                alert("Please input all input form");
                e.preventDefault();
            }
        });
        // close the popup window if user click outside the window
        window.addEventListener("click", function (e) {
            if (!e.target.closest(".popup1")) {
                _this.popupContainer.classList.remove("show");
            }
        }, true);
    };
    AddRecordForm.prototype.updateCategoryForm = function () {
        var _this = this;
        /**
         * This is a method for making input form as many as needed for the record
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
        var categoryButtons = document.querySelectorAll(".cat");
        categoryButtons.forEach(function (button) { return button.addEventListener("click", function (e) {
            // assign the category id of the record
            _this.idInput.value = button.dataset.categoryid;
            var columns = _this.categories.filter(function (category) { return category.category_id == button.dataset.categoryid; });
            columns = columns[0].columns;
            // if no need column that is needed to be submitted then
            // auto submit the form
            if (columns.length == 0) {
                _this.submitFormButton.click();
                return;
            }
            // make the form based on the category column needed to be inserted
            columns.forEach(function (column) {
                var new_input = "\n                            <tr>\n                                <td>".concat(column, "</td>\n                                <td>\n                                    <input type=\"text\" name=").concat(column.replace(/\s/g, "_"), " style=\"resize: vertical;\"required>\n                                </td>\n                            </tr>\n                        ");
                _this.inputContainer.insertAdjacentHTML("beforeend", new_input);
            });
            // slide to the input form that will be needed to be filled
            _this.popup.classList.add("buttonselected");
            _this.containerPopupPage.classList.remove("hidden");
        }); });
    };
    return AddRecordForm;
}());
var RecordTable = /** @class */ (function () {
    function RecordTable(id_table, records) {
        /**
         * id_table: str - id of the table
         * records: Array<any> - the records data
         */
        this.recordTable = document.querySelector(id_table);
        this.records = records;
    }
    RecordTable.prototype.updateRecordTable = function () {
        var _this = this;
        /**
         * This is a method for showing records in the table
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
        if (this.records) {
            this.records.forEach(function (record) {
                // if not yet updated then show the '-'
                var updated = '-';
                if (record.last_updated_by[record.last_updated_by.length - 1]) {
                    updated = record.last_updated_by[record.last_updated_by.length - 1];
                }
                // if not yet updated by any teacher then show the '-'
                var last_updated = "-";
                if (record.last_updated) {
                    last_updated = record.last_updated;
                }
                // add new row
                var new_records = "\n                    <tr class=\"".concat(record.status.replaceAll(" ", "_"), "\">\n                        <td>").concat(record.record_id, "</td>\n                        <td>").concat(record.title, "</td>\n                        <td>").concat(record.date_sent, "</td>\n                        <td>").concat(record.status, "</td>\n                        <td>").concat(updated, "</td>\n                        <td>").concat(last_updated, "</td>\n                    </tr>\n                    ");
                _this.recordTable.insertAdjacentHTML("beforeend", new_records);
            });
        }
    };
    return RecordTable;
}());
