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
var AdminHistory = /** @class */ (function (_super) {
    __extends(AdminHistory, _super);
    /**
     * This is class for making the table UI for the admin history page
     *
     * -------------------------------------------
     * Parameters:
     * datas: Array<any> - the datas of all teachers
     * theadcolumns: str - the header of the table
     * -------------------------------------------
     *
     * -------------------------------------------
     * ATTRIBUTES:
     * PROTECTED
     * datas: Array<any> - the datas of all teachers
     * theadcolumns: str - the header of the table
     * -------------------------------------------
     *
     *
     * -------------------------------------------
     * Methods:
     * PRIVATE:
     * updateTable(): void - a method for showing the datas in the tables
     * -------------------------------------------
   */
    function AdminHistory(datas, theadcolumns) {
        var _this = 
        /**
         * Parameters:
         * datas: Array<any> - the datas of all teachers
         * theadcolumns: str - the header of the table
         */
        _super.call(this, datas, theadcolumns) || this;
        _this.updateTable();
        _this.updateEventListenerButton();
        return _this;
    }
    /***************************************************************************************/
    // PRIVATE METHOD
    AdminHistory.prototype.updateTable = function () {
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
                var new_row = "\n                    <tr>\n                        <td>".concat(data.id, "</td>\n                        <td>").concat(data.date, "</td>\n                        <td>").concat(data.description, "</td>\n                        <td>\n                            <div class=\"response\">\n                                <button class=\"delete\" data-id=\"").concat(data.id, "\"> <i class=\"fa fa-trash-o\"></i></button>\n                            </div> \n                        </td>\n                    </tr>\n                    ");
                _this.tbody.insertAdjacentHTML("beforeend", new_row);
            });
        }
    };
    return AdminHistory;
}(Admin));
// the table columns
var theadColumns = "\n<tr>\n    <th>ID</th>\n    <th>Date</th>\n    <th>Description</th>\n    <th>Action</th>\n</tr>\n";
// make the admin history data UI
var adminHistory = new AdminHistory(datas.histories, theadColumns);
