# 🧠 Singularity Health - Backend

Este repositorio contiene la implementación del backend para la prueba técnica de Singularity Health. El backend está construido con **Node.js**, **Express**, **GraphQL** y **Sequelize**, y utiliza una base de datos **MySQL** para almacenar la información.

## 🚀 Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución para JavaScript en el servidor.
- **Express**: Framework minimalista para construir APIs.
- **GraphQL (Apollo Server)**: Para consultas estructuradas y eficientes.
- **Sequelize**: ORM para modelar y acceder a la base de datos.
- **MySQL**: Sistema de gestión de base de datos relacional.
- **bcryptjs**: Para hashear contraseñas de forma segura.
- **dotenv**: Para gestionar variables de entorno.
- **nodemailer**: Para enviar correos electrónicos de verificación.
- **jsonwebtoken**: (Preparado para futura autenticación con JWT).

## 📦 Instalación

```bash
npm install
```

## ▶️ Ejecución

```bash
npm start
```

## 📧 Configuración de Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
# Base de datos
DB_NAME=prueba_tecnica_db
DB_HOST=localhost
DB_USER=root
DB_PASS=

# JWT
JWT_SECRET=secreto123

# Gmail para Nodemailer
EMAIL_USER=example@gmail.com
EMAIL_PASS=qpmjeyuvulrvwcpm
```

- `DB_NAME`: Nombre de la base de datos utilizada por la aplicación.
- `DB_HOST`: Dirección del host donde corre tu base de datos (comúnmente localhost en desarrollo).
- `DB_USER`: Usuario con permisos de acceso a la base de datos.
- `DB_PASS`: Contraseña del usuario de la base de datos (puede quedar vacía en entornos locales).
- `JWT_SECRET`: Clave secreta utilizada para firmar y verificar los tokens JWT generados en el proceso de autenticación.  
  Asegúrate de que sea una cadena aleatoria y segura. **No compartas esta clave ni la subas al repositorio**.
- `EMAIL_USER`: Correo electrónico desde el cual se enviarán los mensajes (debe ser una cuenta válida de Gmail).
- `EMAIL_PASS`: Contraseña de aplicación generada desde [Google Apps](https://myaccount.google.com/apppasswords), necesaria para permitir el acceso a Nodemailer.

> ⚠️ **Importante**: Esta contraseña **no es la contraseña del correo**, sino una **clave especial generada para aplicaciones**.  
> Asegúrate de mantener estas credenciales fuera del control de versiones (inclúyelas en `.gitignore`) y usar un gestor de secretos adecuado en producción.

## 🔐 Seguridad

- Las contraseñas se almacenan de forma segura utilizando bcrypt para aplicar hashing antes de guardarlas en la base de datos.
- Se implementan validaciones para evitar registros duplicados basados en correo electrónico, nombre de usuario y número de documento.
- La verificación de correo electrónico es real, enviando un enlace único al email del usuario. Al hacer clic, se confirma la veracidad del correo.
- Se muestran notificaciones claras al usuario mediante SweetAlert2 para mejorar la experiencia durante el proceso de registro y verificación.

## 📌 Endpoints GraphQL

Todo se gestiona mediante un único endpoint `/graphql`, manejado por Apollo Server.

## 🛠️ Mejoras Pendientes

- [ ] Incluir pruebas unitarias.
- [ ] Dockerizar el proyecto.