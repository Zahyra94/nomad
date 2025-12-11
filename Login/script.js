// Declare vars - registration
let emailIsValid=false;
let passwordIsValid=false;
let passwordsMatch=false;
let registerUsernameIsValid=false;
let registerUsername=document.getElementById("register-username");
let registerPassword= document.getElementById("register-password");


// Registering Email
function validateEmail(){
    // Declare vars
    let email=document.getElementById("register-email").value.trim();
    let submissionIncompleteMsg=document.getElementById("register-submission-incomplete");
    let invalidEmailMsg=document.getElementById("invalid-email");
    let domainNames=["com", "eu", "ie", "it", "fr", "co.uk" , "edu", "gov"];
    let lastDotIndex=email.lastIndexOf(".");
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

// Registering Username
function RegisterUsernameValidation(){
    let usernameInput=registerUsername.value.trim();
    let submissionIncompleteMsg=document.getElementById("register-submission-incomplete");

    // Compute
    if(usernameInput===""){
        submissionIncompleteMsg.style.display="block";
        submissionIncompleteMsg.style.color="red";
        submissionIncompleteMsg.innerHTML="Please fill in all fields";
        registerUsernameIsValid=false;
        return false;
    }

    // Character validation
    let hasInvalidCharacters=false;

    // Declare vars for the character being looped
    for(let i=0; i<usernameInput.length; i++){
        let character=usernameInput.charAt(i);
        let utf8ref=character.charCodeAt(0);

        // Can have space as long as there are other characters
        if(character===" "){
            continue;
        }
        // Allow hyphen and underscore
        if(character=="-"){
            continue;
        }
        if(character=="_"){
            continue;
        }
        // Allow letters of all alphabets
        if(utf8ref>=65&&utf8ref<=90){
            continue;
        }
        if (utf8ref>=97&&utf8ref<=122){
            continue;
        }
        if(utf8ref>=192){
            continue;
        }
        // Allow for numbers
        if(character<"0"||character>"9"){
            continue;
        }
        // Anything else is invalid
        else{
            hasInvalidCharacters=true;
            break;
        }
    }

    if (hasInvalidCharacters){
        submissionIncompleteMsg.style.display="block";
        submissionIncompleteMsg.style.color="red";
        submissionIncompleteMsg.innerHTML="Username cannot contain symbols other than '_' or '-'";
        registerUsernameIsValid=false;
        return false;
    }

    registerUsernameIsValid=true;
    return true;
}

// Password creation
// Declare vars
function registerPasswordValidation() {
    let passwordInput=registerPassword.value.trim();
    let submissionIncompleteMsg=document.getElementById("register-submission-incomplete");
    let invalidPasswordMsg=document.getElementById("invalid-password");

    // Compute
    if (passwordInput===""){
        submissionIncompleteMsg.style.display="block";
        submissionIncompleteMsg.style.color="red";
        submissionIncompleteMsg.innerHTML="Please fill in all fields.";
        passwordIsValid=false;
        return false;
    }

    // Set minimum of 8 characters in password
    if (passwordInput.length<8){
        invalidPasswordMsg.style.display="block";
        invalidPasswordMsg.style.color="red";
        invalidPasswordMsg.innerHTML="Password must be a minimum of 8 characters";
        passwordIsValid=false;
        return false;
    }

    // Make sure password has at least 1 number and 1 symbol + 1 higher and 1 lower case letter
    let passwordHasNumber=false;
    let passwordHasSymbol=false;

    for(let i=0;i<passwordInput.length; i++){
        // Declare vars for the character being looped
        let character=passwordInput.charAt(i);
        let utf8ref=character.charCodeAt(0);

        // Check for numbers
        if(utf8ref>=48&&utf8ref<=57){
            passwordHasNumber=true;
            continue;
        }

        // Check for upper case
        if(utf8ref>=65&&utf8ref<=90){
            continue;
        }

        // Check for lower case
        if(utf8ref>=97&&utf8ref<=122){
            continue;
        }

        // Check for accented letters
        if(utf8ref>=192){
            continue;
        }

        // Check for symbols but not emojis
        if((utf8ref>=33&&utf8ref<=47)||(utf8ref>=58&&utf8ref<=64)||(utf8ref>=91&&utf8ref<=96)||(utf8ref>=123&&utf8ref<=126)){
            passwordHasSymbol=true;
        }
        else{
            invalidPasswordMsg.style.display="block";
            invalidPasswordMsg.style.color="red";
            invalidPasswordMsg.innerHTML="The password you entered contains unsupported characters";
            passwordIsValid=false;
            return false;
        }
        
    }
    if(!passwordHasNumber){
        invalidPasswordMsg.style.display="block";
        invalidPasswordMsg.style.color="red";
        invalidPasswordMsg.innerHTML="Password must contain at least one number";
        passwordIsValid=false;
        return false;
    }
    if(!passwordHasSymbol){
        invalidPasswordMsg.style.display="block";
        invalidPasswordMsg.style.color="red";
        invalidPasswordMsg.innerHTML="Password must contain at least one symbol";
        passwordIsValid=false;
        return false;
    }
    passwordIsValid=true;
    return true;
}

// Password confirmation
function registerPasswordMatchValidation(){
    let passwordInput=registerPassword.value.trim();
    let confirmPassword=document.getElementById("confirm-password").value.trim();
    let submissionIncompleteMsg=document.getElementById("register-submission-incomplete");
    let passwordsDoNotMatchMsg=document.getElementById("passwords-do-not-match");

    if(confirmPassword===""){
        submissionIncompleteMsg.style.display="block";
        submissionIncompleteMsg.style.color="red";
        submissionIncompleteMsg.innerHTML="Please fill in all fields";
        passwordsMatch=false;
        return false;
    }
    if(passwordInput!==confirmPassword){
        passwordsDoNotMatchMsg.style.display="block";
        passwordsDoNotMatchMsg.style.color="red";
        passwordsDoNotMatchMsg.innerHTML="Passwords do not match. Please try again";
        passwordsMatch=false;
        return false;
    }
    passwordsMatch=true;
    return true;
}

// Validate full form
function validateRegisterForm(){

    // Check for all the above before running
    RegisterUsernameValidation();
    validateEmail();
    registerPasswordValidation();
    registerPasswordMatchValidation();

    // Only allow submission if everything is valid
    if(emailIsValid&&registerUsernameIsValid&&passwordIsValid&&passwordsMatch){
        
        // Don't need to actually register an account for this project, so an alert will do
        alert("Account would be created (currently not implemented).");
        return false; // Keep false so it doesn’t really submit
    }

    // If anything fails, block submission
    return false;
}