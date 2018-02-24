/* =====================
 Copy your code from Week 4 Lab 2 Part 2 part2-app-state.js in this space
===================== */
var downloadData = $.ajax("https://raw.githubusercontent.com/CPLN-692-401/datasets/master/json/philadelphia-crime-snippet.json");
var allMarkers = [];


var parseData = function(data) {return JSON.parse(data)};
var makeMarkers = function(data) {return _.map(data, function(obj) {allMarkers.push([obj.Lat, obj.Lng]); return [obj.Lat, obj.Lng]})};
var plotMarkers = function(data) {return _.map(data, function(item) {return L.marker(item).addTo(map)})};
var filterData = function(data) {
  return _.map(data, function(obj){
    if (obj.District >= $('#input1').val() && obj.District <= $('#input2').val()){
      return [obj.Lat, obj.Lng]}
    })
  }
var removeNull = function(data) {return data.filter(function(x){return x})}

var resetMap = function(data) { _.each(data, function(marker) { map.removeLayer(marker)})}

var map = L.map('map', {
  center: [39.9522, -75.1639],
  zoom: 14
});
var Stamen_TonerLite = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);



downloadData.done(function(data) {
  var parsed = parseData(data);
  console.log(parsed);
  var markers = makeMarkers(parsed);
  var markers2 = plotMarkers(markers);
  console.log(markers);
  resetMap(markers2);})

var markers2;
$('button').click(function() {

  downloadData.done(function(data) {
    if(markers2!==undefined){
      resetMap(markers2);
    }
    var parsed = parseData(data);
    var filtered = filterData(parsed);
    console.log(filtered);
    var filtered2 = removeNull(filtered);
    console.log(filtered2);
    markers2 = plotMarkers(filtered2);

})})



//jQuery.event
