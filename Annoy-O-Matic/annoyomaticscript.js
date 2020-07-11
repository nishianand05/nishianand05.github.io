// var flag=0;
// while(flag==0)
// {
//   var s = prompt("Are we there yet?");
//   if(s==="yes" || s==="yeah")
//   { alert("Yes, we are finally there");
//     flag=1; }
//   else
//   { alert("We are not there yet"); }
// }
var s = prompt("Are we there yet?");
while( (s.indexOf("yes") && s.indexOf("yeah")) == -1 )
{ var s = prompt("Are we there yet?"); }
alert("Yes, we are finally there");
