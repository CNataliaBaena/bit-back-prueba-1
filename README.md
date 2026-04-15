# 🚀 Proyecto Frontend - Login Angular

## 📌 Descripción

Este proyecto es una aplicación frontend desarrollada en **Angular (Standalone Components)** que implementa un sistema de autenticación básico.

Permite a los usuarios:

* Ingresar con email y contraseña
* Enviar credenciales a un backend mediante HTTP
* Recibir un token de autenticación
* Guardar sesión en el navegador
* Redirigir a una vista protegida

---

## 🛠️ Tecnologías utilizadas

* Angular (Standalone Components)
* TypeScript
* HTML / CSS
* HttpClient (para consumo de API)
* Router de Angular

---

## ⚙️ Funcionalidades principales

### 🔐 Login de usuario

* Formulario con:

  * Email
  * Contraseña
* Validación básica con `required`
* Enlace con `ngModel`

---

### 🌐 Consumo de API

* Petición `POST` al backend:

```bash
http://localhost:4000/home
```

* Envío de:

```json
{
  "email": "usuario",
  "password": "contraseña"
}
```

---

### 💾 Manejo de sesión

* Guarda datos en `localStorage`:

  * Token de autenticación
  * Información del usuario

```ts
localStorage.setItem('token', res.token);
localStorage.setItem('user', JSON.stringify(res.user));
```

---

### 🔄 Redirección

* Después del login exitoso:

```ts
this.router.navigateByUrl('/usuarios', { replaceUrl: true });
```

---

### ❌ Manejo de errores

* Captura errores del backend
* Muestra mensaje:

```
Credenciales incorrectas
```

---

## 📁 Estructura básica del proyecto

```
src/
│── app/
│   ├── home/
│   │   ├── home.ts
│   │   ├── home.html
│   │   ├── home.css
│
│── main.ts
```

---

## ▶️ Ejecución del proyecto

1. Instalar dependencias:

```bash
npm install
```

2. Ejecutar el servidor:

```bash
ng serve
```

3. Abrir en navegador:

```
http://localhost:4200
```

---

## ⚠️ Requisitos importantes

* Tener el backend corriendo en:

```
http://localhost:4000
```

* Endpoint disponible:

```
POST /home
```

---

## 🧠 Notas técnicas

* Se utiliza `ngSubmit` para manejar el formulario
* `FormsModule` es necesario para `ngModel`
* `HttpClient` se provee en `main.ts`:

```ts
provideHttpClient()
```

---

## 🔒 Mejoras futuras

* Implementar Auth Guards (rutas protegidas)
* Manejo de expiración de token
* Validaciones avanzadas de formulario
* Registro de usuarios
* Logout

---

## 👨‍💻 Autor Natalia Baena Cabas

Proyecto desarrollado como práctica de frontend con Angular.
