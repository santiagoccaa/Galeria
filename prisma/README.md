Explicación del Diseño y Claves Técnicas

Desacoplamiento Feed vs. Usuario (Feed & Subscription): Múltiples usuarios pueden seguir el mismo feed RSS ([https://news.ycombinator.com/rss](https://news.ycombinator.com/rss)). Guardar los feeds y los artículos de forma global evita duplicar peticiones de red e historias en la base de datos.

Manejo de Caché eficiente (etag y lastModified): Claves para la API de sincronización. Al consultar un feed, envías estos valores en las cabeceras HTTP. Si no hay cambios, el servidor del feed responde 304 Not Modified, ahorrando ancho de banda y procesamiento.

Gestión de Artículos Leídos (UserArticleState): Crear una fila solo cuando el usuario interactúa (lee) un artículo es más eficiente que poblar relaciones para miles de artículos no leídos. Si no existe un registro en UserArticleState para un usuario y artículo, se asume no leído.

Guardar para después (SavedArticle): Modelo dedicado que te permite ordenar temporalmente los marcadores del usuario y consultar de forma instantánea su lista de lectura posterior.

Experiencia de Invitado (Guest Experience): Para soportar la funcionalidad sin autenticación, puedes precargar feeds públicos en la base de datos (Feed + Article) con un ID de usuario "Demo" fija o gestionar la sesión de invitado usando localStorage para guardar las preferencias del invitado mientras consulta los artículos desde la DB pública.