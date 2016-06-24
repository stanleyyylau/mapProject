var locations = [{
    name: "Little Manuels",
    lon: 38.00684,
    lat: -121.805525,
    content: "<div class='info'>testtesttesttesttesttesttesttesttesttesttesttesttesttest</div>"
}, {
    name: "Hazels Drive-in",
    lon: 38.0127268,
    lat: -121.83241,
    content: "<div class='info'>testtesttesttesttesttesttesttesttesttesttesttesttesttest</div>"
}, {
    name: "Tao San Jin",
    lon: 37.9628493,
    lat: -121.7366144,
    content: "<div class='info'>testtesttesttesttesttesttesttesttesttesttesttesttesttest</div>"
}, {
    name: "Johnny Garlics",
    lon: 37.94536,
    lat: -121.742153,
    content: "<div class='info'>testtesttesttesttesttesttesttesttesttesttesttesttesttest</div>"
}, {
    name: "In-N-Out Burger",
    lon: 37.955532,
    lat: -121.6194595,
    content: "<div class='info'>testtesttesttesttesttesttesttesttesttesttesttesttesttest</div>"
}, {
    name: "Bluefin Sushi",
    lon: 37.6058122,
    lat: -122.1113959,
    content: "<div class='info'>testtesttesttesttesttesttesttesttesttesttesttesttesttest</div>"
}, {
    name: "E.J.Phair",
    lon: 38.0330084,
    lat: -121.8846951,
    content: "<div class='info'>testtesttesttesttesttesttesttesttesttesttesttesttesttest</div>"
}, {
    name: "Bluefin Sushi",
    lon: 38.033322,
    lat: -121.8857923,
    content: "<div class='info'>testtesttesttesttesttesttesttesttesttesttesttesttesttest</div>"
}];


var map;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: locations[0].lon,
            lng: locations[0].lat
        },
        zoom: 8
    });

    var marker = [];
    var infowindow = [];
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


function AppViewModel() {
    this.firstName = "Bert";
    this.lastName = "Bertington";
}

// Activates knockout.js
ko.applyBindings(new AppViewModel());
