// The this all my favarite moving locations app will load these location by default

var locations = [{
    name: "Little Manuels",
    lon: 38.00684,
    lat: -121.805525,
    content: "<div class='info'>Little Manuels</div>"
}, {
    name: "Hazels Drive-in",
    lon: 38.0127268,
    lat: -121.83241,
    content: "<div class='info'>Hazels Drive-in</div>"
}, {
    name: "Tao San Jin",
    lon: 37.9628493,
    lat: -121.7366144,
    content: "<div class='info'>Tao San Jin</div>"
}, {
    name: "Johnny Garlics",
    lon: 37.94536,
    lat: -121.742153,
    content: "<div class='info'>Johnny Garlics</div>"
}, {
    name: "In-N-Out Burger",
    lon: 37.955532,
    lat: -121.6194595,
    content: "<div class='info'>In-N-Out Burger</div>"
}, {
    name: "Bluefin Sushi",
    lon: 37.6058122,
    lat: -122.1113959,
    content: "<div class='info'>Bluefin Sushi</div>"
}, {
    name: "E.J.Phair",
    lon: 38.0330084,
    lat: -121.8846951,
    content: "<div class='info'>E.J.Phair</div>"
}, {
    name: "Bluefin Sushi",
    lon: 38.033322,
    lat: -121.8857923,
    content: "<div class='info'>Bluefin Sushi</div>"
}];


var map;


var marker = [];
var infowindow = [];

// The function for initilization the google map

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: locations[0].lon,
            lng: locations[0].lat
        },
        zoom: 8
    });


    for (var i = 0; i < locations.length; i++) {
        marker[i] = new google.maps.Marker({
            map: map,
            animation: google.maps.Animation.DROP,
            position: {
                lat: locations[i].lon,
                lng: locations[i].lat
            }
        });
        //let me creat all the info window
          infowindow[i] = new google.maps.InfoWindow({
          content:locations[i].content
        });

        marker[i].addListener('click', (function(infoCopy,markerCopy) {
          return function(){
              infoCopy.open(map, markerCopy);
          }

        })(infowindow[i],marker[i]));

        google.maps.event.addListener(marker[i], 'click', function() {
            toggleBounce(this);
        });

    }

}



// A fucntion to handle marker boucing when clicked
function toggleBounce(marker) {
    if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
    } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
        window.setTimeout(function(){
          marker.setAnimation(null);
        }, 2000);
    }
}






//this is the KO part for MVVM pattern

function AppViewModel() {
    var self = this;
    self.allLocations = ko.observableArray(locations);

    //when locations in the list view is clicked

    self.locationClicked = function(location){
      console.log(location);
      // when clicked, set the center of the map to current clicked location
      map.setCenter(new google.maps.LatLng(location.lon, location.lat));

      // indentify which index of location is being clicked

      var index;
      for(var i=0;i<locations.length;i++){
        if(locations[i].name===location.name){
          index=i;
        }
      }
      toggleBounce(marker[index]);
      infowindow[index].open(map, marker[index]);

    };

    //now let's handel the search filter function
    self.query = ko.observable('');
    self.search = function(value) {
      // remove all the current locations, which removes them from the view
      AppViewModel.allLocations.removeAll();

      for(var x in locations) {
        if(locations[x].name.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
          AppViewModel.allLocations.push(locations[x]);
        }
      }
    };

}

// Activates knockout.js
ko.applyBindings(new AppViewModel());
AppViewModel.query.subscribe(AppViewModel.search);
