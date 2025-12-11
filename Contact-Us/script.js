// // Try to script the collapse of navbar?
// window.addEventListener('resize', function(){
//     const navbar=document.querySelector('.navbar-collapse');
//     if (window.innerWidth < 1285) {
//         navbar.classList.add('collapse');
//     } else {
//         navbar.classList.remove('collapse');
//     }
// });
// *************************************************
// // take the name, email and phone number
// // https://www.w3schools.com/js/js_htmldom_eventlistener.asp
// document.getElementById("submit").addEventListener("click", function(){
//     let name=document.getElementById("name").value.trim();
//     let email=document.getElementById("email").value.trim();
//     let tel=document.getElementById("phone-number").value.trim();

//     // check that there is input
//     if(name===""||email===""||tel===""){
//         // txt.innerHTML="Please fill in all fields.";
//         alert("Please fill in all fields.");
//         return;
//     }

//     // email validation
//     const domainNames=[".com", ".eu", ".ie", ".it", ".fr", ".co.uk" , ".edu", ".gov"];
//     if(!email.includes("@")||!email.includes(domainNames)){
//         // txt.innerHTML="The email you entered is invalid.";
//         alert("The email you entered is invalid.");
//         return;
//     }
// )
// It already checks on its own, I need to work on the rest, so I will
// come back to this only if I have time

// Needs to listen for submission first
// document.getElementById("submit").addEventListener("click", function(){
// Make sure that the form is valid before hiding: https://www.w3schools.com/js/js_validation_api.asp
// const submissionComplete=document.getElementById("submit");
// *************************************************
// Look back at W7, W8 and W9 to look again st the basics. The rabbit holes are confusing you
// steps in W8 are onclick on HTML does a function(), which is performed 
// in JS file. Try this format
// ****************************************************************************************************************************

// Declare vars
let nameIsValid=false;
let emailIsValid=false;
let phoneNoIsValid=false;
let issueIsValid=false;

// Functions
// Name
function validateName(){
    // Declare vars
    let name=document.getElementById("name").value.trim();
    let submissionIncompleteMsg=document.getElementById("submission-incomplete");
    let invalidNameMsg=document.getElementById("name-invalid");

    // Compute
    if(name===""){
        // https://www.w3schools.com/jsref/dom_obj_style.asp
        submissionIncompleteMsg.style.display="block";
        submissionIncompleteMsg.style.color="red";
        submissionIncompleteMsg.innerHTML="Please fill in all fields"
        nameIsValid=false;
        return false;
    }

    // Make sure it has no symbol
    let hasSymbol=false;

    // https://www.w3schools.com/jsref/jsref_charat.asp
    // https://www.w3schools.com/jsref/jsref_continue.asp
    for(let i=0;i<name.length;i++){
        // declare vars for the character being looped
        let character=name.charAt(i);
        let utf8ref=character.charCodeAt(0);

        // Can have space as long as there are other characters
        if(character==" "){
            continue;
        }

        // Allow some symbols like hyphens or apostriphes for last names
        if(character=="-"){
            continue;
        }
        if(character=="'"){
            continue;
        }

        // Include all the characters that could be used in any language
        // https://www.w3schools.com/charsets/ref_utf_reference.asp
        if(utf8ref>=65&&utf8ref<=90){
            continue;
        }
        if (utf8ref>=97&&utf8ref<=122){
            continue;
        }
        if(utf8ref>=192){
            continue;
        }

        // If all of these don't pass, then the name contains a symbol
        hasSymbol=true;
        break;
    }
    if(hasSymbol){
            invalidNameMsg.style.display="block";
            invalidNameMsg.style.color="red";
            invalidNameMsg.innerHTML="Names cannot contain numbers or symbols";
            nameIsValid=false;
            return false;
    }
    else{
        invalidNameMsg.style.display="none";
        nameIsValid=true;
        return true;
    }
}

