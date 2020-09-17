function initMap() {
    const directionsRenderer = new google.maps.DirectionsRenderer();
    const directionsService = new google.maps.DirectionsService();
    const start = document.getElementById("start")
    const end = document.getElementById("end")

    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 4,
        center: {
            lat: 39.8283,
            lng: -98.5795
        }
    });
    directionsRenderer.setMap(map);
    directionsRenderer.setPanel(document.getElementById("right-panel"));
    const control = document.getElementById("floating-panel");
    control.style.display = "block";
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(control);

    const onChangeHandler = function() {
        if (start.value !== "" && end.value !== "") {
            calculateAndDisplayRoute(directionsService, directionsRenderer);
        };
    };

    start.addEventListener("change", onChangeHandler);
    end.addEventListener("change", onChangeHandler);
}


function calculateAndDisplayRoute(directionsService, directionsRenderer) {
    const start = document.getElementById("start").value;
    const end = document.getElementById("end").value;
    directionsService.route(
        {
            origin: start,
            destination: end,
            travelMode: 'BICYCLING'
        },
        (response, status) => {
            if (status === "OK") {
                directionsRenderer.setDirections(response);
                console.log(directionsRenderer.getDirections().routes["0"].legs["0"].start_location.lat())
            } else {
                window.alert("Directions request failed due to " + status);
            }
        }
    );
}
// get starting directions lat directionsRenderer.getDirections().routes["0"].legs["0"].start_location.lat()
// get starting directions long directionsRenderer.getDirections().routes["0"].legs["0"].start_location.lng()