var map = L.map("map").setView([35.2798, 59.2161], 12);
var latitude = null;
var longitude = null;
var timeOut = null;
let osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

map.on("click", function (e) {
  latitude = e.latlng.lat;
  longitude = e.latlng.lng;
  var circle = L.circle([latitude, longitude], {
    color: "blue",
    radius: 10,
  }).addTo(map);
  var marker = L.marker([latitude, longitude]).addTo(map);

  map.on("click", function () {
    marker.remove();
    circle.remove();
  });

  if (timeOut) clearTimeout(timeOut);
  timeOut = setTimeout(function () {
    sendGeo(latitude, longitude);
  }, 700);

});

var geocoder = L.Control.geocoder({
  defaultMarkGeocode: false,
})
  .on("markgeocode", function (e) {
    var bbox = e.geocode.bbox;
    var poly = L.polygon([
      bbox.getSouthEast(),
      bbox.getNorthEast(),
      bbox.getNorthWest(),
      bbox.getSouthWest(),
    ]).addTo(map);
    map.fitBounds(poly.getBounds());
  })
  .addTo(map);

const sendGeo = (latitude, longitude) => {
  console.log(latitude, longitude);
};
