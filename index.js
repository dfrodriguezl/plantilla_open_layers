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
