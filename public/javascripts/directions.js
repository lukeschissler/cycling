// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script
// src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
var map;
function initMap() {

    // Create a new StyledMapType object, passing it an array of styles,
    // and the name to be displayed on the map type control.
    var styledMapType = new google.maps.StyledMapType(
        [
            {
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#ebe3cd"
                    }
                ]
            },
            {
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#523735"
                    }
                ]
            },
            {
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#f5f1e6"
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#c9b2a6"
                    }
                ]
            },
            {
                "featureType": "administrative.land_parcel",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#dcd2be"
                    }
                ]
            },
            {
                "featureType": "administrative.land_parcel",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#ae9e90"
                    }
                ]
            },
            {
                "featureType": "landscape.natural",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#dfd2ae"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#dfd2ae"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#93817c"
                    }
                ]
            },
            {
                "featureType": "poi.business",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#a5b076"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#447530"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#f5f1e6"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#fdfcf8"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#f8c967"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#e9bc62"
                    }
                ]
            },
            {
                "featureType": "road.highway.controlled_access",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#e98d58"
                    }
                ]
            },
            {
                "featureType": "road.highway.controlled_access",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#db8555"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#806b63"
                    }
                ]
            },
            {
                "featureType": "transit",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "transit.line",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#dfd2ae"
                    }
                ]
            },
            {
                "featureType": "transit.line",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#8f7d77"
                    }
                ]
            },
            {
                "featureType": "transit.line",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#ebe3cd"
                    }
                ]
            },
            {
                "featureType": "transit.station",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#dfd2ae"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#b9d3c2"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#92998d"
                    }
                ]
            }
        ],
        {name: 'Styled Map'});

    // Create a map object, and include the MapTypeId to add
    // to the map type control.
    var map = new google.maps.Map(document.getElementById('map'), {
        mapTypeControl: false,
        center: {lat: 42.3601, lng: -71.0589},
        zoom: 11,
    });

    //Associate the styled map with the MapTypeId and set it to display.
    map.mapTypes.set('styled_map', styledMapType);
    map.setMapTypeId('styled_map');

    new AutocompleteDirectionsHandler(map);
    const bikeLayer = new google.maps.BicyclingLayer();
}

class AutocompleteDirectionsHandler {
    constructor(map) {
        this.map = map;
        this.originPlaceId = "";
        this.destinationPlaceId = "";
        this.travelMode = google.maps.TravelMode.BICYCLING;
        this.directionsService = new google.maps.DirectionsService();
        this.directionsRenderer = new google.maps.DirectionsRenderer({polylineOptions: {
                strokeColor: "#A95182",
                strokeWeight: "5",
                strokeOpacity: "0.8"
            }
        });
        this.directionsRendererTwo = new google.maps.DirectionsRenderer({polylineOptions: {
                strokeColor: "#7851a9",
                strokeWeight: "5",
                strokeOpacity: "0.8"
            }
        });
        this.directionsRenderer.setPanel(document.getElementById("right-panel"));
        this.directionsRendererTwo.setMap(map);
        this.directionsRenderer.setMap(map);
        this.showMap()
        const originInput = document.getElementById("origin-input");
        const destinationInput = document.getElementById("destination-input");
        const modeSelector = document.getElementById("mode-selector");

        const originAutocomplete = new google.maps.places.Autocomplete(originInput);
        // Specify just the place data fields that you need.
        originAutocomplete.setFields(["place_id"]);
        const destinationAutocomplete = new google.maps.places.Autocomplete(
            destinationInput
        );
        // Specify just the place data fields that you need.
        destinationAutocomplete.setFields(["place_id"]);

        this.setupPlaceChangedListener(originAutocomplete, "ORIG");
        this.setupPlaceChangedListener(destinationAutocomplete, "DEST");
        this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(originInput);
        this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(
            destinationInput
        );
        this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(modeSelector);
    }

    setupPlaceChangedListener(autocomplete, mode) {
        autocomplete.bindTo("bounds", this.map);
        autocomplete.addListener("place_changed", () => {
            const place = autocomplete.getPlace();

            if (!place.place_id) {
                window.alert("Please select an option from the dropdown list.");
                return;
            }

            if (mode === "ORIG") {
                this.originPlaceId = place.place_id;
            } else {
                this.destinationPlaceId = place.place_id;
            }
            this.route();
        });
    }
    generateComment(comment) {
        const commentNode = document.createElement('div');
        commentNode.classList.add("comment");
        const commentID = document.createElement('h5');
        const commentBody = document.createElement('div');
        commentBody.classList.add("comment-body");
        const commentDesc = document.createElement('span');
        const commentBottom = document.createElement('div');
        commentBottom.classList.add("comment-bottom");

        const commentIDText = document.createTextNode(comment['id']);
        commentID.appendChild(commentIDText);
        const commentDescText = document.createTextNode(comment['description']);
        commentDesc.appendChild(commentDescText);
        const commentBottomText = document.createTextNode(comment['rating']);
        commentBottom.appendChild(commentBottomText);

        commentNode.appendChild(commentID);
        commentNode.appendChild(commentBody);
        commentBody.appendChild(commentDesc);
        commentNode.appendChild(commentBottom);

        document.getElementById("comments-div").appendChild(commentNode);
    }

