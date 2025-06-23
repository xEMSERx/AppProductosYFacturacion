# AppProductosYFacturacion

Aplicación web desarrollada en Angular y Node.js para la gestión de productos y facturación, con autenticación de usuarios y conversión automática de precios entre ARS y USD utilizando la API oficial del Banco Central de la República Argentina (BCRA).

---

## 1. Alcance y Objetivos

**Objetivo:**  
Desarrollar una aplicación web que permita a los usuarios registrarse, gestionar productos (ABM), y generar facturas dinámicas con conversión automática de precios entre ARS y USD, integrando la API del BCRA.

**Alcance:**  
- Autenticación de usuarios (registro y login)
- ABM de productos (nombre, descripción, precio ARS, categoría, imagen)
- Facturación dinámica y persistencia de facturas
- Conversión de precios ARS/USD en tiempo real
- Interfaz moderna y navegación por rutas

---

## 2. Interesados (Stakeholders)

- **Usuarios finales:** Personas que gestionan productos y generan facturas.
- **Desarrolladores:** Encargados del desarrollo y mantenimiento del sistema.
- **Administradores:** Encargados de la base de datos y la infraestructura.

---

## 3. Requisitos

### Funcionales
- Registro e inicio de sesión de usuarios con validaciones.
- Alta, baja y modificación de productos.
- Búsqueda y filtrado de productos por nombre o categoría.
- Generación de facturas con detalle de productos y totales en ARS y USD.
- Obtención automática del tipo de cambio desde la API del BCRA.

### No funcionales
- Persistencia de datos en MySQL.
- Seguridad básica en autenticación.
- Interfaz responsiva y amigable.
- Modularidad y escalabilidad del código.

---

## 4. Arquitectura del Sistema

- **Frontend:** Angular (componentes, servicios, pipes, rutas, Bootstrap)
- **Backend:** Node.js + Express (API REST)
- **Base de datos:** MySQL
- **Integración externa:** API BCRA para tipo de cambio

---

## 5. Documentación Técnica

- **Frontend:**  
  - Formularios reactivos con FormBuilder.
  - Pipes personalizados para filtrado.
  - Servicios para comunicación con backend y API BCRA.
  - Uso de @Input y @Output para comunicación entre componentes.

- **Backend:**  
  - Rutas RESTful para usuarios, productos y facturas.
  - Validación y manejo de errores.
  - Consultas SQL para persistencia.

---

## 6. Manual de Usuario

1. **Registro:**  
   Completa el formulario de registro y accede con tus credenciales.
2. **Gestión de productos:**  
   Agrega, edita o elimina productos desde la sección correspondiente.
3. **Facturación:**  
   Selecciona productos, confirma la compra y visualiza la factura con totales en ARS y USD.
4. **Tipo de cambio:**  
   El sistema actualiza automáticamente el valor USD al generar la factura.

---

## 7. Gestión de configuración

- Variables de entorno para la conexión a MySQL.
- Scripts SQL para inicializar la base de datos.
- Versionado del código en GitHub.

---

## 8. Mantenimiento y Actualización

- El código está modularizado para facilitar futuras mejoras.
- La documentación y los comentarios en el código ayudan a la comprensión y mantenimiento.

---

## 9. Herramientas utilizadas

- Angular CLI, Bootstrap, Node.js, Express, MySQL, API BCRA, GitHub.

---

## 10. Autores

- Roseti Abaca Emanuel Sebastián; Pizarro Enzo Nehuén

---