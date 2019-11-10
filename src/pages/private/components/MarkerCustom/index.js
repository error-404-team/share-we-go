import ReactDOM from 'react-dom';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

const MarkerCustom = (props) => {
    const [map, setMap] = useState(null);
    const customMarke = useRef();

    // useEffect(({ google } = props) => {
    function CustomMarker(latlng, map, args) {
        this.latlng = latlng;
        this.args = args;
        // this.img = img;
        // this.setMap(map);
        this.maps = map
        setMap(map)
        // setGoogle(google)
    }

    CustomMarker.prototype = new props.google.maps.OverlayView();

    CustomMarker.prototype.onAdd = function () {
        var self = this;
        var div = this.div;
        console.log('aa');

        if (!div) {
            // Generate marker html
            div = this.div = customMarke;
            div.className = 'custom-marker';
            div.style.position = 'absolute';
            div.className = 'custom-marker';
            //         div.style.position = 'absolute';
            var innerDiv = document.createElement('div');
            innerDiv.className = 'custom-marker-inner';
            // var innerDiv = React.createElement('div',
            //     { className: "custom-marker-inner" },
            //     props.element !== undefined ? props.element : `<img  src="https://img.icons8.com/ios-glyphs/30/000000/user--v1.png" style="border-radius: inherit;width: 20px;height: 20px;margin: 2px;"/>`
            // );
            // innerDiv.innerHTML = `<img  src="${this.img}" style="border-radius: inherit;width: 20px;height: 20px;margin: 2px;"/>`
            innerDiv.innerHTML = props.element !== undefined ? props.element : `<img  src="https://img.icons8.com/ios-glyphs/30/000000/user--v1.png" style="border-radius: inherit;width: 20px;height: 20px;margin: 2px;"/>`;
            // div.appendChild(innerDiv);
            // ReactDOM.render(innerDiv, div)

            if (typeof (self.args.marker_id) !== 'undefined') {
                div.dataset.marker_id = self.args.marker_id;
            }

            props.google.maps.event.addDomListener(div, "click", function (event) {
                props.google.maps.event.trigger(self, "click");
            });

            var panes = this.getPanes();
            panes.overlayImage.appendChild(div);
        }
    };

    CustomMarker.prototype.draw = function () {
        // มี bug icon ไม่เกาะ map
        if (this.div) {
            // กำหนด ตำแหน่ง ของhtml ที่สร้างไว้
            let positionA = new props.google.maps.LatLng(this.latlng.lat, this.latlng.lng);

            this.pos = this.getProjection().fromLatLngToDivPixel(positionA);
            // console.log(this.pos);
            this.div.style.left = this.pos.x + 'px';
            this.div.style.top = this.pos.y + 'px';
        }
    };

    CustomMarker.prototype.getPosition = function () {
        return this.latlng;
    };

    // get.users.location(me.props.uid).then(function (geo) {
    // if (props.location !== undefined) {
    //     console.log(props.location);

    useEffect(() => {
        let myLatlng = new props.google.maps.LatLng(props.location.lat, props.location.lng);

        let marker_custom = new CustomMarker(
            myLatlng,
            props.map,
            {},
        );

        let pos = {
            lat: props.location.lat,
            lng: props.location.lng
        };

        marker_custom.latlng = { lat: pos.lat, lng: pos.lng };
        marker_custom.draw();

        if (map.setCenter(pos) !== null) {
            map.setCenter(pos);
            // console.log(map);

        }
    })


    // })
    // })



    return (
        <div
            ref={customMarke}
        ></div>
    )

}

MarkerCustom.propTypes = {
    google: PropTypes.object,
    map: PropTypes.object,
    location: PropTypes.object,
    element: PropTypes.string
}

export default MarkerCustom;