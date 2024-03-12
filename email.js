const nodemailer = require('nodemailer');

// Configura el transporte SMTP de Nodemailer para Gmail
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});


// Función para enviar el correo electrónico con los datos del formulario
function enviarCorreoElectronico(infoFormulario) {
    // Define el contenido del correo electrónico
    const correoElectronico = {
        from: 'aldaxseguros@gmail.com',
        to: 'aldaxseguros@gmail.com', // Cambia esto con tu dirección de correo electrónico
        subject: 'Formulario de Cotización - Seguro de auto',
        html: `
            <h2>Información del formulario:</h2>
            <p><strong>Marca del vehículo:</strong> ${infoFormulario.marca}</p>
            <p><strong>Versión:</strong> ${infoFormulario.version}</p>
            <p><strong>Año del vehículo:</strong> ${infoFormulario.anio}</p>
            <p><strong>Código postal:</strong> ${infoFormulario.codigoPostal}</p>
            <p><strong>¿Su vehículo es a gas?</strong> ${infoFormulario.gas}</p>
            <p><strong>Nombre completo:</strong> ${infoFormulario.nombreCompleto}</p>
            <p><strong>Whatsapp:</strong> ${infoFormulario.whatsapp}</p>
            <p><strong>Email:</strong> ${infoFormulario.email}</p>
        `
    };

    // Envía el correo electrónico
    transporter.sendMail(correoElectronico, function(error, info) {
        if (error) {
            console.error('Error al enviar el correo electrónico:', error);
        } else {
            console.log('Correo electrónico enviado:', info.response);
        }
    });
}

// Agrega un evento de escucha para el envío del formulario
const formulario = document.getElementById('formulario');
formulario.addEventListener('submit', function(event) {
    event.preventDefault();

    // Captura los valores del formulario
    const infoFormulario = {
        marca: document.getElementById('marca').value,
        version: document.getElementById('version').value,
        anio: document.getElementById('anio').value,
        codigoPostal: document.getElementById('codigoPostal').value,
        gas: document.querySelector('input[name="gas"]:checked').value,
        nombreCompleto: document.getElementById('nombreCompleto').value,
        whatsapp: document.getElementById('whatsapp').value,
        email: document.getElementById('email').value
    };

    // Envía el correo electrónico con la información del formulario
    enviarCorreoElectronico(infoFormulario);
});