    showComments(start, end) {

        document.getElementById("comments-div").innerHTML = "";

        const latlngData = {
            originLat :  start.lat(),
            originLng : start.lng(),
            destinationLat : end.lat(),
            destinationLng : end.lng()
        }

        fetch(`/retrieve-comments`, {
            method: "post",
            headers: { "Content-Type": 'application/json' },
            body: JSON.stringify(latlngData)
        })
            .then(res => res.json())
            .then(data => {
                data.forEach(comment => this.generateComment(comment));

                const stuff = document.getElementById("stuff-panel");
                if (stuff) {
                    stuff.id = "stuff-panel-visible";
                }

                let activeComment;
                const allComments =  document.getElementsByClassName("comment");

                Array.from(allComments).forEach(comment => {
                    comment.addEventListener('click', event => {
                        const user = comment.childNodes[0].innerText
                        if (!activeComment) {
                            activeComment = comment;
                            comment.style['background-color'] = 'rgba(109, 104, 117, 0.2)';
                            this.existingRoute(user);
                            this.scrollUp();
                        } else if (activeComment !== comment) {
                            activeComment.style['background-color'] = 'rgba(242, 233, 228, 0.3)';
                            activeComment = comment;
                            comment.style['background-color'] = 'rgba(109, 104, 117, 0.2)';
                            this.existingRoute(user);
                            this.scrollUp();
                        }
                    })
                })
            })
            .catch(error => console.error(error));
    }

    showMap () {
        document.getElementById("map-pre").id = "map-post";
    }

    scrollDown() {
        window.scrollBy(0, 100);
    }

    scrollUp() {
        window.scrollBy(0, -1000000)
    }

    existingRoute(user) {

        fetch(`/retrieve-route/${user}`)
            .then(res => res.json())
            .then(data => {

                this.directionsService.route(
                    {
                        origin: data.origin,
                        destination: data.destination,
                        travelMode: this.travelMode
                    },
                    (response, status) => {
                        if (status === "OK") {
                            this.directionsRendererTwo.setDirections(response);
                        } else {
                            window.alert("Directions request failed due to " + status);
                        }
                    }
                );
            });
    }

    route() {
        if (!this.originPlaceId || !this.destinationPlaceId) {
            return;
        }
        const me = this;


        this.directionsService.route(
            {
                origin: { placeId: this.originPlaceId },
                destination: { placeId: this.destinationPlaceId },
                travelMode: this.travelMode
            },
            (response, status) => {
                if (status === "OK") {
                    const start = response.routes[0].legs[0].start_location
                    const end = response.routes[0].legs.slice(-1)[0].end_location

                    document.getElementById('origin-lat').innerText = start.lat()
                    document.getElementById('origin-lng').innerText = start.lng()
                    document.getElementById('dest-lat').innerText = end.lat()
                    document.getElementById('dest-lng').innerText = end.lng()

                    //console.log(response.routes[0].legs[0].steps[0].start_location.lat())

                    //show the directions panel and the comments panel
                    const dirPanel = document.getElementById('dir-panel');
                    if (dirPanel) {
                        dirPanel.id = 'dir-panel-visible';
                    }
                    this.showComments(start, end);

                    //scroll down to the comments
                    this.scrollDown();

                    //set the directions to the answer of the query
                    me.directionsRenderer.setDirections(response);

                } else {
                    window.alert("Directions request failed due to " + status);
                }
            }
        );
    }
}


function formSubmit(event){
    //Prevent form from firing
    event.preventDefault()

    //Get all the form data
    const formID = document.getElementById('id-input').value
    const formDescription = document.getElementById('desc-input').value
    const formRating = document.getElementById('rating-input').value
    const originLat = parseFloat(document.getElementById('origin-lat').innerHTML)
    const originLng = parseFloat(document.getElementById('origin-lng').innerHTML)
    const destinationLat = parseFloat(document.getElementById('dest-lat').innerHTML)
    const destinationLng = parseFloat(document.getElementById('dest-lng').innerHTML)

    //Do validation ...

    //Send post request via fetch
    const commentData = {
        id : formID,
        description : formDescription,
        rating : formRating,
        originLat : originLat,
        originLng : originLng,
        destLat : destinationLat,
        destLng : destinationLng,
    }

    fetch("/", {
        method: "post",
        headers: { "Content-Type": 'application/json' },
        body: JSON.stringify(commentData)
    }).then(res => {
        console.log("request complete! Response:", res);
    });
}

