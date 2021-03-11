# plantilla_open_layers

Prueba open layers DANE

La plantilla se maneja con la libreria para web mapping llamada open layers, contiene un mapa y una barra de herramientas donde se encuentran filtros, capas y una tabla.

![image](https://user-images.githubusercontent.com/19803402/110726080-cb683f00-81e6-11eb-9ace-a4a1b8c010da.png)

# Requerimientos
Se debe contar con Node JS instalada en el PC (https://nodejs.org/en/)

# Pasos para despliegue
1. Clonar repositorio
2. Crear una nueva rama e indicar el nombre al entrevistador
3. Instalar librerias:
```nohighlight
    $ npm install
```
3. Para probar en la consola digitar:
```nohighlight
    $ npm start
```
4. Abrir el visor en la URL: http://localhost:1234

# Prueba
Como parte de la prueba web, se debe hacer lo siguiente:
1. Agregar 3 mapas base y darle funcionamiento en la barra de herramientas, puede acceder a algunos mapas base de OSM en https://wiki.openstreetmap.org/wiki/Tile_servers
2. Agregar la capas de departamentos (postgis:V2018_MGN_DPTO_POLITICO), municipios (postgis:V2018_MGN_MPIO_POLITICO) y centros poblados (postgis:V2018_MGN_CLASE) desde el servicio swe geográfico WMS desde https://geoserverportal.dane.gov.co/geoserver2/postgis/wms
3. Agregar funcionalidad en la sección de capas para prender/apagar capas (departamentos, municipios)
4. Agregar check y texto de centros poblados en la sección de capas
5. Cuando seleccione un departamento de la lista, resalte el departamento sobre el mapa (Borde color cyan)
6. Agregar popups para municipios, departamentos y centros poblados (Código DIVIPOLA y nombre)
7. Generar tabla con lista de centros poblados una vez se seleccione/cambie municipio (La información de centros poblados se puede consumir desde https://geoportal.dane.gov.co/laboratorio/serviciosjson/mgn/divipola.php?codigo_departamento=05&codigo_municipio=001&clase=2), donde se va variando los valores del código de departamento y municipio.

Se debe subir el código (push) a la rama creada previamente e indicar que se terminó.

Tiene dos horas para terminar la prueba.

Exitos!!!!



