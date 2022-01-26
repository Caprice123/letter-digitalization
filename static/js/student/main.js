// make the clock UI for the page
var clock = new Clock("ct7");
clock.update();
// make the user dropdown UI for the page
var dropdown = new ProfileDropdown(".list", ".student1");
// add record popup window UI for the page
var addRecordForm = new AddRecordForm(categories.categories);
addRecordForm.getCategory();
// make the record table for the page
var recordTable = new RecordTable(".record-table", records.records);
recordTable.updateRecordTable();
// make the flash popup window for the page
var flash = new Flash("failedsignin");
var closefailed = function () { return flash.closeFailed(); };
