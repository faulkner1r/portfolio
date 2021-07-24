/* This script will display the greeting based on the current time input.*/

var today = new Date();
var hourNow = today.getHours();
var welcome;

//Display appropriate greeting based on current time
if (hoursNow > 18) {
  welcome = 'Good evening';
} else if (hourNow > 12) {
  welcome = 'Good Afternoon';
} else if (hourNow > 0) {
  welcome = 'Good Morning';
} else {
  welcome ='Welcome';
}
document.write(welcome);