// Email
function validateEmail(){
    // Declare vars
    let email=document.getElementById("email").value.trim();
    let submissionIncompleteMsg=document.getElementById("submission-incomplete");
    let invalidEmailMsg=document.getElementById("invalid-email");
    let domainNames=["com", "eu", "ie", "it", "fr", "co.uk" , "edu", "gov"];
    // Looked up the JS equivalent of lastDotIndex in Java: https://www.w3schools.com/jsref/jsref_lastindexof.asp
    let lastDotIndex=email.lastIndexOf(".");
    // Looked up the JS equivalent of .substring in Java: https://www.w3schools.com/jsref/jsref_substring.asp
    let domainName=email.substring(lastDotIndex+1); // Whatever the user enters after the "."
    let domainNameCheck=false; // False by default

    // Compute
    if(email===""){
        submissionIncompleteMsg.style.display="block";
        submissionIncompleteMsg.style.color="red";
        submissionIncompleteMsg.innerHTML="Please fill in all fields";
        emailIsValid=false;
        return false;
    }
    else if(!email.includes("@")){
        invalidEmailMsg.style.display="block";
        invalidEmailMsg.style.color="red";
        invalidEmailMsg.innerHTML="An email must contain '@' symbol";
        emailIsValid=false;
        return false;
    }
    else if(lastDotIndex==-1 /*is it in the email?*/||lastDotIndex==email.length-1/*is it in last place?*/){
        invalidEmailMsg.style.display="block";
        invalidEmailMsg.style.color="red";
        invalidEmailMsg.innerHTML="An email must contain a domain.";
        emailIsValid=false;
        return false;
    }
    // check for domain
    // Looked up the JS equivalent of equalsIgnoreCase in Java:
    // https://stackoverflow.com/questions/2140627/how-to-do-case-insensitive-string-comparison
    // https://www.w3schools.com/jsref/jsref_localecompare.asp
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toLowerCase
    // https://www.w3schools.com/jsref/jsref_toLowerCase.asp
    for(const domainName1 of domainNames){
        if(domainName1.toLowerCase()===domainName.toLowerCase()){
            domainNameCheck=true;
            break;
        }
    }
    if(!domainNameCheck){
        invalidEmailMsg.style.display="block";
        invalidEmailMsg.style.color="red";
        invalidEmailMsg.innerHTML="The domain '"+domainName+"' is not supported. Please enter a different email address";
        emailIsValid=false;
        return false;
    }
    else{
        emailIsValid=true;
        return true;
    }
}

// Phone number
function validatePhoneNo(){
    // Declare vars
    let phoneNo=document.getElementById("phone-number").value.trim();
    let submissionIncompleteMsg=document.getElementById("submission-incomplete");
    let invalidPhoneNo=document.getElementById("invalid-phone-number");
    let hasOnlyNumbers=false;

    // Compute
    if(phoneNo===""){
        submissionIncompleteMsg.style.display="block";
        submissionIncompleteMsg.style.color="red";
        submissionIncompleteMsg.innerHTML="Please fill in all fields";
        phoneNoIsValid=false;
        return false;
    }
    // else if(phoneNo.includes(Number)){
    //     invalidPhoneNo.style.display="block";
    //     invalidPhoneNo.style.color="red";
    //     invalidPhoneNo.innerHTML="A phone number must contain only numbers";
    //     phoneNoIsValid=false;
    //     return false;
    // }
    // else{
    //     phoneNoIsValid=true;
    //     return true;
    // }

    for (let i=0;i<phoneNo.length;i++){
        // declare vars for the character being looped
        let character=phoneNo.charAt(i);

        // if it's a digit, then pass
        if(character<"0"||character>"9"){
            hasOtherThanNo=true;
            break;
        }
    }
    if(hasOtherThanNo){
        invalidPhoneNo.style.display="block";
        invalidPhoneNo.style.color="red";
        invalidPhoneNo.innerHTML="A phone number must contain only numbers";
        hasOtherThanNo=false;
        return false;
    }
    else{
        phoneNo=true;
        return true;
    }
}

// Issue
function validateIssue(){
    // Declare vars
    let issue=document.getElementById("issue").value.trim();
    let submissionIncompleteMsg=document.getElementById("submission-incomplete");

    // Compute
    if(issue===""){
        submissionIncompleteMsg.style.display="block";
        submissionIncompleteMsg.style.color="red";
        submissionIncompleteMsg.innerHTML="Please fill in all fields"
        issueIsValid=false;
        return false;
    }
    else{
        issueIsValid=true;
        return true;
    }
}

// Hide form
function hideForm(){

    // Check for all the above before running
    validateName();
    validateEmail();
    validatePhoneNo();
    validateIssue();

    // Of all passes
    if(nameIsValid&&emailIsValid&&phoneNoIsValid&&issueIsValid){
        // hide form after submission
        document.getElementById("contact-us-form").style.display="none";
        document.getElementById("submission-incomplete").style.display="none";
        // submission message
        document.getElementById("submission-complete").style.display="block";
        document.getElementById("submission-complete").innerText="Thanks for contacting us, we'll get back to you promptly!";
        // Stop from making real submissions
    }
    return false;
}