import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';

import ConnectApiMaps, { Map } from 'maps-google-react';

import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import LocalTaxiIcon from '@material-ui/icons/LocalTaxi';
import { withRouter } from 'react-router-dom'

import { StyleBaseLine } from '../../../../components/StyleBaseLine';
import ModelExitShare from './components/ModelExitShare'
// import { CustomMarker } from '../../../../components/CustomMarker';
// import { AutocompleteDirectionsHandler } from '../../../../components/AutocompleteDirectionsHandler';

import { get } from '../../../../RESTful_API'
import ChatSlide from '../ChatSlide';
import MemberTypeIconStatus from '../MemberModalTypeIconStatus';
import CallTaxiModal from '../CallTaxiModal';
import SearchBar from '../SearchBar';
import SearchMap from '../SearchMap';
import MenuSlide from '../MenuSlide';


const OwnerStatus = (props) => {
    const [share, setShare] = useState(null);
    const [map, setMap] = useState(null);
    const [openChatSlide, setOpenChatSlide] = useState(false);
    const [openCallTaxi, setOpenCallTaxi] = useState(false)
    const [openMenuSlide, setOpenMenuSlide] = useState(false)
    const [openModelExitShare, setOpenModelExitShare] = useState(false)




    const onChatSlide = () => {
        setOpenChatSlide(true)
    }

    const offChatSlide = () => {
        setOpenChatSlide(false)
    }

    const onCallTaxi = () => {
        setOpenCallTaxi(true)
    }

    const offCallTaxi = () => {
        setOpenCallTaxi(false)
    }

    const onMenuSlide = () => {
        setOpenMenuSlide(true)
    }

    const offMenuSlide = () => {
        setOpenMenuSlide(false)
    }

    const startShareGroup = () => {
        props.history.push('doc_taxi')
    }

    const exitShareGroup = () => {
        setOpenModelExitShare(true)
    }

    const offModelExitShare = () => {
        setOpenModelExitShare(false)

    }



    const latlng = {
        lat: 14.012107100000001,
        lng: 100.7210703
    }

    const { classes } = props;

    return (
        <Fragment>
            <StyleBaseLine>
                <Map
                    google={props.google}
                    mapOptions={
                        {
                            zoom: 15,
                            center: { lat: latlng.lat, lng: latlng.lat },
                            disableDefaultUI: true,
                            styles: [{
                                featureType: 'poi.business',
                                stylers: [{ visibility: 'on' }]
                            },
                            {
                                featureType: 'transit',
                                elementType: 'labels.icon',
                                stylers: [{ visibility: 'off' }]
                            }]
                        }}
                    opts={(google, map) => {
                        const me = this
                        get.share.id(props.status.owner.uid).then((data) => {
                            setShare(data)
                        })

                        get.users.profile(props.status.owner.uid).then(function (profile) {

                            function CustomMarker(latlng, map, args, img) {
                                this.latlng = latlng;
                                this.args = args;
                                this.img = img;
                                this.maps = map
                                setMap(map)
                                // this.google = google
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

                            function AutocompleteDirectionsHandler(google, map, data) {
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


                            get.users.location(props.status.owner.uid).then((location) => {
                                let myLatlng = new google.maps.LatLng(location.coords.latitude, location.coords.longitude);

                                let marker1 = new CustomMarker(
                                    myLatlng,
                                    map,
                                    {},
                                    profile.photoURL
                                );

                                let pos = {
                                    lat: location.coords.latitude,
                                    lng: location.coords.longitude
                                };

                                marker1.latlng = { lat: pos.lat, lng: pos.lng };
                                marker1.draw();

                                map.setCenter(pos);

                            })

                            get.share.location(props.status.owner.share_id).then(function (data) {
                                new AutocompleteDirectionsHandler(google, map, data);
                            })
                        })
                    }}
                >
                    <SearchBar >
                        <SearchMap
                            onClick={onMenuSlide}
                            map={map}
                            {...props}

                        />
                    </SearchBar>

                    <MemberTypeIconStatus share={share} {...props} />

                    <Grid container style={{
                        width: 'min-content',
                        position: 'absolute',
                        right: '15px',
                        bottom: '80px',

                    }} >
                        <Fab size="medium" onClick={onCallTaxi} aria-label="add" className={classes.buttonTaxi}>
                            <LocalTaxiIcon />
                        </Fab>
                        <Fab size="medium" onClick={onChatSlide} color="secondary" aria-label="add" className={classes.buttonChat}>
                            <QuestionAnswerIcon />
                        </Fab>
                        <CallTaxiModal
                            uid={props.status.uid}
                            open={openCallTaxi}
                            onClose={offCallTaxi} />
                    </Grid>
                    {props.status.alert.value !== "true"
                        ? (<Fragment>
                            <Grid container style={{
                                width: 'min-content',
                                position: 'absolute',
                                left: '15px',
                                bottom: '80px',

                            }} >
                                <Fab size="medium" onClick={exitShareGroup} aria-label="exit-share" className={classes.buttonExitShare}>
                                    <MeetingRoomIcon />
                                </Fab>
                            </Grid>
                            <Button variant="contained" onClick={startShareGroup} style={{ backgroundColor: '#ffffff' }} className={classes.fab}>
                                เริ่มการเดินทาง
                        </Button>
                        </Fragment>)
                        : (<Fragment>
                            <Button variant="contained" onClick={exitShareGroup} style={{ backgroundColor: '#ffffff' }} className={classes.fab}>
                                สิ้นสุดการเดินทาง
                        </Button>
                        </Fragment>)}
                    <ModelExitShare
                        uid={props.uid}
                        share_id={props.status.owner.uid}
                        share={share}
                        open={openModelExitShare}
                        onClose={offModelExitShare} />
                </Map>
                <ChatSlide open={openChatSlide} onClose={offChatSlide} {...props} />
                <MenuSlide open={openMenuSlide} onClose={offMenuSlide} uid={props.uid} />
            </StyleBaseLine>
        </Fragment>
    )
}


const styles = {
    fab: {
        height: '45px',
        bottom: '16px',
        width: '-webkit-fill-available',
        position: 'absolute',
        marginLeft: '22px',
        marginRight: '22px',
        borderRadius: 12
    },
    buttonTaxi: {
        margin: '5px',
        color: '#6d6d6d',
        backgroundColor: '#ffd91b',
    },
    buttonChat: {
        margin: '5px',
        color: '#6d6d6d',
        backgroundColor: '#ffffff',
    }
}

OwnerStatus.propTypes = {
    status: PropTypes.object
}

export default ConnectApiMaps({
    apiKey: "AIzaSyBy2VY1e11qs-60Ul6aYT5klWYRI1K3RB0",
    libraries: ['places', 'geometry'],
})(withStyles(styles)(withRouter(OwnerStatus)))