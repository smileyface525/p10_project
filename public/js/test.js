
$(document).ready(function() {

  $('button').on('click', function(){
  var latLngRequest = $.ajax({
    url: '/users/map',
    type: 'GET'
  })
  latLngRequest.done(function(location){
    console.log(location)
  })
    initialize(myLocation);
    var totalTime = Number(document.getElementById("time").value);
    var distanceInMiles = (totalTime/2)*(3.1/60);
    var distanceInMiles = Number(document.getElementById("distance").value);
    var distanceInCoord = distanceInMiles*(1/69);

    var southEastLat = locLat - distanceInCoord;
    var southEastLng = locLong + distanceInCoord;

    var southWestLat = locLat - distanceInCoord;
    var southWestLng = locLong - distanceInCoord;

    var northEastLat = locLat + distanceInCoord;
    var northEastLng = locLong + distanceInCoord;

    var northWestLat = locLat + distanceInCoord;
    var northWestLng = locLong - distanceInCoord;

    var southEast = new google.maps.LatLng(southEastLat, southEastLng);
    var southWest = new google.maps.LatLng(southWestLat, southWestLng);
    var northEast = new google.maps.LatLng(northEastLat, northEastLng);
    var northWest = new google.maps.LatLng(northWestLat, northWestLng);
    calcRoute(myLocation, southWest);
    calcRoute(myLocation, northWest);
    var routes = [southEast, southWest, northEast, northWest]
    for (var i = 0; i < routes.length; i++) {
      addMarkerWithLabel(routes[i], "Route " + (i+1), myLocation)
    }
  });

});

var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;

// User's location
var myLocation = new google.maps.LatLng(locLat, locLong);

// Initiate google map with home marker
function initialize(currentLocation) {
  directionsDisplay = new google.maps.DirectionsRenderer();

  var mapOptions = {
    zoom:15,
    center: currentLocation
  }
  map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
  directionsDisplay.setMap(map);
  directionsDisplay.setPanel(document.getElementById("directionsPanel"));
  addMarkerWithLabel(currentLocation, 'Home!')

}

// calculates distance and gets the direction
var calcRoute = function(startLoc, endLoc) {
  var start = startLoc;
  var end = endLoc;
  var request = {
    origin:start,
    destination:end,
    // Set the mode to WALKIGNG later
    travelMode: google.maps.TravelMode.WALKING
  };
  directionsService.route(request, function(responce, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(responce);
    }
  });
}

var addMarkerWithLabel = function(location, message, startPoint){
  var myMarker = new google.maps.Marker({
        position: location,
        map: map,
        draggable: true,
        labelAnchor: new google.maps.Point(22, 0),
    });
    var iw = new google.maps.InfoWindow({
      content: message
    });
    iw.open(map, myMarker);
    if ( typeof startPoint !== 'undefined') {
      google.maps.event.addListener(myMarker, "click", function (e) {
        calcRoute(startPoint, location);
      });
    }

}


