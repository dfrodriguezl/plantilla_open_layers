import 'ol/ol.css';
import { Map, View } from 'ol';
import VectorTileLayer from 'ol/layer/VectorTile';
import VectorTileSource from 'ol/source/VectorTile';
import OSM from 'ol/source/OSM';
import MVT from 'ol/format/MVT';
import { Stroke, Style } from 'ol/style/Style';
import { fromLonLat } from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';
import Overlay from 'ol/Overlay';

const key = 'lirfd6Fegsjkvs0lshxe'; // use your own instead

let selectDeptos = document.getElementById("departamento");
let selectMpios = document.getElementById("municipio");
let urlDeptos = 'https://geoportal.dane.gov.co/laboratorio/serviciosjson/mgn/divipola.php';
let urlMpios = 'https://geoportal.dane.gov.co/laboratorio/serviciosjson/mgn/divipola.php?codigo_departamento='

const view = new View({
    center: fromLonLat([-74, 4]),
    zoom: 6
});

let depWMS = new TileWMS({
    url: 'https://geoserverportal.dane.gov.co/geoserver2/postgis/wfs',
    //params: { 'LAYERS': 'postgis:V2018_MGN_DPTO_POLITICO', 'TILED': true, "cql_filter": "dpto_ccdgo = 11", extractAttributes: 'true' },
    params: { 'LAYERS': 'postgis:V2018_MGN_DPTO_POLITICO', 'TILED': true },
    serverType: 'geoserver',
    // Countries have transparency, so do not fade tiles:
    //transition: 0,
})

var capas = [
    new TileLayer({
        source: new OSM(),
    }),
    new TileLayer({
        /*
          extent: [-13884991, 2870341, -7455066, 6338219],
          */
        source: depWMS,
    }),
    new TileLayer({
        /*
          extent: [-13884991, 2870341, -7455066, 6338219],
          */
        source: new TileWMS({
            url: 'https://geoserverportal.dane.gov.co/geoserver2/postgis/wms',
            params: { 'LAYERS': 'postgis:V2018_MGN_MPIO_POLITICO', 'TILED': true },
            serverType: 'geoserver',
            // Countries have transparency, so do not fade tiles:
            //transition: 0,
        }),
    }),
    new TileLayer({
        /*
          extent: [-13884991, 2870341, -7455066, 6338219],
          */
        source: new TileWMS({
            url: 'https://geoserverportal.dane.gov.co/geoserver2/postgis/wms',
            params: { 'LAYERS': 'postgis:V2018_MGN_URB_AREA_CENSAL', 'TILED': true },
            serverType: 'geoserver',
            // Countries have transparency, so do not fade tiles:
            //transition: 0,
        }),
    }),
];

var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');

var overlay = new Overlay({
    element: container,
    autoPan: true,
    autoPanAnimation: {
        duration: 250,
    },
});

closer.onclick = function() {
    overlay.setPosition(undefined);
    closer.blur();
    return false;
};

const map = new Map({
    layers: capas,
    overlays: [overlay],
    target: 'map',
    view: view
});

map.on('singleclick', function(evt) {
    var coordinate = evt.coordinate;
    content.innerHTML = '<p>Identificaciòn Capa</p>';
    overlay.setPosition(coordinate);
});

loadDeptos();
map.removeLayer(capas[1]);
map.removeLayer(capas[2]);
map.removeLayer(capas[3]);

document.getElementById("check5").addEventListener("change", apagarCapaMun);

document.getElementById("check6").addEventListener("change", apagarCapaDep);

function apagarCapaMun() {
    if (this.checked) {
        map.addLayer(capas[2])
    } else {
        map.removeLayer(capas[2]);
    }
}

function apagarCapaDep() {
    if (this.checked) {
        map.addLayer(capas[1])
    } else {
        map.removeLayer(capas[1]);
    }
}


selectDeptos.addEventListener("change", (e) => {
    loadMpios(e.target.value);
    console.log(`"dpto_ccdgo = ${e.target.value}"`);
    depWMS.params = { "cql_filter": `"dpto_ccdgo = ${e.target.value}"` };
    depWMS.params.cql_filter = `"dpto_ccdgo = ${e.target.value}"`;
})




function loadDeptos() {
    fetch(urlDeptos)
        .then(function(response) {
            // console.log(response.text());
            return response.json();
        })
        .then(function(html) {
            // console.log(html.estado);
            if (html.estado) {
                let deptos = html.resultado;

                deptos.forEach((value, index) => {
                    console.log(value);
                    var option = document.createElement("option");
                    option.text = value.DPTO_CNMBR;
                    option.value = value.DPTO_CCDGO;
                    selectDeptos.appendChild(option);
                });
            }
        });
}


function loadMpios(depto) {
    selectMpios.options.length = 0;
    fetch(urlMpios + depto)
        .then(function(response) {
            // console.log(response.text());
            return response.json();
        })
        .then(function(html) {
            // console.log(html.estado);
            if (html.estado) {
                let mpios = html.resultado;

                mpios.forEach((value, index) => {
                    console.log(value);
                    var option = document.createElement("option");
                    option.text = value.MPIO_CNMBR;
                    option.value = value.DPTO_CCDGO;
                    selectMpios.appendChild(option);
                });
            }
        });
}