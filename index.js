import 'ol/ol.css';
import {Map, View} from 'ol';
import VectorTileLayer from 'ol/layer/VectorTile';
import VectorTileSource from 'ol/source/VectorTile';
import OSM from 'ol/source/OSM';
import MVT from 'ol/format/MVT';
import {Stroke,Style} from 'ol/style/Style';
import {fromLonLat} from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';

const key = 'lirfd6Fegsjkvs0lshxe'; // use your own instead

let selectDeptos = document.getElementById("departamento");
let selectMpios = document.getElementById("municipio");
let urlDeptos = 'https://geoportal.dane.gov.co/laboratorio/serviciosjson/mgn/divipola.php';
let urlMpios = 'https://geoportal.dane.gov.co/laboratorio/serviciosjson/mgn/divipola.php?codigo_departamento='

const view = new View({
  center: fromLonLat([-74, 4]),
  zoom: 6
});

const map = new Map({
    target: 'map',
    layers: [
            new TileLayer({
              source: new OSM()
            })
          ],
    view: view
  });

loadDeptos();

selectDeptos.addEventListener("change", (e) => {
  loadMpios(e.target.value);
})



function loadDeptos() {
  fetch(urlDeptos)
      .then(function (response) { 
        // console.log(response.text());
        return response.json(); })
      .then(function (html) {
        // console.log(html.estado);
        if(html.estado){
          let deptos = html.resultado;

          deptos.forEach((value,index) => {
            console.log(value);
            var option = document.createElement("option");
            option.text = value.DPTO_CNMBR;
            option.value = value.DPTO_CCDGO;
            selectDeptos.appendChild(option);
          });
        }
      });
}


function loadMpios(depto){
  selectMpios.options.length = 0;
  fetch(urlMpios + depto)
      .then(function (response) { 
        // console.log(response.text());
        return response.json(); })
      .then(function (html) {
        // console.log(html.estado);
        if(html.estado){
          let mpios = html.resultado;

          mpios.forEach((value,index) => {
            console.log(value);
            var option = document.createElement("option");
            option.text = value.MPIO_CNMBR;
            option.value = value.DPTO_CCDGO;
            selectMpios.appendChild(option);
          });
        }
      });
}
