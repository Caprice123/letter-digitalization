"use strict";
exports.__esModule = true;
// make the clock UI for the page
var clock = new Clock("ct7");
clock.update();
// make the user dropdown UI for the page
var profileDropdown = new ProfileDropdown(".dropdown-content", ".user");
// make the sidebar UI for the page
var sidebar = new SidebarDropdown(".dropdown-btn", ".dropdown-container");
// make the flash popup window for the page
var flash = new Flash("failedsignin");
var closefailed = function () { return flash.closeFailed(); };
