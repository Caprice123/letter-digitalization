// make the clock UI for the page
let clock = new Clock("ct7")
clock.update()

// make the user dropdown UI for the page
let dropdown = new ProfileDropdown(".dropdown-content", ".user")

// make the record table for the page
let recordTable = new RecordTable(records.records, teacher)

// make the flash popup window for the page
let flash = new Flash("failedsignin")
const closefailed = () => flash.closeFailed()