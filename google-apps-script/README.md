# RSVP en Google Sheets

La invitación es el **viernes 30 de octubre de 2026, desde las 19:30, en Casa 199**.
La web puede seguir en GitHub Pages. Google Apps Script recibe los envíos y escribe
en una planilla privada. Cada confirmación ocupa una fila; elegir o cambiar comida
actualiza esa fila. No hace falta una cuenta de Google para los invitados.

## Activación desde la cuenta de quien organiza

1. Creá una planilla en [Google Sheets](https://sheets.google.com) con acceso
   **restringido** (no la publiques ni actives «cualquiera con el enlace»).
2. Desde esa planilla, abrí **Extensiones → Apps Script**. Reemplazá el contenido
   de `Código.gs` por [Code.gs](Code.gs) de esta carpeta y guardá.
3. Seleccioná la función **setup**, pulsá **Ejecutar** y autorizá el script desde
   tu cuenta. Creará la pestaña **Confirmaciones** y guardará el ID de la planilla
   en las propiedades privadas del script. No modifica otras pestañas ni borra filas.
4. Elegí **Implementar → Nueva implementación → Aplicación web**:
   **Ejecutar como: Yo** y **Quién tiene acceso: Cualquier usuario** (incluidos
   usuarios sin iniciar sesión). Copiá la URL que termina en **`/exec`**.
   Si tu cuenta de Workspace no permite acceso anónimo, usá una cuenta que lo permita.
5. Pegá esa URL en `endpoint` de [rsvp-config.js](../rsvp-config.js). No pegues
   el enlace de la planilla, `/dev`, contraseñas ni tokens. Con un endpoint
   configurado la web pasa automáticamente de demostración a guardado real.
   Publicá `rsvp-config.js` con una nueva versión en ambos HTML para evitar caché.

La URL `/exec` es pública y se puede compartir para conectar la web. La planilla,
la cuenta y sus credenciales siguen siendo privadas. Al actualizar el backend,
usá **Implementar → Administrar implementaciones → Editar → Nueva versión**;
guardar el código en el editor no actualiza la aplicación ya publicada.

## Verificación obligatoria antes de invitar gente

- Abrí la URL `/exec` sin iniciar sesión: debe devolver JSON con `service` igual
  a `halloween199`. Esto verifica disponibilidad, **no prueba una escritura**.
- Desde la invitación, enviá un nombre de prueba y dos personas. Debe aparecer
  una sola fila con ese nombre, cantidad y la fecha nueva. La página de éxito
  aparece únicamente tras recibir la confirmación de guardado.
- Elegí una comida y guardala: debe completarse **Comida elegida** en esa misma
  fila. Cambiala y comprobá que se actualice sin agregar otra confirmación.
- Probá desde un celular y desde una ventana privada sin sesión de Google.
  Verificá que los visitantes no vean etiquetas de demostración.
- Si Google devuelve una página de acceso, falla CORS, o no responde, la web debe
  mostrar error sin afirmar que se guardó. Revisá que se use `/exec`, acceso
  anónimo y la versión correcta. No uses `mode: 'no-cors'`: una respuesta opaca
  no permite saber si se guardó nada.
- Eliminá manualmente la fila de prueba cuando termines.

Hasta completar esta prueba con Google, las pruebas locales con servicios
simulados **no demuestran entrega real**. Sin URL configurada sigue funcionando
la demostración explícita existente; no recibe confirmaciones reales.

## Acceso y límites

Solo el dueño autoriza al script a escribir. No se entregan permisos de Google
al navegador. No hay una API pública para listar o leer asistentes. Un token
aleatorio por confirmación autoriza sus actualizaciones; se guarda en esta
pestaña del navegador y solo su hash SHA-256 queda en la planilla. No se envía
en URLs. No compartas esos tokens ni uses el nombre como contraseña.

Los reintentos usan el mismo ID para evitar duplicados cuando una respuesta se
pierde. Un bloqueo de Apps Script protege las escrituras simultáneas. El servidor
valida campos y cantidades (1–1000 personas), limita el tamaño de las solicitudes,
rechaza el campo trampa de bots y neutraliza fórmulas en texto de usuario.
La planilla admite hasta 10 000 confirmaciones por esta implementación.

El endpoint admite altas anónimas: **no autentica invitados ni elimina el spam**.
El campo trampa y el límite de filas son defensas básicas; si se difunde ampliamente,
conviene agregar un CAPTCHA verificado en el servidor o usar un receptor con
limitación de solicitudes. Apps Script tiene cuotas de uso y ejecuciones; no es
un servicio ilimitado. No agregues datos sensibles a este formulario.

La elección se puede editar desde la misma pestaña. Cerrar la pestaña o borrar
sus datos puede perder el token: no hay recuperación pública por nombre ni
lectura de la planilla. Quien organiza puede corregir la fila directamente.

## Desarrollo

No se requieren paquetes nuevos. Ejecutá `node --test tests/sheets.test.cjs`
desde la raíz para probar validación, reintentos y actualizaciones del backend con
dobles de las APIs de Apps Script. Serví el sitio con `python3 -m http.server`
para probar el navegador. Las credenciales y la planilla real no se usan en tests.
