<template>
  <div id="app" class="container">
    <div>
      <div id="mapid"></div>
    </div>
  </div>
</template>

<style scoped>
#mapid { 
    height: 70vh;
    width:  85vw;
}
</style>

<script>
import * as L from 'leaflet';
import "leaflet/dist/leaflet.css";

function sleep(ms){
    return new Promise(r=>setTimeout(r, ms))
}

function createMap(that){
    var tileLayer = that.tileLayer;
    var mapid = that.mapid;
    var zoom = that.zoom;
    var map = L.map(mapid).setView([23.308434503365063,113.21329057216644], zoom);
    L.tileLayer(tileLayer, {
        maxZoom: 19
    }).addTo(map);
    that.map = map;
}

async function playbacks(that){
    await playback(that);
    that.marker_index=0;
    await playback(that);
}

async function playback(that){
    var marker_index = that.marker_index;
    var markers_list = that.markers_list;
    that.timestamp = markers_list[marker_index]["timestamp"];
    for (var i = marker_index; i < markers_list.length; i++) {
        var timestamp = markers_list[i]["timestamp"];
        var markers = markers_list[i]["markers"];
        var await_time = (timestamp - that.timestamp) * that.interval;
        await track(that, await_time, markers);
        that.timestamp = timestamp;
    }
}

async function track(that, await_time, markers){
    var map = that.map;
    await sleep(await_time);
    for (const key in markers) {
        if (undefined != that.marker_objects[key]){
            console.log("Remove the old marker.")
            that.marker_objects[key].remove();
        }
        var coordinate = markers[key]["coordinate"];
        var description = markers[key]["description"];
        var marker = L.marker(coordinate).addTo(map);
        marker.bindPopup(description);
        if (that.marker_selected == key){
            marker.openPopup();
            map.setView(coordinate, that.zoom);
        }
        marker.setIcon(L.icon({iconUrl: 'marker-icon-2x.png',iconSize: [38, 95], shadowUrl: 'marker-icon-2x.png', shadowSize: [38, 95]}));
        that.marker_objects[key] = marker;
    }
}

export default {
  mounted() {
    createMap(this);
    playbacks(this);
  },
  data() {
    return {
        tileLayer: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
        mapid: "mapid",
        zoom: 18,
        interval: 500,
        map: undefined,
        timestamp: 0,
        marker_selected: "a",
        marker_index: 0,
        markers_list: [
                {"timestamp": 1722305573, "markers": {"a": {"coordinate": [23.308434503365063,113.21319057216644], "description": "a1"}, "b": {"coordinate": [23.308444503365063,113.21329057216644], "description": "b1"}}},
                {"timestamp": 1722305578, "markers": {"c": {"coordinate": [23.308854503365063,113.21339057216644], "description": "c1"}}},
                {"timestamp": 1722305583, "markers": {"a": {"coordinate": [23.308264503365063,113.21319057216644], "description": "a2"}}},
                {"timestamp": 1722305588, "markers": {"a": {"coordinate": [23.308284503365063,113.21319057216644], "description": "a3"}, "c": {"coordinate": [23.308044503365063,113.21339057216644], "description": "c2"}}}
            ],
        marker_objects: {}
    }
  }
};
</script>
