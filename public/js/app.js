
  var currentLocation = new google.maps.LatLng(37.784633, -122.397414);
  var service;

  function handleSearchResults(results, status){
    debugger
    console.log(results);
    // for(var i = 0; i < results.length; i++){
    //   position: results[i].geometry.location,
    //   map: map
    // }
  }

  function performSearch(){
    var request = {
      // restricts the search to the currently showing map
      bounds: map.getBounds(),
      name: "McDonald's"
    }
    service.nearbySearch(request, handleSearchResults);
  }

  function initialize(location){
    // Prerpares google map
    var mapOptions = {
      center: location,
      zoom: 8,
      mapTypeId: google.maps.MapTypeId.WALKING
    };
    // map object
    map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    //
    var marker = new google.maps.Marker({
      position: location,
      map: map
    });
    service = new google.maps.places.PlacesService(map);
    debugger
    google.maps.event.addListenerOnce(map, 'bounds_cahnged', performSearch);
  }


$(document).ready(function(){
  initialize(currentLocation);
});