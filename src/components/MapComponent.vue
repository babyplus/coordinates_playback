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
import store from "@/store.js";

function sleep(ms){
    return new Promise(r=>setTimeout(r, ms))
}

function createMap(that){
    var tileLayer = that.tileLayer;
    var mapid = that.mapid;
    var zoom = store.state.zoom;
    var map = L.map(mapid).setView([23.308434503365063,113.21329057216644], zoom);
    L.tileLayer(tileLayer, {
        maxZoom: 19
    }).addTo(map);
    that.map = map;
}

async function playbacks(that){
    await playback(that);
    store.state.markers_index = 0;
    await playback(that);
}

async function playback(that){
    var markers_index = store.state.markers_index;
    var markers_list = that.markers_list;
    that.timestamp = markers_list[markers_index]["timestamp"];
    for (var i = markers_index; i < markers_list.length; i++) {
        var timestamp = markers_list[i]["timestamp"];
        var markers = markers_list[i]["markers"];
        var await_time = (timestamp - that.timestamp) * store.state.interval;
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
        if (store.state.selected == key){
            marker.openPopup();
            map.setView(coordinate, store.state.zoom);
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
            map: undefined,
            timestamp: 0,
            marker_objects: {}
        }
    },
    computed: {
        markers_list: {
            get() {
                return JSON.parse(store.state.markers_list_str);
            }
        }
    }
};
</script>
