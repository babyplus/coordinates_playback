<template>
    <div id="map" class="container">
        <div>
            <div id="mapid"></div>
        </div>
    </div>
</template>

<style scoped>
#mapid { 
    height: 80vh;
    width:  85vw;
}
</style>

<script>
import { watch } from 'vue';
import * as L from 'leaflet';
import "leaflet/dist/leaflet.css";
import store from "@/store.js";
import { INIT } from "@/values.js"

function sleep(ms){
    return new Promise(r=>setTimeout(r, ms))
}

function createMap(that){
    var tileLayer = that.tileLayer;
    var mapid = that.mapid;
    var zoom = INIT.init_zoom;
    var coordinate = INIT.init_coordinate;
    var map = L.map(mapid, {zoomAnimation:false}).setView(coordinate, zoom);
    L.tileLayer(tileLayer, {
        maxZoom: 19
    }).addTo(map);
    that.map = map;
}

async function playback(that){
    if ( true == store.state.playing ) return;
    store.state.stop = false;
    store.state.pause = false;
    store.state.playing = true;
    var markers_index = store.state.markers_index;
    var markers_list = that.markers_list;
    if  ( markers_list.length > 0 ) {
        that.timestamp = markers_list[markers_index]["timestamp"];
        var ms = markers_list[markers_index]["markers"];
        for (var m in ms) {
            that.map.setView(ms[m]["coordinate"], store.state.zoom);
            break;
        }
    }

    var skip = 0;
    for (var i = markers_index; i < markers_list.length; i++) {
        store.state.current_markers_index = i;
        if ( true == store.state.pause ) store.state.markers_index = i;
        if ( true == store.state.stop ) store.state.markers_index = 0;
        if ( true == store.state.pause || true == store.state.stop ) {
            store.state.playing = false;
            return;
        }
        var timestamp = markers_list[i]["timestamp"];
        var markers = markers_list[i]["markers"];
        var await_time = (timestamp - that.timestamp) * store.state.interval;
        // Some data should be skipped if the wait time is less than 1 second.
        skip += await_time;
        if (skip < 1000) {
            var current_keys = Object.keys(markers);
            for (var current_key in current_keys){
                if (!(current_key in that.marker_objects)) {
                    continue;
                }
            }
        }
        skip = 0;
        await track(that, await_time, markers);
        that.timestamp = timestamp;
        store.state.current_timestamp = timestamp;
    }
    store.state.playing = false;
}

async function track(that, await_time, markers){
    var map = that.map;
    await sleep(await_time);
    for (const key in markers) {
        if ( true == store.state.pause || true == store.state.stop) break;
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
        } else map.setView(map.getCenter(), store.state.zoom);
        marker.setIcon(L.icon({iconUrl: 'marker-icon-2x.png',iconSize: [38, 95], shadowUrl: 'marker-icon-2x.png', shadowSize: [38, 95]}));
        that.marker_objects[key] = marker;
    }
}

export default {
    mounted() {
        var that = this;
        createMap(this);
        watch(() => store.state.play, () => {
            playback(that);
        });
        watch(() => store.state.zoom, (z) => {
            if(false==store.state.playing) that.map.setView(that.map.getCenter(),z);
        });
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
                try{
                    var json = JSON.parse(store.state.markers_list_str);
                    return json;
                } catch { 
                    alert("Parsing failed, please check the format of the json string.");
                    return [];
                }
            }
        }
    }
};
</script>
