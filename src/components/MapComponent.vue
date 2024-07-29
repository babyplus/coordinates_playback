<template>
  <div id="app" class="container">
    <div class="col-md-9">
      <div id="mapid"></div>
    </div>
  </div>
</template>

<style scoped>
#mapid { 
    height: 80vh;
    width:  80vw
}
</style>

<script>
import * as L from 'leaflet';
import "leaflet/dist/leaflet.css";

function sleep(ms){
    return new Promise(r=>setTimeout(r, ms))
}

async function playback(that){
    var tileLayer = that.tileLayer;
    var mapid = that.mapid;
    var markerIndex = that.markerIndex;
    var markers = that.markers;
    var zoom = that.zoom;
    var map = L.map(mapid).setView(markers[0].info.coordinate, zoom);
    L.tileLayer(tileLayer, {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    for (var i = markerIndex; i < markers.length; i++) {
        var coordinate = markers[i].info.coordinate;
        var description = markers[i].info.description;
        await track(coordinate, map, description);
    }
}

async function track(c, m, desc){
    var marker = L.marker(c).addTo(m);
    marker.bindPopup(desc).openPopup();
    m.setView(c, 19);
    marker.setIcon(L.icon({iconUrl: 'marker-icon-2x.png',iconSize: [38, 95]}));
    await sleep(2000);
    marker.remove();
}


export default {
  mounted() {
    playback(this);
  },
  data() {
    return {
        tileLayer: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
        mapid: "mapid",
        zoom: 19,
        markerIndex: 0,
        markers: [
            {info: {coordinate: [23.308434503365063,113.21329057216644],description: "<b>Hello world 1!</b><br>I am a popup."}},
            {info: {coordinate: [23.308534503365063,113.21329057216644],description: "<b>Hello world 2!</b><br>I am a popup."}},
            {info: {coordinate: [23.308634503365063,113.21329057216644],description: "<b>Hello world 3!</b><br>I am a popup."}},
            {info: {coordinate: [23.308734503365063,113.21329057216644],description: "<b>Hello world 4!</b><br>I am a popup."}},
            {info: {coordinate: [23.308834503365063,113.21329057216644],description: "<b>Hello world 5!</b><br>I am a popup."}},
            {info: {coordinate: [23.308934503365063,113.21329057216644],description: "<b>Hello world 6!</b><br>I am a popup."}},
            {info: {coordinate: [23.309034503365063,113.21329057216644],description: "<b>Hello world 7!</b><br>I am a popup."}},
            {info: {coordinate: [23.309134503365063,113.21329057216644],description: "<b>Hello world 8!</b><br>I am a popup."}},
            {info: {coordinate: [23.309234503365063,113.21329057216644],description: "<b>Hello world 9!</b><br>I am a popup."}},
            {info: {coordinate: [23.309334503365063,113.21329057216644],description: "<b>Hello world 10!</b><br>I am a popup."}},
            {info: {coordinate: [23.309434503365063,113.21329057216644],description: "<b>Hello world 11!</b><br>I am a popup."}},
            {info: {coordinate: [23.309534503365063,113.21329057216644],description: "<b>Hello world 12!</b><br>I am a popup."}},
            {info: {coordinate: [23.309634503365063,113.21329057216644],description: "<b>Hello world 13!</b><br>I am a popup."}},
            {info: {coordinate: [23.309734503365063,113.21329057216644],description: "<b>Hello world 14!</b><br>I am a popup."}},
            {info: {coordinate: [23.309834503365063,113.21329057216644],description: "<b>Hello world 15!</b><br>I am a popup."}},
            {info: {coordinate: [23.309934503365063,113.21329057216644],description: "<b>Hello world 16!</b><br>I am a popup."}},
            {info: {coordinate: [23.310034503365063,113.21329057216644],description: "<b>Hello world 17!</b><br>I am a popup."}},
            {info: {coordinate: [23.310134503365063,113.21329057216644],description: "<b>Hello world 18!</b><br>I am a popup."}},
            {info: {coordinate: [23.310234503365063,113.21329057216644],description: "<b>Hello world 19!</b><br>I am a popup."}},
            {info: {coordinate: [23.310334503365063,113.21329057216644],description: "<b>Hello world 20!</b><br>I am a popup."}},
            {info: {coordinate: [23.310434503365063,113.21329057216644],description: "<b>Hello world 21!</b><br>I am a popup."}},
            {info: {coordinate: [23.310534503365063,113.21329057216644],description: "<b>Hello world 22!</b><br>I am a popup."}},
            {info: {coordinate: [23.310634503365063,113.21329057216644],description: "<b>Hello world 23!</b><br>I am a popup."}},
            {info: {coordinate: [23.310734503365063,113.21329057216644],description: "<b>Hello world 24!</b><br>I am a popup."}},
            {info: {coordinate: [23.310834503365063,113.21329057216644],description: "<b>Hello world 25!</b><br>I am a popup."}},
            {info: {coordinate: [23.310934503365063,113.21329057216644],description: "<b>Hello world 26!</b><br>I am a popup."}},
            {info: {coordinate: [23.311034503365063,113.21329057216644],description: "<b>Hello world 27!</b><br>I am a popup."}},
            {info: {coordinate: [23.311134503365063,113.21329057216644],description: "<b>Hello world 28!</b><br>I am a popup."}},
            {info: {coordinate: [23.311234503365063,113.21329057216644],description: "<b>Hello world 29!</b><br>I am a popup."}},
            {info: {coordinate: [23.311334503365063,113.21329057216644],description: "<b>Hello world 30!</b><br>I am a popup."}},
            {info: {coordinate: [23.311434503365063,113.21329057216644],description: "<b>Hello world 31!</b><br>I am a popup."}},
            {info: {coordinate: [23.311534503365063,113.21329057216644],description: "<b>Hello world 32!</b><br>I am a popup."}},
            {info: {coordinate: [23.311634503365063,113.21329057216644],description: "<b>Hello world 33!</b><br>I am a popup."}},
            {info: {coordinate: [23.311734503365063,113.21329057216644],description: "<b>Hello world 34!</b><br>I am a popup."}},
            {info: {coordinate: [23.311834503365063,113.21329057216644],description: "<b>Hello world 35!</b><br>I am a popup."}},
            {info: {coordinate: [23.311934503365063,113.21329057216644],description: "<b>Hello world 36!</b><br>I am a popup."}},
            {info: {coordinate: [23.312034503365063,113.21329057216644],description: "<b>Hello world 37!</b><br>I am a popup."}},
            {info: {coordinate: [23.312134503365063,113.21329057216644],description: "<b>Hello world 38!</b><br>I am a popup."}},
            {info: {coordinate: [23.312234503365063,113.21329057216644],description: "<b>Hello world 39!</b><br>I am a popup."}},
            {info: {coordinate: [23.312334503365063,113.21329057216644],description: "<b>Hello world 40!</b><br>I am a popup."}},
            {info: {coordinate: [23.312434503365063,113.21329057216644],description: "<b>Hello world 41!</b><br>I am a popup."}},
            {info: {coordinate: [23.312534503365063,113.21329057216644],description: "<b>Hello world 42!</b><br>I am a popup."}},
            {info: {coordinate: [23.312634503365063,113.21329057216644],description: "<b>Hello world 43!</b><br>I am a popup."}},
            {info: {coordinate: [23.312734503365063,113.21329057216644],description: "<b>Hello world 44!</b><br>I am a popup."}},
            {info: {coordinate: [23.312834503365063,113.21329057216644],description: "<b>Hello world 45!</b><br>I am a popup."}},
            {info: {coordinate: [23.312934503365063,113.21329057216644],description: "<b>Hello world 46!</b><br>I am a popup."}},
            {info: {coordinate: [23.313034503365063,113.21329057216644],description: "<b>Hello world 47!</b><br>I am a popup."}},
            {info: {coordinate: [23.313134503365063,113.21329057216644],description: "<b>Hello world 48!</b><br>I am a popup."}},
            {info: {coordinate: [23.313234503365063,113.21329057216644],description: "<b>Hello world 49!</b><br>I am a popup."}},
            {info: {coordinate: [23.313334503365063,113.21329057216644],description: "<b>Hello world 50!</b><br>I am a popup."}},
            {info: {coordinate: [23.313434503365063,113.21329057216644],description: "<b>Hello world 51!</b><br>I am a popup."}},
            {info: {coordinate: [23.313534503365063,113.21329057216644],description: "<b>Hello world 52!</b><br>I am a popup."}},
            {info: {coordinate: [23.313634503365063,113.21329057216644],description: "<b>Hello world 53!</b><br>I am a popup."}},
            {info: {coordinate: [23.313734503365063,113.21329057216644],description: "<b>Hello world 54!</b><br>I am a popup."}},
            {info: {coordinate: [23.313834503365063,113.21329057216644],description: "<b>Hello world 55!</b><br>I am a popup."}},
            {info: {coordinate: [23.313934503365063,113.21329057216644],description: "<b>Hello world 56!</b><br>I am a popup."}},
            {info: {coordinate: [23.314034503365063,113.21329057216644],description: "<b>Hello world 57!</b><br>I am a popup."}},
            {info: {coordinate: [23.314134503365063,113.21329057216644],description: "<b>Hello world 58!</b><br>I am a popup."}},
            {info: {coordinate: [23.314234503365063,113.21329057216644],description: "<b>Hello world 59!</b><br>I am a popup."}},
            {info: {coordinate: [23.314334503365063,113.21329057216644],description: "<b>Hello world 60!</b><br>I am a popup."}},
            {info: {coordinate: [23.314434503365063,113.21329057216644],description: "<b>Hello world 61!</b><br>I am a popup."}},
            {info: {coordinate: [23.314534503365063,113.21329057216644],description: "<b>Hello world 62!</b><br>I am a popup."}},
            {info: {coordinate: [23.314634503365063,113.21329057216644],description: "<b>Hello world 63!</b><br>I am a popup."}},
            {info: {coordinate: [23.314734503365063,113.21329057216644],description: "<b>Hello world 64!</b><br>I am a popup."}},
            {info: {coordinate: [23.314834503365063,113.21329057216644],description: "<b>Hello world 65!</b><br>I am a popup."}},
            {info: {coordinate: [23.314934503365063,113.21329057216644],description: "<b>Hello world 66!</b><br>I am a popup."}},
            {info: {coordinate: [23.315034503365063,113.21329057216644],description: "<b>Hello world 67!</b><br>I am a popup."}},
            {info: {coordinate: [23.315134503365063,113.21329057216644],description: "<b>Hello world 68!</b><br>I am a popup."}},
            {info: {coordinate: [23.315234503365063,113.21329057216644],description: "<b>Hello world 69!</b><br>I am a popup."}},
            {info: {coordinate: [23.315334503365063,113.21329057216644],description: "<b>Hello world 70!</b><br>I am a popup."}},
            {info: {coordinate: [23.315434503365063,113.21329057216644],description: "<b>Hello world 71!</b><br>I am a popup."}},
            {info: {coordinate: [23.315534503365063,113.21329057216644],description: "<b>Hello world 72!</b><br>I am a popup."}},
            {info: {coordinate: [23.315634503365063,113.21329057216644],description: "<b>Hello world 73!</b><br>I am a popup."}},
            {info: {coordinate: [23.315734503365063,113.21329057216644],description: "<b>Hello world 74!</b><br>I am a popup."}},
            {info: {coordinate: [23.315834503365063,113.21329057216644],description: "<b>Hello world 75!</b><br>I am a popup."}},
            {info: {coordinate: [23.315934503365063,113.21329057216644],description: "<b>Hello world 76!</b><br>I am a popup."}},
            {info: {coordinate: [23.316034503365063,113.21329057216644],description: "<b>Hello world 77!</b><br>I am a popup."}},
            {info: {coordinate: [23.316134503365063,113.21329057216644],description: "<b>Hello world 78!</b><br>I am a popup."}},
            {info: {coordinate: [23.316234503365063,113.21329057216644],description: "<b>Hello world 79!</b><br>I am a popup."}},
            {info: {coordinate: [23.316334503365063,113.21329057216644],description: "<b>Hello world 80!</b><br>I am a popup."}},
            {info: {coordinate: [23.316434503365063,113.21329057216644],description: "<b>Hello world 81!</b><br>I am a popup."}},
            {info: {coordinate: [23.316534503365063,113.21329057216644],description: "<b>Hello world 82!</b><br>I am a popup."}},
            {info: {coordinate: [23.316634503365063,113.21329057216644],description: "<b>Hello world 83!</b><br>I am a popup."}},
            {info: {coordinate: [23.316734503365063,113.21329057216644],description: "<b>Hello world 84!</b><br>I am a popup."}},
            {info: {coordinate: [23.316834503365063,113.21329057216644],description: "<b>Hello world 85!</b><br>I am a popup."}},
            {info: {coordinate: [23.316934503365063,113.21329057216644],description: "<b>Hello world 86!</b><br>I am a popup."}},
            {info: {coordinate: [23.317034503365063,113.21329057216644],description: "<b>Hello world 87!</b><br>I am a popup."}},
            {info: {coordinate: [23.317134503365063,113.21329057216644],description: "<b>Hello world 88!</b><br>I am a popup."}},
            {info: {coordinate: [23.317234503365063,113.21329057216644],description: "<b>Hello world 89!</b><br>I am a popup."}},
            {info: {coordinate: [23.317334503365063,113.21329057216644],description: "<b>Hello world 90!</b><br>I am a popup."}},
            {info: {coordinate: [23.317434503365063,113.21329057216644],description: "<b>Hello world 91!</b><br>I am a popup."}},
            {info: {coordinate: [23.317534503365063,113.21329057216644],description: "<b>Hello world 92!</b><br>I am a popup."}},
            {info: {coordinate: [23.317634503365063,113.21329057216644],description: "<b>Hello world 93!</b><br>I am a popup."}},
            {info: {coordinate: [23.317734503365063,113.21329057216644],description: "<b>Hello world 94!</b><br>I am a popup."}},
            {info: {coordinate: [23.317834503365063,113.21329057216644],description: "<b>Hello world 95!</b><br>I am a popup."}},
            {info: {coordinate: [23.317934503365063,113.21329057216644],description: "<b>Hello world 96!</b><br>I am a popup."}},
            {info: {coordinate: [23.318034503365063,113.21329057216644],description: "<b>Hello world 97!</b><br>I am a popup."}},
            {info: {coordinate: [23.318134503365063,113.21329057216644],description: "<b>Hello world 98!</b><br>I am a popup."}},
            {info: {coordinate: [23.318234503365063,113.21329057216644],description: "<b>Hello world 99!</b><br>I am a popup."}},
            {info: {coordinate: [23.318334503365063,113.21329057216644],description: "<b>Hello world 100!</b><br>I am a popup."}}
        ]
    }
  }
};
</script>
