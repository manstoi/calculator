/*

This is a simple calculator. Additional features could have been added (some of these are written below). Although comments don't usually repeat the code itself but are meant
to display a "higher plane" view of the code, I have decided to include the functionality of the code itself in certain comment blocks.

Additional features that can be added:

    1. Error message if the user tries to select an operator prior to selecting an integer
    2. Allow user to continue to use calculator instead of having to refresh after one operation has been completed

*/

let i = 0; // We will use this variable to loop through array 'y' and dynamically create buttons using Javascript
let y = ["1", "2", '3', '4', '5', '6', '7', '8', '9', '+', '-', '*', '/', '=']; // This array will be used to create the calculator buttons   
var printDisplay; // This variable will be used to print the display of the calculator and will be used in numerous loops and functions
let insideOfButton = -1; // The 'insideOfButton' variable has two functions: It will store the value of the pressed calculator button and will be used to ensure that an operator is not chosen before an integer
let chosenOperator;
let convertToInt;
let creatingArray = [];
let operatorArray = [];
let anotherArray = [];
let operatorSwitch = "No!";
let secondInside = 0;
let convertToNumber, secondConvert;
let finalAnswer;
let allowWipe = 0;

function createDisplay () { // The function 'createDisplay' will print the initial calculator display that the user will see

    printDisplay = document.createElement("h3");
    printDisplay.innerHTML = "|_____________________|"
    printDisplay.setAttribute("id", "display");
    document.body.appendChild(printDisplay);

}

function createBody () { // The function 'createBody' will dynamically create the buttons of the calculator
    
    while (i < y.length) {

        var createButton = document.createElement("a");
        createButton.innerHTML = y[i].toString();
        createButton.setAttribute("class", "calculatorButton");
        document.body.appendChild(createButton);
        i++;
    }
}

function attachingEvents () { //add eventListener to dynamically loaded button

    // const buttons = document.getElementsByClassName("calculatorButton");
 
     document.addEventListener('click', function (event) {
 
         if (event.target.matches(".calculatorButton")) { // if element pressed is of the 'calculator button' class
         
             if (event.target.innerHTML % 1 === 0 && creatingArray.length < 6 && operatorSwitch === "No!" && allowWipe === 0) { //if the element is an integer
 
                insideOfButton = event.target.innerHTML; //innerHTML makes it a string
                creatingArray.push(insideOfButton);
                printDisplay.innerHTML = "|___________________" + creatingArray.join("") + "|"; //.join removes the comma
                convertToNumber = parseInt(creatingArray.join(""));
             }  
         } 
 

             if (event.target.innerHTML === "+" || event.target.innerHTML === "-" || event.target.innerHTML === "/" || event.target.innerHTML === "*") { // if element clicked is an operator
 
                 if (insideOfButton != "-1" && operatorArray.length < 1 && allowWipe === 0) { //if an integer has been chosen first before an operator

                    chosenOperator = event.target.innerHTML;
                    operatorArray.push(chosenOperator);
                    printDisplay.innerHTML = "|___________________" + operatorArray + "|"; //.join removes the comma
                    operatorSwitch = "Yes!";

                 }
 
             }


             if (event.target.innerHTML % 1 === 0 && operatorSwitch === "Yes!" && anotherArray.length < 6 && allowWipe === 0) {

                secondInside = event.target.innerHTML;
                anotherArray.push(secondInside);
                printDisplay.innerHTML = "|___________________" + anotherArray.join("") + "|"; //.join removes the comma
                secondConvert = parseInt(anotherArray.join(""));
             }

             if (event.target.innerHTML === "=" && operatorSwitch === "Yes!" && anotherArray.length > 0 && creatingArray.length > 0 && allowWipe === 0) {

               finalAnswer = eval(convertToNumber + chosenOperator + secondConvert); // final answer is in the form of a string. Eval evaluates the string.
               printDisplay.innerHTML = "|___________________" + finalAnswer + "|"; //.join removes the comma
               allowWipe = 1;
 
            }
 
 })};

 function wipeClean () {

    document.addEventListener ('click', function (event) {

        if (event.target.matches("#refreshButton") && allowWipe === 1) {
            allowWipe = 0;
            insideOfButton = 0;
            creatingArray = [];
            operatorArray = [];
            anotherArray = [];
            operatorSwitch = "No!";
            secondInside = 0;
            finalAnswer = 0;
            printDisplay.innerHTML = "|_____________________|"
        }
    })
}
        
window.onload = function() {

    createDisplay();
    createBody();
    attachingEvents();
    wipeClean();
}


