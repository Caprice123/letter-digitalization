import {HTML, input, int, str, bool, ListHTML, button, ListButton, ListInput} from '../type'

// make the clock UI for the page
let clock = new Clock("ct7")
clock.update()

// make the user dropdown UI for the page
let profileDropdown = new ProfileDropdown(".dropdown-content", ".user")

// make the sidebar UI for the page
var sidebar = new SidebarDropdown(".dropdown-btn", ".dropdown-container")

// make the flash popup window for the page
let flash = new Flash("failedsignin")
const closefailed = () => flash.closeFailed()