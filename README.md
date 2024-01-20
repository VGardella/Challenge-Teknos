<h1>Teknos Backend Challenge</h1>

Se replicaron un conjunto de APIs de manipulación de mensajes para una aplicación de correo. Esta se realizó en Node.Js, utilizando la biblioteca Express.

Requerimientos:

* Se necesita tener instalado Node.js. El instalador esta disponible en https://nodejs.org/en.
* Se necesita tener instalada la biblioteca express para poder correr la aplicación. En caso de no tenerlo instalado se tiene que correr en la terminal el comando:
<code>npm install express</code>
* Para poder testear APIs localmente se necesitará instalar el Desktop Agent de la plataforma Postman, disponible en https://www.postman.com/downloads/postman-agent/.

Funcionamiento:

Se debe clonar el repositorio e instalar los componentes necesarios. Se podrá correr la aplicación al usar en la terminal el comando:
<code>node App.js</code>
Si la aplicación se encuentra corriendo debidamente se recibirá el mensaje 'Escuchando puerto: 3000'. 

Para poder acceder a las funcionalidades de nuestra API tendremos que abrir el Agente de Escritorio de Postman, donde podremos usar las siguientes URLs:

* <b>Acceso a listado de carpetas (Método GET):</b> localhost:3000/:user/api/folders
* <b>Acceso a mensajes (Método GET):</b> localhost:3000/:user/api/messages/:name
* <b>Filtrado de Mensajes (Método GET):</b> localhost:3000/:user/api/messages/:name?from=valor&to=valor&subject=valor
* <b>Creación de mensajes (Método POST):</b> localhost:3000/:user/api/messages/:name
  En este caso, se adjuntará el mensaje a publicar en la pestaña Body, en la cual podremos definir el formato.
* <b>Borrado de mensajes (Método DELETE):</b> localhost:3000/:user/api/messages/:name/:id
  El parámetro 'id' corresponde al código de identificación provisto para cada mensaje.

Para poder utilizar la API se utilizará el usuario 'teknos' (definido como el parámetro ':user' en las URLs). El parámetro 'name' corresponderá al nombre del archivo que contenga los mensajes con los que queramos trabajar (por ejemplo: sent, starred e important).