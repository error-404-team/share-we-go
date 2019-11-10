import React from 'react'

export function CustomMarker(google, latlng, map, args, img) {
    this.latlng = latlng;
    this.args = args;
    this.img = img;
    this.maps = map
    this.google = google
    // setGoogle(google)
}

CustomMarker.prototype = new google.maps.OverlayView();

CustomMarker.prototype.onAdd = function () {
    var self = this;
    var div = this.div;
    if (!div) {
        // Generate marker html
        div = this.div = document.createElement('div');
        div.className = 'custom-marker';
        div.style.position = 'absolute';
        var innerDiv = document.createElement('div');
        innerDiv.className = 'custom-marker-inner';
        innerDiv.innerHTML = `<img  src="${this.img}" style="border-radius: inherit;width: 20px;height: 20px;margin: 2px;"/>`
        div.appendChild(innerDiv);

        if (typeof (self.args.marker_id) !== 'undefined') {
            div.dataset.marker_id = self.args.marker_id;
        }

        google.maps.event.addDomListener(div, "click", function (event) {
            google.maps.event.trigger(self, "click");
        });

        var panes = this.getPanes();
        panes.overlayImage.appendChild(div);
    }
};

CustomMarker.prototype.draw = function () {
    // มี bug icon ไม่เกาะ map
    if (this.div) {
        // กำหนด ตำแหน่ง ของhtml ที่สร้างไว้
        let positionA = new this.google.maps.LatLng(this.latlng.lat, this.latlng.lng);

        this.pos = this.getProjection().fromLatLngToDivPixel(positionA);
        // console.log(this.pos);
        this.div.style.left = this.pos.x + 'px';
        this.div.style.top = this.pos.y + 'px';
    }
};

CustomMarker.prototype.getPosition = function () {
    return this.latlng;
};