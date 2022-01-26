function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show"); 
}
window.addEventListener("click",event=>{
  if (!event.target.matches('.user')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
},true)

function display_ct7() {
  var x = new Date()
  var ampm = x.getHours( ) >= 12 ? ' PM' : ' AM';
  hours = x.getHours( ) % 12;
  hours = hours ? hours : 12;
  hours=hours.toString().length==1? 0+hours.toString() : hours;
  
  var minutes=x.getMinutes().toString()
  minutes=minutes.length==1 ? 0+minutes : minutes;
  
  var seconds=x.getSeconds().toString()
  seconds=seconds.length==1 ? 0+seconds : seconds;
  
  var month=(x.getMonth() +1).toString();
  month=month.length==1 ? 0+month : month;
  
  var dt=x.getDate().toString();
  dt=dt.length==1 ? 0+dt : dt;
  
  var x1=month + "/" + dt + "/" + x.getFullYear(); 
  x1 = x1 + " - " +  hours + ":" +  minutes + ":" +  seconds + " " + ampm;
  document.getElementById('ct7').innerHTML = x1;
  display_c7();
   }
   function display_c7(){
  var refresh=1000; // Refresh rate in milli seconds
  mytime=setTimeout('display_ct7()',refresh)
  }
  display_c7()

  // function openCity(evt, cityName) {
  //   var i, tabcontent, tablinks;
  //   tabcontent = document.getElementsByClassName("tabcontent");
  //   for (i = 0; i < tabcontent.length; i++) {
  //     tabcontent[i].style.display = "none";
  //   }
  //   tablinks = document.getElementsByClassName("tablinks");
  //   for (i = 0; i < tablinks.length; i++) {
  //     tablinks[i].className = tablinks[i].className.replace(" active", "");
  //   }
  //   document.getElementById(cityName).style.display = "block";
  //   evt.currentTarget.className += " active";
  // }
  // document.getElementById("defaultOpen").click();

  function acceptedresponse(e) {
    console.log(e)
    if (confirm("Do you want to accept this response?")) {
      e.preventDefault()
      console.log(this.data)  
      // location.href = '/acceptedresponse.php';
    }
  }

  function rejectedresponse() {
    if (confirm("Do you want to reject this response?")) {
        location.href = '/rejectedresponse.php';
    }
  }
const acceptButtons = document.querySelectorAll(".accepted")


const inputTitle = document.querySelector(".title-input")
var inputID = document.querySelector(".id-input"),
    submitBtn = document.querySelector(".submit")

acceptButtons.forEach(
  button => button.addEventListener("click", e => {
    e.preventDefault()
    console.log(inputTitle.value)
    if (confirm("Do you want to delete this response?")) {
      inputTitle.value = button.dataset.title
      inputID.value = button.dataset.id
      submitBtn.click()
      console.log(inputTitle.value)
    }
  })
)
var dropdown = document.querySelector(".dropdown-btn");


dropdown.addEventListener("click", function() {
  this.classList.toggle("active");
  var dropdownContent = this.nextElementSibling;
  document.querySelector(".dropdown-container").classList.toggle("active")
  if (dropdownContent.style.display === "block") {
    
    // dropdownContent.style.display = "none";
  } else {
    // dropdownContent.classList.add("active")
    // dropdownContent.style.display = "block";
  }
})

function openCity(evt, cityName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}
document.getElementById("defaultOpen").click();

const form = document.getElementById("myForm")
const openforgot = () => form.style.display = "block"
const closeForm = () => form.style.display = "none"
closeForm()

function enableTab(contentt) {
  var el = document.getElementById(contentt);
  el.onkeydown = function(e) {
      if (e.keyCode === 9) { // tab was pressed

          // get caret position/selection
          var val = this.value,
              start = this.selectionStart,
              end = this.selectionEnd;

          // set textarea value to: text before caret + tab + text after caret
          this.value = val.substring(0, start) + '\t' + val.substring(end);

          // put caret at right position again
          this.selectionStart = this.selectionEnd = start + 1;

          // prevent the focus lose
          return false;

      }
  };
}

// Enable the tab character onkeypress (onkeydown) inside textarea...
// ... for a textarea that has an `id="my-textarea"`
enableTab('contentt');


// function afterText() {
  // var txt1 = "<b>aaa </b>";           // Create element with HTML
  // var txt2 = $("<i></i>").text("love ");  // Create with jQuery
  // var txt3 = document.createElement("b");   // Create with DOM
  // txt3.innerHTML = "jQuery!";
  // $(".acceptedby").after(txt1);    // Insert new elements after img
// }

$(document).ready(function(){

  // Add new element
  $(".addaccbutton").click(function(){

      // Finding total number of elements added
      var total_element = $(".acceptedby").length;
                  
      // last <div> with element class id
      var lastid = $(".acceptedby:last").attr("id");
      var split_id = lastid.split("_");
      var nextindex = Number(split_id[1]) + 1;

      var max = 5;
      // Check total number elements
      if(total_element < max ){
          // Adding new div container after last occurance of element class
          $(".acceptedby:last").after("<div class='acceptedby' id='div_"+ nextindex +"'></div>");
                      
          // Adding element to <div>
          $("#div_" + nextindex).append("<input type='text' class='addinputtext' placeholder='Enter Role' id='txt_"+ nextindex +"'><span id='remove_" + nextindex + "' class='remove'>X</span>");
                  
      }
                  
  });

  // Remove element
  $('.addaccept').on('click','.remove',function(){
              
      var id = this.id;
      var split_id = id.split("_");
      var deleteindex = split_id[1];

      // Remove <div> with id
      $("#div_" + deleteindex).remove();
  });                
});

const formedit = document.getElementById("myedit")
const newedit = () => formedit.style.display = "block"
const cancelEdit = () => formedit.style.display = "none"
cancelEdit()

function enableTab(contenttextareaid) {
  var edit = document.getElementById(contenttextareaid);
  edit.onkeydown = function(e) {
      if (e.keyCode === 9) { 
          var valuee = this.values,
              startt = this.selectionStarts,
              endd = this.selectionEndd;
          this.values = valuee.substring(0, startt) + '\t' + valuee.substring(endd);
          this.selectionStarts = this.selectionEnd = startt + 1;
          return false;
      }
  };
}
enableTab('contenttextareaid');








// ---------------------------------------------------todolist-----------------------------------------------------

//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.
//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.
//Event handling, uder interaction is what starts the code execution.

var taskInput=document.getElementById("new-task");//Add a new task.
var addButton=document.getElementsByTagName("button")[0];//first button
var incompleteTaskHolder=document.getElementById("incomplete-tasks");//ul of #incomplete-tasks
var completedTasksHolder=document.getElementById("completed-tasks");//completed-tasks


//Mark task completed
var taskCompleted=function(){
		console.log("Complete Task...");
	
	//Append the task list item to the #completed-tasks
	var listItem=this.parentNode;
	completedTasksHolder.appendChild(listItem);
				bindTaskEvents(listItem, taskIncomplete);
}
var taskIncomplete=function(){
		console.log("Incomplete Task...");
//Mark task as incomplete.
	//When the checkbox is unchecked
		//Append the task list item to the #incomplete-tasks.
		var listItem=this.parentNode;
	incompleteTaskHolder.appendChild(listItem);
			bindTaskEvents(listItem,taskCompleted);
}

var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
	console.log("bind list item events");
//select ListItems children
	var checkBox=taskListItem.querySelector("input[type=checkbox]");
			//Bind taskCompleted to checkBoxEventHandler.
			checkBox.onchange=checkBoxEventHandler;
}
//cycle over incompleteTaskHolder ul list items
	//for each list item
	for (var i=0; i<incompleteTaskHolder.children.length;i++){

		//bind events to list items chldren(tasksCompleted)
		bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
	}
//cycle over completedTasksHolder ul list items
	for (var i=0; i<completedTasksHolder.children.length;i++){
	//bind events to list items chldren(tasksIncompleted)
		bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
	}
// Issues with usabiliy don't get seen until they are in front of a human tester.
//prevent creation of empty tasks.
//Shange edit to save when you are in edit mode.
