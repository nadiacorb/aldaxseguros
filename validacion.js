const form = document.getElementById('formulario');
const marca = document.getElementById('marca');
const version = document.getElementById('version');
const anio = document.getElementById('anio');
const codigoPostal = document.getElementById('codigoPostal');
const nombreCompleto = document.getElementById('nombreCompleto');
const whatsapp = document.getElementById('whatsapp');
const email = document.getElementById('email');

form.addEventListener('submit', function(e) {
    e.preventDefault();

    checkRequired([marca, version, anio, codigoPostal, nombreCompleto, whatsapp, email]);
});

function checkRequired(inputArr) {
    inputArr.forEach(function(input) {
        if (input.value.trim() === '') {
            showError(input, `Este campo es obligatorio`);
        } else {
            showSuccess(input);
        }
    });

    checkEmail(email);
}

function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form__item error';
    let errorMessage = formControl.querySelector('.error-message');
    if (!errorMessage) {
        errorMessage = document.createElement('span');
        errorMessage.className = 'error-message';
        formControl.appendChild(errorMessage);
    }
    errorMessage.innerText = message;
}

function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form__item success';
    const errorMessage = formControl.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function checkEmail(input) {
    const re = /\S+@\S+\.\S+/;
    if (!re.test(input.value.trim())) {
        showError(input, `Por favor, ingrese un correo electrónico válido`);
    } else {
        showSuccess(input);
    }
}
