let emailIsValid=!1;let passwordIsValid=!1;let passwordsMatch=!1;let registerUsernameIsValid=!1;let registerUsername=document.getElementById("register-username");let registerPassword=document.getElementById("register-password");function validateEmail(){let email=document.getElementById("register-email").value.trim();let submissionIncompleteMsg=document.getElementById("register-submission-incomplete");let invalidEmailMsg=document.getElementById("invalid-email");let domainNames=["com","eu","ie","it","fr","co.uk","edu","gov"];let lastDotIndex=email.lastIndexOf(".");let domainName=email.substring(lastDotIndex+1);let domainNameCheck=!1;if(email===""){submissionIncompleteMsg.style.display="block";submissionIncompleteMsg.style.color="red";submissionIncompleteMsg.innerHTML="Please fill in all fields";emailIsValid=!1;return!1}else if(!email.includes("@")){invalidEmailMsg.style.display="block";invalidEmailMsg.style.color="red";invalidEmailMsg.innerHTML="An email must contain '@' symbol";emailIsValid=!1;return!1}else if(lastDotIndex==-1||lastDotIndex==email.length-1){invalidEmailMsg.style.display="block";invalidEmailMsg.style.color="red";invalidEmailMsg.innerHTML="An email must contain a domain.";emailIsValid=!1;return!1}
for(const domainName1 of domainNames){if(domainName1.toLowerCase()===domainName.toLowerCase()){domainNameCheck=!0;break}}
if(!domainNameCheck){invalidEmailMsg.style.display="block";invalidEmailMsg.style.color="red";invalidEmailMsg.innerHTML="The domain '"+domainName+"' is not supported. Please enter a different email address";emailIsValid=!1;return!1}else{emailIsValid=!0;return!0}}
function RegisterUsernameValidation(){let usernameInput=registerUsername.value.trim();let submissionIncompleteMsg=document.getElementById("register-submission-incomplete");if(usernameInput===""){submissionIncompleteMsg.style.display="block";submissionIncompleteMsg.style.color="red";submissionIncompleteMsg.innerHTML="Please fill in all fields";registerUsernameIsValid=!1;return!1}
let hasInvalidCharacters=!1;for(let i=0;i<usernameInput.length;i++){let character=usernameInput.charAt(i);let utf8ref=character.charCodeAt(0);if(character===" "){continue}
if(character=="-"){continue}
if(character=="_"){continue}
if(utf8ref>=65&&utf8ref<=90){continue}
if(utf8ref>=97&&utf8ref<=122){continue}
if(utf8ref>=192){continue}
if(character<"0"||character>"9"){continue}else{hasInvalidCharacters=!0;break}}
if(hasInvalidCharacters){submissionIncompleteMsg.style.display="block";submissionIncompleteMsg.style.color="red";submissionIncompleteMsg.innerHTML="Username cannot contain symbols other than '_' or '-'";registerUsernameIsValid=!1;return!1}
registerUsernameIsValid=!0;return!0}
function registerPasswordValidation(){let passwordInput=registerPassword.value.trim();let submissionIncompleteMsg=document.getElementById("register-submission-incomplete");let invalidPasswordMsg=document.getElementById("invalid-password");if(passwordInput===""){submissionIncompleteMsg.style.display="block";submissionIncompleteMsg.style.color="red";submissionIncompleteMsg.innerHTML="Please fill in all fields.";passwordIsValid=!1;return!1}
if(passwordInput.length<8){invalidPasswordMsg.style.display="block";invalidPasswordMsg.style.color="red";invalidPasswordMsg.innerHTML="Password must be a minimum of 8 characters";passwordIsValid=!1;return!1}
let passwordHasNumber=!1;let passwordHasSymbol=!1;for(let i=0;i<passwordInput.length;i++){let character=passwordInput.charAt(i);let utf8ref=character.charCodeAt(0);if(utf8ref>=48&&utf8ref<=57){passwordHasNumber=!0;continue}
if(utf8ref>=65&&utf8ref<=90){continue}
if(utf8ref>=97&&utf8ref<=122){continue}
if(utf8ref>=192){continue}
if((utf8ref>=33&&utf8ref<=47)||(utf8ref>=58&&utf8ref<=64)||(utf8ref>=91&&utf8ref<=96)||(utf8ref>=123&&utf8ref<=126)){passwordHasSymbol=!0}else{invalidPasswordMsg.style.display="block";invalidPasswordMsg.style.color="red";invalidPasswordMsg.innerHTML="The password you entered contains unsupported characters";passwordIsValid=!1;return!1}}
if(!passwordHasNumber){invalidPasswordMsg.style.display="block";invalidPasswordMsg.style.color="red";invalidPasswordMsg.innerHTML="Password must contain at least one number";passwordIsValid=!1;return!1}
if(!passwordHasSymbol){invalidPasswordMsg.style.display="block";invalidPasswordMsg.style.color="red";invalidPasswordMsg.innerHTML="Password must contain at least one symbol";passwordIsValid=!1;return!1}
passwordIsValid=!0;return!0}
function registerPasswordMatchValidation(){let passwordInput=registerPassword.value.trim();let confirmPassword=document.getElementById("confirm-password").value.trim();let submissionIncompleteMsg=document.getElementById("register-submission-incomplete");let passwordsDoNotMatchMsg=document.getElementById("passwords-do-not-match");if(confirmPassword===""){submissionIncompleteMsg.style.display="block";submissionIncompleteMsg.style.color="red";submissionIncompleteMsg.innerHTML="Please fill in all fields";passwordsMatch=!1;return!1}
if(passwordInput!==confirmPassword){passwordsDoNotMatchMsg.style.display="block";passwordsDoNotMatchMsg.style.color="red";passwordsDoNotMatchMsg.innerHTML="Passwords do not match. Please try again";passwordsMatch=!1;return!1}
passwordsMatch=!0;return!0}
function validateRegisterForm(){RegisterUsernameValidation();validateEmail();registerPasswordValidation();registerPasswordMatchValidation();if(emailIsValid&&registerUsernameIsValid&&passwordIsValid&&passwordsMatch){alert("Account would be created (currently not implemented).");return!1}
return!1}
