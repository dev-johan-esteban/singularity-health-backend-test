import transporter from './email.js';
import { generateVerificationToken } from './jwt.js';

const sendVerificationEmail = async (user) => {
    const token = generateVerificationToken({ userId: user.id });

    const verificationLink = `http://localhost:5173/verificationEmail?token=${token}`;

    const mailOptions = {
        from: `"Soporte" <${process.env.EMAIL_USER}>`,
        to: user.email,
        subject: 'Verificación de correo electrónico',
        html: `
      <h3>Hola, ${user.name}</h3>
      <p>Gracias por registrarte. Por favor verifica tu correo haciendo clic en el siguiente enlace:</p>
      <a href="${verificationLink}">Verificar mi correo</a>
      <p>Este enlace expirará en 24 horas.</p>
    `,
    };

    await transporter.sendMail(mailOptions);
};
export default sendVerificationEmail;
