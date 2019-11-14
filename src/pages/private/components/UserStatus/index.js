import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';

import { Link } from 'react-router-dom';

import ConnectApiMaps, { Map } from 'maps-google-react';
import $ from 'jquery';

import Button from '@material-ui/core/Button';

import AddIcon from '@material-ui/icons/Add';

import { StyleBaseLine } from '../../../../components/StyleBaseLine';

import { get, post } from '../../../../RESTful_API'
import { VisibilityButton } from '../../../../components/VisibilityButton';
import { dateTime } from '../../../../module';
import SearchBar from '../SearchBar';
import SearchMap from '../SearchMap';
import MenuSlide from '../MenuSlide';

import './styles/marker-custom.css';


const UserStatus = (props) => {


    const [share, setShare] = useState(null)
    const [users, setUsers] = useState(null)
    const [map, setMap] = useState(null)
    const [openVisibility, setOpenVisibility] = useState(false)
    const [openCreateShare, setOpenCreateShare] = useState(false)
    const [openMenuSlide, setOpenMenuSlide] = useState(false)


    const updateDataShareClient = (key) => {

        get.share.id(key).then(function (data) {
            setShare(data)
        })

        // get.share.location(key).then(function (location) {
        //     me.setState({ share: { [key]: { location_share: location } } })
        // })

        // get.share.date(key).then(function (date) {
        //     me.setState({ share: { [key]: { date_share: date } } })
        // })

        // get.share.max_number(key).then(function (max_number) {
        //     me.setState({ share: { [key]: { max_number_share: max_number } } })
        // })

        // get.share.sex(key).then(function (sex) {
        //     me.setState({ share: { [key]: { sex_share: sex } } })
        // })

        // get.share.member(key).then(function (member) {
        //     me.setState({ share: { [key]: { member_share: member } } })
        // })

    }

    const updateUser = (data) => {
        setUsers(data)
    }


    const joinLocation = (key, uid, data) => {
        post.share.member(key, {
            [uid]: {
                uid: `${uid}`,
                share_id: `${key}`,
                profile: data
            }
        },
            dateTime
        )

        post.status.share(
            uid,
            {
                id: `${key}`,
                uid: `${uid}`,
                value: "false"
            },
            dateTime
        );

        post.status.owner(
            uid,
            {
                share_id: `${key}`,
                uid: `${uid}`,
                value: "false"
            },
            dateTime
        );

        post.status.member(
            uid,
            {
                share_id: `${key}`,
                uid: `${uid}`,
                value: "true"
            },
            dateTime
        );

        post.status.alert(
            uid,
            {
                share_id: `${key}`,
                uid: `${uid}`,
                value: "false"
            },
            dateTime
        );

        post.status.process(
            uid,
            {
                share_id: `${key}`,
                uid: `${uid}`,
                value: "false"
            },
            dateTime
        );
    }


    const onVisibility = () => {
        setOpenVisibility(true)
    }

    const offVisibility = () => {
        setOpenVisibility(false)
    }

    const onCreateShare = () => {
        setOpenCreateShare(true)
    }

    const offCreateShare = () => {
        setOpenCreateShare(false)
    }

    const onMenuSlide = () => {
        setOpenMenuSlide(true)
    }

    const offMenuSlide = () => {
        setOpenMenuSlide(false)
    }


    const latlng = {
        lat: 14.012107100000001,
        lng: 100.7210703
    }

    // const MapSearch = MapSearch.bind(this)
    // const UserMarker = UserMarker.bind(this)
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

                        function CustomMarker(latlng, map, args, img) {
                            this.latlng = latlng;
                            this.args = args;
                            this.img = img;
                            this.setMap(map);
                            this.maps = map
                            setMap(map)
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
                                let positionA = new google.maps.LatLng(this.latlng.lat, this.latlng.lng);

                                this.pos = this.getProjection().fromLatLngToDivPixel(positionA);
                                // console.log(this.pos);
                                this.div.style.left = this.pos.x + 'px';
                                this.div.style.top = this.pos.y + 'px';
                            }
                        };

                        CustomMarker.prototype.getPosition = function () {
                            return this.latlng;
                        };

                        get.users.id(props.uid).then(function (data) {
                            console.log(data);
                            updateUser(data)

                            var myLatlng = new google.maps.LatLng(data.location.coords.latitude, data.location.coords.longitude);
                            if (data.profile !== undefined) {
                                var marker1 = new CustomMarker(
                                    myLatlng,
                                    map,
                                    {},
                                    data.profile.photoURL
                                );
                            } else {
                                window.location.reload()
                            }

                            var pos = {
                                lat: data.location.coords.latitude,
                                lng: data.location.coords.longitude
                            };

                            marker1.latlng = { lat: pos.lat, lng: pos.lng };
                            marker1.draw();

                            map.setCenter(pos);
                        });

                        // share
                        get.share.all().then(function (data) {
                            Object.keys(data).map((key) => {
                                // console.log(key); // all key
                                get.status.share(key).then(function (status) {
                                    if (status.value !== "false") {
                                        let myLatlng = new google.maps.LatLng(data[key].location.routes[0].legs[0].start_location.lat, data[key].location.routes[0].legs[0].start_location.lng);


                                        const marker = new CustomMarker(
                                            myLatlng,
                                            map,
                                            { marker_id: `${key}` },
                                            "https://img.icons8.com/ios-glyphs/30/000000/car-cleaning.png"
                                        )


                                        var pos = {
                                            lat: data[key].location.routes[0].legs[0].start_location.lat,
                                            lng: data[key].location.routes[0].legs[0].start_location.lng
                                        };

                                        marker.latlng = { lat: pos.lat, lng: pos.lng };

                                        marker.draw();


                                        map.setCenter(pos);

                                        const content = `
                                            <center>
                                            <h2>ข้อมูลการแชร์</h2>
                                            </center>
                                            <hr></hr>
                                            <u style="font-size: 15px">ต้นทาง: </u><u>${data[key].location.routes[0].legs[0].start_address}</u><b></b>
                                            <br></br>
                                            <u style="font-size: 15px">ปลายทาง: </u><u>${data[key].location.routes[0].legs[0].end_address}</u><b></b>
                                            <br></br>
                                            <u style="font-size: 15px">เริ่มแชร์เมื่อ: </u><u>${data[key].date.start_time.value}</<u><b></b>
                                            <br></br>
                                            <u style="font-size: 15px">ปิดแชร์เวลา: </u><u>${data[key].date.end_time.value}</<u><b></b>
                                            <br></br>
                                            <u style="font-size: 15px">ต้องการผู้เดินทางเพิ่ม: </u><u>${Object.keys(data[key].member).length - 1} </<u><b>/ ${data[key].max_number.value} คน </b>
                                            <br></br>
                                            <u style="font-size: 15px">เดินทางกับเพศ: </u><u>${data[key].sex.value}</<u><b> </b>
                                            <hr></hr>
                                            <center><button style="background-color: #ffffff;
                                            font-size: 17px;
                                            width: -webkit-fill-available;
                                            border-radius: 12px;
                                            color: rgba(0, 0, 0, 0.87);
                                            box-shadow: 0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12);
                                            }" id="join-share-${key}" >เข้าร่วม</button></center>`

                                        const infowindow = new google.maps.InfoWindow({
                                            content: '',
                                            maxWidth: 500
                                        });

                                        console.log(data[key]);

                                        const member_length = Object.keys(data[key].member).length
                                        const max_number_value = data[key].max_number.value

                                        marker.addListener('click', function (key) {

                                            infowindow.setContent(content)
                                            infowindow.open(map, marker);


                                            if (member_length > max_number_value) {
                                                $(`#join-share-${key}`).attr("disabled", true)
                                            }

                                        });

                                        $(document).on('click', `#join-share-${key}`, function () {
                                            get.status.member(props.uid).then(function (member_status) {
                                                if (member_status.value !== "true") {
                                                    get.users.profile(props.uid).then(function (profile) {
                                                        joinLocation(key, props.uid, profile)
                                                        // post.share.member(key, { [member_status.uid]: { id: member_status.uid, profile: profile } }, dateTime)

                                                        // post.status.member(
                                                        //     member_status.uid,
                                                        //     {
                                                        //         share_id: key,
                                                        //         uid: member_status.uid,
                                                        //         value: "true"
                                                        //     },
                                                        //     dateTime
                                                        // );

                                                        // post.status.alert(
                                                        //     member_status.uid,
                                                        //     {
                                                        //         share_id: key,
                                                        //         uid: member_status.uid,
                                                        //         value: "false"
                                                        //     },
                                                        //     dateTime
                                                        // );

                                                        // post.status.owner(
                                                        //     member_status.uid,
                                                        //     {
                                                        //         share_id: key,
                                                        //         uid: member_status.uid,
                                                        //         value: "false"
                                                        //     },
                                                        //     dateTime
                                                        // );

                                                        // post.status.process(
                                                        //     member_status.uid,
                                                        //     {
                                                        //         share_id: key,
                                                        //         uid: member_status.uid,
                                                        //         value: "false"
                                                        //     },
                                                        //     dateTime
                                                        // );

                                                        // post.status.share(
                                                        //     member_status.uid,
                                                        //     {
                                                        //         id: key,
                                                        //         uid: member_status.uid,
                                                        //         value: "false"
                                                        //     },
                                                        //     dateTime
                                                        // );
                                                    })
                                                }
                                            })
                                        })

                                    }
                                })
                            })
                        })
                    }}
                >
                    <SearchBar >
                        <SearchMap
                            onClick={onMenuSlide.bind(this)}
                            map={map}
                            {...props}

                        />
                    </SearchBar>
                    <VisibilityButton open={openVisibility} on={onVisibility.bind(this)} off={offVisibility.bind(this)} />
                    <Link to="/share_location">
                        <Button onClick={onCreateShare.bind(this)} variant="contained" style={{ backgroundColor: '#3f51b5' }} className={props.classes.fab}>
                            <p style={{position:'fixed',top:'88%',color:'white'}}>สร้างการแชร์</p>
                        </Button>
                    </Link>
                </Map>
                <MenuSlide open={openMenuSlide} onClose={offMenuSlide.bind(this)} uid={props.uid} />
            </StyleBaseLine>
        </Fragment>
    )

}

UserStatus.propTypes = {
    uid: PropTypes.string
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
    }
}

export default ConnectApiMaps({
    apiKey: "AIzaSyBy2VY1e11qs-60Ul6aYT5klWYRI1K3RB0",
    libraries: ['places', 'geometry'],
})(withStyles(styles)(UserStatus))