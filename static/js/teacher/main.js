// make the clock UI for the page
var clock = new Clock("ct7");
clock.update();
// make the user dropdown UI for the page
var dropdown = new ProfileDropdown(".dropdown-content", ".user");
// make the record table for the page
var recordTable = new RecordTable(records.records, teacher);
// make the flash popup window for the page
var flash = new Flash("failedsignin");
var closefailed = function () { return flash.closeFailed(); };
