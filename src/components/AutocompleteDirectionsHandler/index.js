import React from 'react';

export function AutocompleteDirectionsHandler(google, map, data) {
    this.map = map;
    this.originPlaceId = null;
    this.destinationPlaceId = null;
    this.travelMode = 'WALKING';
    this.directionsService = new google.maps.DirectionsService;
    this.directionsRenderer = new google.maps.DirectionsRenderer;
    this.directionsRenderer.setMap(this.map);

    var me = this

    if (data.share === true) {
        me.setupPlaceChangedListener(data.geocoded_waypoints[0].place_id, 'ORIG');
        me.setupPlaceChangedListener(data.geocoded_waypoints[1].place_id, 'DEST');
        me.setupClickListener(data.request.travelMode);

    } else {
        me.setupPlaceChangedListener(data.geocoded_waypoints[0].place_id, 'ORIG');
        me.setupPlaceChangedListener(data.geocoded_waypoints[1].place_id, 'DEST');
        me.setupClickListener(data.request.travelMode);
    }
}

// Sets a listener on a radio button to change the filter type on Places
// Autocomplete.
AutocompleteDirectionsHandler.prototype.setupClickListener = function (mode) {
    var me = this;

    me.travelMode = mode;
    me.route();
};

AutocompleteDirectionsHandler.prototype.setupPlaceChangedListener = function (
    place, mode) {
    var me = this;

    console.log(place);

    if (!place) {
        alert('Please select an option from the dropdown list.');
        return;
    }
    if (mode === 'ORIG') {
        me.originPlaceId = place;
    } else {
        me.destinationPlaceId = place;
    }
    me.route();
};

AutocompleteDirectionsHandler.prototype.route = function () {
    if (!this.originPlaceId || !this.destinationPlaceId) {
        return;
    }
    var me = this;

    this.directionsService.route(
        {
            origin: { 'placeId': this.originPlaceId },
            destination: { 'placeId': this.destinationPlaceId },
            travelMode: this.travelMode
        },
        function (response, status) {
            if (status === 'OK') {
                me.directionsRenderer.setDirections(response);
                // console.log(response);

            } else {
                alert('Directions request failed due to ' + status);
                // console.log(response, status);

            }
        });
};