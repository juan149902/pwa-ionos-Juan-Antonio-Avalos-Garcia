# 📱 PWA – Tarea Universidad

## 📄 Descripción

Este proyecto consiste en el desarrollo de una **Aplicación Web Progresiva (PWA)** como parte de una actividad académica.

La aplicación es **instalable** y puede funcionar en **modo offline**, implementando los componentes esenciales de una PWA:

* Web App Manifest (`manifest.json`)
* Service Worker (`sw.js`)
* Cache Storage (App Shell)

---

## 🛠️ Tecnologías utilizadas

* HTML5
* CSS3
* JavaScript
* Web App Manifest
* Service Worker API

---

## 📁 Estructura del proyecto

```
PWA-TAREA/
│
├── index.html
├── styles.css
├── app.js
├── sw.js
├── manifest.json
│
└── Icons/
    ├── icon-192.png
    └── icon-512.png
```

La carpeta **Icons** contiene los íconos requeridos para que la aplicación pueda instalarse correctamente en el dispositivo.

---

## 1️⃣ Web App Manifest (`manifest.json`)

El archivo **manifest.json** permite que la aplicación web sea **instalable** y que el sistema operativo la reconozca como si fuera una aplicación nativa.

### Propiedades principales:

* **name** → Nombre completo de la aplicación.
* **short_name** → Nombre corto que aparece debajo del ícono.
* **start_url** → Página inicial al abrir la app.
* **display: standalone** → Permite que se ejecute sin la interfaz del navegador.
* **background_color / theme_color** → Colores del entorno visual.
* **icons** → Íconos en tamaños **192x192** y **512x512** necesarios para instalación y splash screen.

---

## 2️⃣ Service Worker (`sw.js`)

El **Service Worker** es un script que se ejecuta en segundo plano y funciona como intermediario entre la aplicación, el navegador y la red.

### Funciones principales:

* Almacenar archivos esenciales en caché (**App Shell**).
* Interceptar peticiones de red.
* Permitir funcionamiento sin conexión.

### Eventos implementados:

#### 🔹 install

Cachea los recursos principales del proyecto.

#### 🔹 activate

Elimina versiones antiguas del caché para evitar conflictos.

#### 🔹 fetch

Intercepta solicitudes de red y responde desde caché cuando es posible, habilitando el modo offline.

---

## ▶️ Cómo ejecutar el proyecto localmente

⚠️ **No funciona abriendo el archivo con doble clic (file://)**
Debe ejecutarse en un servidor local.

---

### 🔹 Opción 1: Python

En la carpeta del proyecto ejecutar:

```bash
python -m http.server 8000
```

Abrir en el navegador:

```
http://localhost:8000
```

---

### 🔹 Opción 2: VS Code – Live Server

1. Instalar la extensión **Live Server**.
2. Click derecho sobre `index.html`.
3. Seleccionar **Open with Live Server**.

---

## 📲 Cómo verificar que es instalable

En **Chrome o Edge**:

1. Abrir la aplicación en `localhost` o HTTPS.
2. Clic en el menú ⋮ del navegador.
3. Seleccionar **Install**.

También puede verificarse en:

```
DevTools → Application → Manifest
```

---

## 🌐 Cómo probar el modo Offline

1. Abrir **DevTools**.
2. Ir a la pestaña **Network**.
3. Activar la opción **Offline**.
4. Recargar la página.

La aplicación seguirá funcionando gracias al caché del Service Worker.

---

## ✅ Conclusión

Este proyecto demuestra la implementación de los componentes esenciales de una **Aplicación Web Progresiva**, permitiendo:

* Instalación en el dispositivo.
* Funcionamiento sin conexión.
* Gestión de caché mediante Service Workers.

Cumpliendo así con los requisitos técnicos solicitados en la actividad académica.
