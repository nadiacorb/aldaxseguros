const AWS = require('aws-sdk');
const bodyParser = require('body-parser');

// Configura AWS SES
const ses = new AWS.SES({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'us-east-1', // Cambia esto por la región de tu cuenta SES
});

// Configura el analizador de cuerpo para procesar datos de formulario
app.use(bodyParser.urlencoded({ extended: false }));

// Ruta de manejo de envío de formulario
app.post('/enviar-correo', (req, res) => {
  // Extrae los datos del formulario
 const { marca, version, anio, codigoPostal, nombreCompleto, whatsapp, email } = req.body;
  const gas = req.body.gas === 'si' ? 'Sí' : 'No'; // Convierte el valor del botón de radio en texto legible


  // Configura el contenido del correo electrónico
  const params = {
    Destination: {
      ToAddresses: ['aldaxseguros@gmail.com'], // Cambia esto al destinatario deseado
    },
    Message: {
      Body: {
        Text: {
          Data: `Marca: ${marca}\nVersión: ${version}\nAño: ${anio}\nCódigo Postal: ${codigoPostal}\nVehículo a gas: ${gas}\nNombre completo: ${nombreCompleto}\nWhatsApp: ${whatsapp}\nEmail: ${email}`,
        },
      },
      Subject: { Data: 'Solicitud de cotización - Seguro Automotor' },
    },
    Source: 'aldaxseguros@gmail.com', // Debe estar verificado en SES
  };

  // Envía el correo electrónico
  ses.sendEmail(params, (err, data) => {
    if (err) {
      console.error('Error al enviar el correo electrónico:', err);
      res.status(500).send('Error al enviar el correo electrónico');
    } else {
      console.log('Correo electrónico enviado con éxito:', data);
      res.send('Correo electrónico enviado con éxito');
    }
  });
});

// Inicia el servidor
app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});
