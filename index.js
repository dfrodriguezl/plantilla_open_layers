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

// Add WMS departamentos

let wms_source = new TileWMS({
  url: 'https://geoserverportal.dane.gov.co/geoserver2/postgis/wms',
  params: {'LAYERS': 'postgis:V2018_MGN_DPTO_POLITICO','CRS':'EPSG:4326'},
  serverType: 'geoserver',
  // Countries have transparency, so do not fade tiles:
  crossOrigin: 'anonymous'
});

let deptosLyr = new TileLayer({
    source: wms_source,
});

map.addLayer(deptosLyr);

// activar casilla departamento

let elemento = document.getElementById("check6");
elemento.checked = true;

elemento.addEventListener('click',function(e){
  let check = e.target.checked;
  if(check){
    map.addLayer(deptosLyr);
  }else{
    map.removeLayer(deptosLyr);
  }
});

// activar getInfo en info div

map.on('singleclick', function (evt) {
  document.getElementById('info').innerHTML = '';
  var viewResolution = /** @type {number} */ (view.getResolution());
  var url = wms_source.getFeatureInfoUrl(
    evt.coordinate,
    viewResolution,
    'EPSG:3857',
    {'INFO_FORMAT': 'text/html'}
  );
  if (url) {
    fetch(url)
      .then(function (response) { return response.text(); })
      .then(function (html) {
        document.getElementById('info').innerHTML = html;
      });
  }
});

map.on('pointermove', function (evt) {
  if (evt.dragging) {
    return;
  }
  var pixel = map.getEventPixel(evt.originalEvent);
  var hit = map.forEachLayerAtPixel(pixel, function () {
    return true;
  });
  map.getTargetElement().style.cursor = hit ? 'pointer' : '';
});
