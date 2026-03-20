

let inputValue = document.getElementById('inputdate').Value;

console.log(inputValue);

let displayHeading=document.getElementById('text');

displayHeading.innerHTML = inputValue;

displayHeading.style.color = 'red';

// change color of body element

document.getElementsByTagName('body')[0].style.backgroundColor = 'lightblue';

// add event liistener method
 
let paraBkg = document.getElementById('para');

function colorChange(){
    paraBkg.style.backgroundColor = 'yellow';
}