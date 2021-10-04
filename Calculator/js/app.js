//variables
//to display num and ops that user clicked on and result
let displayResult = document.querySelector(".result");
//to display live result
let displayLiveResult = document.querySelector(".live-result");
//to check users num and operators to have . and (- only once
let check = "";

//event listeners
//the buttons have a btn class
document.querySelectorAll(".btn").forEach((element) => {
  element.addEventListener("click", checkEntered);
});

//functions
// this function first check users clicked btn kind of
// class mustShow is for btns that should be display and only numbers and . and ops contain mustShow

function checkEntered(e) {
  //to check that if the tags class list contain mustShow class
  if (e.target.classList.contains("mustShow")) {
    //to check btns with mustShow class we use display function
    display(e.target);
    //to check that if the btn contain equal class
  } else if (
    e.target.classList.contains("equal") &&
    displayResult.textContent != "Error"
  ) {
    /* if user clicks on equal btn, the result will be replace in users entered num and ops
        and user can use that result for next calculation */
    showResult(displayResult.textContent);
    //to check that if the btn contain backspace class
  } else if (
    e.target.classList.contains("backspace") ||
    e.target.parentElement.classList.contains("backspace")
  ) {
    /* we have two btn that their classlist contain backspace
        one for remove just one char, and one for remove all the string in result section */
    // to check if the btn text content is C
    if (e.target.textContent == "C") {
      //remove all string in result section and live result section
      displayResult.textContent = "";
      displayLiveResult.textContent = "";
    } else {
      //this condition is for an other backSpace btn that remove only one char from last of string
      //if result sections text content is Error, all string in result and live result seec and check will be remove
      if (displayResult.textContent == "Error") {
        displayResult.textContent = "";
        displayLiveResult.textContent = "";
        check = "";
      } else {
        //else only one char from last of string will be remove
        displayResult.textContent = displayResult.textContent.substr(
          0,
          displayResult.textContent.length - 1
        );
        check = check.substr(0, check.length - 1);
        /*to show live result we send results to show live result function after each click
                on ops and numbers and backspace*/
        showLiveResult(displayResult.textContent);
      }
    }
  }
}

// a function to add clicked number or ops to result section
function display(target) {
  // check that if target contain operator class
  if (target.classList.contains("operator")) {
    // check if result section is not an Error or empty string
    if (
      displayResult.textContent != "" &&
      displayResult.textContent != "Error"
    ) {
      // check that if the last char of result screen is an operator
      switch (displayResult.textContent[displayResult.textContent.length - 1]) {
        //for example if the last char is + it will be replace with users clicked operator
        case "×":
          displayResult.textContent =
            displayResult.textContent.substr(
              0,
              displayResult.textContent.length - 1
            ) + target.textContent;
          break;

        case "÷":
          displayResult.textContent =
            displayResult.textContent.substr(
              0,
              displayResult.textContent.length - 1
            ) + target.textContent;
          break;

        case "-":
          displayResult.textContent =
            displayResult.textContent.substr(
              0,
              displayResult.textContent.length - 1
            ) + target.textContent;
          break;

        case "+":
          displayResult.textContent =
            displayResult.textContent.substr(
              0,
              displayResult.textContent.length - 1
            ) + target.textContent;
          break;

        case "%":
          displayResult.textContent =
            displayResult.textContent.substr(
              0,
              displayResult.textContent.length - 1
            ) + target.textContent;
          break;
        /* if there isnt any operator in the last char, users entered operator will add
                    and check will be empty*/
        default:
          displayResult.textContent =
            displayResult.textContent + target.textContent;
          check = "";
          break;
      }
      //to show live result
      showLiveResult(displayResult.textContent);
    } //if users entere btn is a number, it will add to the last of the result string
  } else if (
    target.classList.contains("number") &&
    displayResult.textContent != "Error"
  ) {
    if (target.textContent == "+/-") {
      //to let user use (- only once in numbers before a
      if (check.indexOf("(-") != -1) {
      } else {
        displayResult.textContent += "(-";
        check += "(-";
      }
      //if users btn wasnt (- it the number will add to the result
    } else {
      displayResult.textContent += target.textContent;
      check += target.textContent;
      showLiveResult(displayResult.textContent);
    } //user can use . in numbers before operator once
  } else if (
    target.classList.contains("dot") &&
    displayResult.textContent != "Error"
  ) {
    if (check.indexOf(".") != -1) {
    } else {
      displayResult.textContent += ".";
      check += ".";
    }
  }
}

//this function is for displaying live result
function showLiveResult(numbers) {
  //to catch error if it couldnt be calculate
  try {
    //to replace × and ÷ and (- with *, / and - so it can be calculate with eval function
    numbers = numbers.replace(/\×/g, "*");
    numbers = numbers.replace(/\÷/g, "/");
    numbers = numbers.replace(/\(-/g, "-");
    displayLiveResult.textContent = eval(numbers);
  } catch (error) {
    //the error for live result section is an empty string
    displayLiveResult.textContent = "";
  }
}

//to replace result with entered numbers and operators
function showResult(numbers) {
  try {
    numbers = numbers.replace(/\×/g, "*");
    numbers = numbers.replace(/\÷/g, "/");
    numbers = numbers.replace(/\(-/g, "-");
    displayResult.textContent = eval(numbers);
    displayLiveResult.textContent = "";
  } catch (error) {
    //if the calculation had an error, "Error" will be replace with the entered numbers and operators
    displayResult.textContent = "Error";
  }
}
