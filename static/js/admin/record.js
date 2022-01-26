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
var AdminRecord = /** @class */ (function (_super) {
    __extends(AdminRecord, _super);
    /**
     * This is class for making the table UI for the admin record page
     *
     * -------------------------------------------
     * Parameters:
     * datas: Array<any> - the datas of all records
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
    function AdminRecord(datas, theadcolumns) {
        var _this = 
        /**
         * Parameters:
         * datas: Array<any> - the datas of all teachers
         * theadcolumns: str - the header of the table
         */
        _super.call(this, datas, theadcolumns) || this;
        _this.updateTable();
        return _this;
    }
    /***************************************************************************************/
    // PRIVATE METHOD
    AdminRecord.prototype.updateTable = function () {
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
        this.datas.forEach(function (data) {
            // parsing the status of the records
            var status;
            if (data.status == "accepted") {
                status = "accepted";
            }
            else if (data.status == "rejected") {
                status = "rejected";
            }
            else {
                status = "sent";
            }
            // inserting all data and make the edit and delete button
            var new_row = "\n                <tr class=\"".concat(status, "\">\n                    <td>").concat(data.record_id, "</td>\n                    <td>").concat(data.title, "</td>\n                    <td>").concat(data.has_record.name, "</td>\n                    <td>").concat(data.has_record.nim, "</td>\n                    <td>").concat(data.date_sent, "</td>\n                    <td>").concat(data.status, "</td>\n                </tr>\n                ");
            _this.tbody.insertAdjacentHTML("beforeend", new_row);
        });
    };
    return AdminRecord;
}(Admin));
// the table columns
var theadColumns = "\n<tr>\n    <th>ID</th>\n    <th>Subject</th>\n    <th>Name</th>\n    <th>NIM</th>\n    <th>Sent</th>\n    <th>Status</th>\n</tr>\n";
// make the admin record data UI
var record_admin = new AdminRecord(datas.records, theadColumns);
