# 💻 Singularity Health - Frontend

Este repositorio contiene la implementación del frontend para la prueba técnica de Singularity Health. Está desarrollado en **React** con **Vite**, y utiliza **Material UI** y **Apollo Client** para interactuar con el backend GraphQL.

## 🚀 Tecnologías Utilizadas

- **React**: Librería para construir interfaces de usuario.
- **Vite**: Herramienta de desarrollo rápida para proyectos modernos.
- **Material UI**: Librería de componentes de diseño.
- **Apollo Client**: Cliente GraphQL para gestionar datos.
- **SweetAlert2**: Para mostrar notificaciones de éxito o error en procesos de creación o verificación.
- **React Router DOM**: Para navegación entre vistas.

## 📦 Instalación

```bash
npm install
```

## ▶️ Ejecución en Desarrollo

```bash
npm run dev
```

## 📁 Estructura del Formulario de Registro

El formulario de registro se divide en tres componentes reutilizables:

- `PersonalDataForm`: Datos personales del usuario.
- `DocumentForm`: Información del documento de identidad.
- `ContactForm`: Correo, teléfono y contraseña.

Todos ellos se gestionan desde `CreateUser.js`, que se encarga de coordinar la lógica y enviar la mutación a GraphQL.

## 📧 Verificación de Correo

- Al completar el registro, el backend envía un correo con un enlace de verificación.
- Al hacer clic, el frontend redirige al usuario a `/verificationEmail`, donde se muestra una alerta de confirmación con **SweetAlert2**.

## 🛠️ Mejoras Pendientes

- [ ] Indicadores de carga y errores para mejorar UX.
- [ ] Mostrar resumen antes de enviar.
- [ ] Incluir feedback visual por pasos del formulario.