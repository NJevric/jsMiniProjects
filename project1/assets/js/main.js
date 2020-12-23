window.onload = () => {
    console.log('proba');

    const forma = document.querySelector('#registerForma');
    const username = document.querySelector('#username');
    const email = document.querySelector('#email');
    const password = document.querySelector('#password');
    const confirmPass = document.querySelector('#confirmPassword');
    const submit = document.querySelector('#submit');

    let showError = (input, message) => {
        const inputTag = input.parentElement;
        input.style.border = '2px solid red';
        const errorText = inputTag.querySelector('small');
        errorText.innerHTML = message;
    }
    let showSuccess = (input) => {
        input.style.border = '2px solid green';
    }

    let checkEmail = (input) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!re.test(input.value)){
            showError(input,'invalid email');
        }
        else{
            showSuccess(input);
        }
    }

    let capitalizeFirstLetter = (input) => {
        return `${input.id.charAt(0).toUpperCase()}${input.id.slice(1)}`;
    }
    let checkRequired = (inputArr) => {
        inputArr.forEach(i => {
            if(i.value.trim() === ''){
                showError(i, `${capitalizeFirstLetter(i)} is required`);
            }
            else{
                showSuccess(i);
            }
        });
        
    }

    let checkInputLength = (input,min,max) => {
        if(input.value.length<min){
            showError(input, `${capitalizeFirstLetter(i)} must be ${min} characters`);
        }
        else if(input.value.length>max){
            showError(input, `${capitalizeFirstLetter(i)} must be less than ${max} characters`);
        }
        else{
            showSuccess(input);
        }
    }

    let checkMatchPassword = (a,b) => {
        if(a.value===b.value) {
            showSuccess(b);
        }
        else{
            showError(b,'Passowrds do not match');
        }
    }
    submit.addEventListener('click',(e) =>{
        e.preventDefault();
        
        checkRequired([username,email,password,confirmPass]);
        checkInputLength(username,3,15);
        checkInputLength(password,5,50);
        checkEmail(email);
        checkMatchPassword(password,confirmPass);
    });
}   