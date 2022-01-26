// make the clock UI for the page
let clock = new Clock("ct7")
clock.update()

// make the user dropdown UI for the page
let dropdown = new ProfileDropdown(".list", ".student1")

// add record popup window UI for the page
let addRecordForm = new AddRecordForm(categories.categories)
addRecordForm.getCategory()

// make the record table for the page
let recordTable = new RecordTable(".record-table", records.records)
recordTable.updateRecordTable()

// make the flash popup window for the page
let flash = new Flash("failedsignin")
const closefailed = () => flash.closeFailed()
