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
    // Ensure that only a single execution flow exists.
    if ( true == store.state.playing ) return;

    // Reset certain parameters.
    store.state.stop = false;
    store.state.pause = false;
    store.state.playing = true;
    for (var ob in store.state.marker_objects)
        store.state.marker_objects[ob]["object"].remove();
    store.state.marker_objects = {};

    // Specify the position to start playing.
    var markers_index = store.state.markers_index;

    var markers_list = that.markers_list;

    // Record the timestamp and establish the initial coordinate of the map center.
    if  ( markers_list.length > 0 ) {
        that.timestamp = markers_list[markers_index]["timestamp"];
        var ms = markers_list[markers_index]["markers"];
        for (var m in ms) {
            that.map.setView(ms[m]["coordinate"], store.state.zoom);
            break;
        }
    }

    // Iterate through the dataset and track each moment.
    for (var i = markers_index; i < markers_list.length; i++) {

        // Record the current index for monitor or other usage.(TODO: Change to list structure)
        store.state.current_markers_index = i;

        // Record the index of the current timestamp when paused and the next playback starts from this index.
        if ( true == store.state.pause ) store.state.markers_index = i;

        // Revert the index to zero when stopped and the next playback will commence from the beginning.
        if ( true == store.state.stop ) store.state.markers_index = 0;
        if ( true == store.state.pause || true == store.state.stop ) {
            store.state.playing = false;
            return;
        }
        var timestamp = markers_list[i]["timestamp"];
        var markers = markers_list[i]["markers"];
        var await_time = (timestamp - that.timestamp) * store.state.interval;
        that.timestamp = timestamp;

        // Record the current timestamp for monitor or other usage.(TODO: Change to list structure)
        store.state.current_timestamp = timestamp;

        // Tracking all markers of this moment.
        await track(that, await_time, markers);

    }
    store.state.playing = false;
}

async function track(that, await_time, markers){
    var map = that.map;

    // Adjust the playback speed.
    await sleep(await_time);

    for (const key in markers) {

        // Break the method when the status is paused or stopped.
        if ( true == store.state.pause || true == store.state.stop) break;

        // Remove the old marker if it exists.
        if (undefined == store.state.marker_objects[key])
            store.state.marker_objects[key] = {};
        if (undefined != store.state.marker_objects[key]["object"])
            store.state.marker_objects[key]["object"].remove();

        // Record the current key.
        store.state.current_key = key;

        // Add the marker.
        var coordinate = markers[key]["coordinate"];
        var description = markers[key]["description"];
        if (undefined == coordinate) {
            alert("Warnning: Undefined coordinate (" + that.timestamp + ": " + key + "), check JSON string data.");
            continue;
        }
        var marker = undefined; 
        marker = L.marker(coordinate).addTo(map);
        marker.bindPopup(description);
        store.state.marker_objects[key]["object"] = marker;
        
        // Parses the custom hooks and executes the specified actions if required.
        var data = markers[key]["data"];
        parses_and_exec_actions(that, data);

        // Track and reset the view size if the selected keyword is valid.
        if (store.state.selected == key){
            marker.openPopup();
            map.setView(coordinate, store.state.zoom);
        } else map.setView(map.getCenter(), store.state.zoom);

        marker.setIcon(L.icon({iconUrl: 'marker-icon-2x.png',iconSize: [38, 95], shadowUrl: 'marker-icon-2x.png', shadowSize: [38, 95]}));
    }
}

function match_or_not(that, data, matching_unit, condition){
    switch(matching_unit){
        case "EQ":
            return (data[condition[0]] == condition[1]);
        case "NE":
            return (data[condition[0]] != condition[1]);
        case "LT":
            return (data[condition[0]] < condition[1]);
        case "LE":
            return (data[condition[0]] <= condition[1]);
        case "GT":
            return (data[condition[0]] > condition[1]);
        case "GE":
            return (data[condition[0]] >= condition[1]);
        case "CHANGED":
            var keyword = condition[0];
            if (undefined == store.state.marker_objects[store.state.current_key]["values"])
                store.state.marker_objects[store.state.current_key]["values"] = {};
            if (undefined == store.state.marker_objects[store.state.current_key]["values"][keyword])
                store.state.marker_objects[store.state.current_key]["values"][keyword] = data[keyword];
            if (store.state.marker_objects[store.state.current_key]["values"][keyword] != data[keyword]){
                store.state.marker_objects[store.state.current_key]["values"][keyword] = data[keyword];
                return true;
            }
            break;
        default:
            alert("Warnning: undefined matching_unit(" + matching_unit + ")");
    }
    return false;
}

function exec_actions(that, actions, data){
    for (var i in actions) {
        switch(actions[i]){
            // Employ strict matching criteria for keyword processing initially.
            case "selected":
                store.state.selected = store.state.current_key;
                break;
            case "no_selected":
                store.state.selected = "";
                break;
            case "record":
                var record = that.current_date + " " + store.state.current_key + ":" + JSON.stringify(data) + "\n";
                store.state.action_records += record;
                break;
            case "alert":
                alert(JSON.stringify(data));
                break;

            // Employs regular expressions for keyword matching.
            default:

                // Available regular expressions.
                var available_regexes = {
                    "interval": /^interval_/, 
                    "speed": /^speed_/,
                    "zoom": /^zoom_/
                };

                // Iterate through all available regular expressions and process the associated values.
                var matched = false;
                for (var key in available_regexes) {
                    if (available_regexes[key].test(actions[i])) {
                        matched = true;
                        var val = actions[i].replace(key+"_", "");
                        switch(key){
                            case "zoom":
                                if (1 <= val && val <= 19) 
                                    store.state.zoom = val;
                                else 
                                    matched = false;
                                break;
                            case "interval":
                                if (1 <= val && val <= 1000) 
                                    store.state.interval = val;
                                else 
                                    matched = false;
                                break;
                            case "speed":
                                if (1 <= val && val <= 1000) 
                                    store.state.interval = 1000/val;
                                else 
                                    matched = false;
                                break;
                            default:
                        }
                    }
                }
                if (false == matched)
                    alert("Warnning: undefined action(" + actions[i] + ")");
        }
    }
}

function parses_and_exec_actions(that, data){
    if (undefined == data) return;
    for (var i in that.custom_hooks){
        var conditions = that.custom_hooks[i]["conditions"];
        var actions = that.custom_hooks[i]["actions"];

        // The variable "matched" is assigned the value true only when all conditions are satisfied; otherwise, it is assigned the value false.
        var matched = true;
        for (var n in conditions){
            for (var matching_unit in conditions[n]){
                var condition = conditions[n][matching_unit];
                var keyword = condition[0];
                if ( ! ( keyword in data ) ) {
                    matched = false;
                    break;
                }
                matched = match_or_not(that, data, matching_unit, condition);
                if ( false == matched )
                    break;
            }
            if ( false == matched )
            break;
        }

        // Execute the actions if the variable "matched" is assigned the value true.
        if ( true == matched )
            exec_actions(that, actions, data);
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
            timestamp: 0
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
        },
        custom_hooks: {
            get() {
                try{
                    var json = JSON.parse(store.state.custom_hooks_str);
                    return json;
                } catch { 
                    alert("Parsing failed, please check the format of the json string.");
                    return [];
                }
            }
        },
        current_date: {
            get() {
                const date = new Date(store.state.current_timestamp * 1000);
                const formattedDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
                return formattedDate;
            }
        },
    }
};
</script>
