"use strict";
exports.__esModule = true;
var RecordTable = /** @class */ (function () {
    function RecordTable(records, teacher) {
        /**
         * Parameters:
        * records: Array<any> - all records that is visible at that subpage
        * role: str - the role of the current teacher
         */
        this.titleForm = document.querySelector(".title-input");
        this.idForm = document.querySelector(".id-input");
        this.responseForm = document.querySelector(".response-input");
        this.submitButton = document.querySelector(".submit");
        this.tbody = document.querySelector("tbody");
        this.acceptButtons = document.querySelectorAll(".button-accepted");
        this.rejectButtons = document.querySelectorAll(".button-rejected");
        this.datas = records;
        this.teacher = teacher;
        this.role = teacher.role;
        console.log(this.teacher.can_see_records);
        this.getData();
    }
    /***************************************************************************************/
    // PRIVATE METHODS
    RecordTable.prototype.getData = function () {
        /**
         * This is a method for updating the record table and adding event listener to all button
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
        // update the table
        this.updateTable(this.datas);
        // find all accept and reject button
        this.acceptButtons = document.querySelectorAll(".button-accepted");
        this.rejectButtons = document.querySelectorAll(".button-rejected");
        // make confirmation before accepting the record
        this.acceptButtons.forEach(function (button) { return button.addEventListener("click", function (e) {
            e.preventDefault();
            if (confirm("Do you want to accept this response?")) {
                _this.titleForm.value = button.dataset.title;
                _this.idForm.value = button.dataset.id;
                _this.responseForm.value = "accepted";
                _this.submitButton.click();
            }
        }); });
        // make confirmation before rejecting the record
        this.rejectButtons.forEach(function (button) { return button.addEventListener("click", function (e) {
            e.preventDefault();
            if (confirm("Do you want to reject this response?")) {
                _this.titleForm.value = button.dataset.title;
                _this.idForm.value = button.dataset.id;
                _this.responseForm.value = "rejected";
                _this.submitButton.click();
            }
        }); });
        // validating the form whether it is bypassed or not
        this.submitButton.addEventListener('click', function (e) {
            if (_this.titleForm.value.length == 0 || _this.idForm.value.length == 0 || _this.responseForm.value.length == 0) {
                alert("You cannot bypass this");
                e.preventDefault();
            }
        });
    };
    RecordTable.prototype.updateTable = function (datas) {
        /**
         * This is a method for making the record seen in the page
         *
         * -------------------------------------------
         * Parameter
         * datas: any[] - all datas that will be seen in the page
         * -------------------------------------------
         *
         * -------------------------------------------
         * Return
         * None
         * -------------------------------------------
         */
        var _this = this;
        console.log(datas);
        datas.forEach(function (d) {
            // parsing the current progress in the required role accept
            var index = d.required_role_accept.indexOf(_this.role);
            var new_row = "";
            // if the status is still sent and current role is the same as the next order for accepting or rejecting
            // make button for accepting and rejecting the record and show it in white color
            if (d.status == "sent" && index == 0) {
                new_row =
                    "\n                        <tr>\n                            <td>".concat(d.record_id, "</td>\n                            <td class=\"redirect\" style=\"cursor: pointer;\">").concat(d.title, "</td>\n                            <td>").concat(d.has_record.name, "</td>\n                            <td>").concat(d.has_record.nim, "</td>\n                            <td>").concat(d.date_sent, "</td>\n                            <td>\n                            <div class=\"response\">\n                                <button class=\"button-accepted\" data-title=\"").concat(d.title, "\" data-id=\"").concat(d.record_id, "\"> &#10004</button>\n                                <button class=\"button-rejected\" data-title=\"").concat(d.title, "\" data-id=\"").concat(d.record_id, "\"> &#10006</button>\n                                </div>\n                            </td>\n                        </tr>\n                        ");
            }
            // if the status is contains accepted then filter again
            else if (d.status.includes("accepted")) {
                var progress = d.status.replaceAll("accepted ", "").split("/");
                progress = progress[0];
                // if the status already accepted then dont make the accept and reject button and show it in green colo
                if (d.status == "accepted") {
                    new_row =
                        "\n                            <tr class=\"accepted\">\n                                <td>".concat(d.record_id, "</td>\n                                <td>").concat(d.title, "</td>\n                                <td>").concat(d.has_record.name, "</td>\n                                <td>").concat(d.has_record.nim, "</td>\n                                <td>").concat(d.date_sent, "</td>\n                                <td>DONE</td>\n                            </tr>\n                            ");
                }
                // if the next step acceptance or rejectance is the same as current position then
                // make accept and reject buttons and show it in white color
                else if (+progress == index) {
                    new_row =
                        "\n                            <tr>\n                                <td>".concat(d.record_id, "</td>\n                                <td class=\"redirect\">").concat(d.title, "</td>\n                                <td>").concat(d.has_record.name, "</td>\n                                <td>").concat(d.has_record.nim, "</td>\n                                <td>").concat(d.date_sent, "</td>\n                                <td>\n                                <div class=\"response\">\n                                    <button class=\"button-accepted\" data-title=\"").concat(d.title, "\" data-id=\"").concat(d.record_id, "\"> &#10004</button>\n                                    <button class=\"button-rejected\" data-title=\"").concat(d.title, "\" data-id=\"").concat(d.record_id, "\"> &#10006</button>\n                                    </div>\n                                </td>\n                            </tr>\n                            ");
                }
                // if the current teacher already pass the current step of acceptance or rejectance then
                // show it in green color 
                else if (+progress > index) {
                    new_row =
                        "\n                            <tr class=\"accepted\">\n                                <td>".concat(d.record_id, "</td>\n                                <td>").concat(d.title, "</td>\n                                <td>").concat(d.has_record.name, "</td>\n                                <td>").concat(d.has_record.nim, "</td>\n                                <td>").concat(d.date_sent, "</td>\n                                <td></td>\n                            </tr>\n                            ");
                }
                // if the current role not in required role accept means that the teacher can see all records then
                // make it light mode without accept or reject button
                else {
                    new_row =
                        "\n                            <tr>\n                                <td>".concat(d.record_id, "</td>\n                                <td>").concat(d.title, "</td>\n                                <td>").concat(d.has_record.name, "</td>\n                                <td>").concat(d.has_record.nim, "</td>\n                                <td>").concat(d.date_sent, "</td>\n                                <td></td>\n                            </tr>\n                            ");
                }
            }
            // if the status is rejected then 
            // show it in red color
            else if (d.status == "rejected") {
                new_row =
                    "\n                        <tr class=\"rejected\">\n                            <td>".concat(d.record_id, "</td>\n                            <td>").concat(d.title, "</td>\n                            <td>").concat(d.has_record.name, "</td>\n                            <td>").concat(d.has_record.nim, "</td>\n                            <td>").concat(d.date_sent, "</td>\n                            <td></td>\n                        </tr>\n                        ");
            }
            // else show it in light color
            else {
                if (_this.teacher.can_see_records == false) {
                    console.log(window.location.pathname.split("/")[2]);
                    if (window.location.pathname.split("/")[2] == "all") {
                        new_row =
                            "\n                                <tr>\n                                    <td>".concat(d.record_id, "</td>\n                                    <td>").concat(d.title, "</td>\n                                    <td>").concat(d.has_record.name, "</td>\n                                    <td>").concat(d.has_record.nim, "</td>\n                                    <td>").concat(d.date_sent, "</td>\n                                    <td></td>\n                                </tr>\n                                ");
                    }
                }
                else {
                    new_row =
                        "\n                            <tr>\n                                <td>".concat(d.record_id, "</td>\n                                <td>").concat(d.title, "</td>\n                                <td>").concat(d.has_record.name, "</td>\n                                <td>").concat(d.has_record.nim, "</td>\n                                <td>").concat(d.date_sent, "</td>\n                                <td></td>\n                            </tr>\n                            ");
                }
            }
            _this.tbody.insertAdjacentHTML("beforeend", new_row);
        });
        // make all row that can accept or reject can open new tab and open outlook when it is clicked
        var redirectBtns = document.querySelectorAll(".redirect");
        redirectBtns.forEach(function (button) { return button.addEventListener("click", function (e) {
            window.open("https://outlook.office.com/mail/inbox");
        }); });
    };
    return RecordTable;
}());
