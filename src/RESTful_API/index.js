import React from 'react';
// import os from 'os';

require('es6-promise').polyfill();
require('isomorphic-fetch');

export const post = {
    users: {
        user: function (id, data, date) {

            fetch(`http://localhost:5000/share-we-go-project/us-central1/api/users/${id}/user`, {
                mode: 'no-cors',
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            fetch(`http://localhost:5000/share-we-go-project/us-central1/api/users/${id}/_log/user`, {
                mode: 'no-cors',
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user: data,
                    date: date
                })
            });

        },
        location: function (id, data, date) {

            let data_location = {
                coords: {
                    accuracy: data.coords.accuracy,
                    altitude: data.coords.altitude,
                    altitudeAccuracy: data.coords.altitudeAccuracy,
                    heading: data.coords.heading,
                    latitude: data.coords.latitude,
                    longitude: data.coords.longitude,
                    speed: data.coords.speed,
                },
                timestamp: data.timestamp
            }

            fetch(`http://localhost:5000/share-we-go-project/us-central1/api/users/${id}/location`, {
                mode: 'no-cors',
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data_location)
            });

            fetch(`http://localhost:5000/share-we-go-project/us-central1/api/users/${id}/_log/location`, {
                mode: 'no-cors',
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    location: data_location,
                    date: date
                })
            });

        },
        profile: function (id, data, date) {

            fetch(`http://localhost:5000/share-we-go-project/us-central1/api/users/${id}/profile`, {
                mode: 'no-cors',
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            fetch(`http://localhost:5000/share-we-go-project/us-central1/api/users/${id}/_log/profile`, {
                mode: 'no-cors',
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    profile: data,
                    date: date
                })
            });

        }
    },
    share: {
        location: function (id, data, date) {
            fetch(`http://localhost:5000/share-we-go-project/us-central1/api/share/${id}/location`, {
                mode: 'no-cors',
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            fetch(`http://localhost:5000/share-we-go-project/us-central1/api/share/${id}/_log/location`, {
                mode: 'no-cors',
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    location: data,
                    date: date
                })
            });
        },
        date: function (id, data, date) {
            fetch(`http://localhost:5000/share-we-go-project/us-central1/api/share/${id}/date`, {
                mode: 'no-cors',
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            fetch(`http://localhost:5000/share-we-go-project/us-central1/api/share/${id}/_log/date`, {
                mode: 'no-cors',
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    data: data,
                    date: date
                })
            });
        },
        max_number: function (id, data, date) {
            fetch(`http://localhost:5000/share-we-go-project/us-central1/api/share/${id}/max_number`, {
                mode: 'no-cors',
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            fetch(`http://localhost:5000/share-we-go-project/us-central1/api/share/${id}/_log/max_number`, {
                mode: 'no-cors',
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    max_number: data,
                    date: date
                })
            });
        },
        sex: function (id, data, date) {
            fetch(`http://localhost:5000/share-we-go-project/us-central1/api/share/${id}/sex`, {
                mode: 'no-cors',
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            fetch(`http://localhost:5000/share-we-go-project/us-central1/api/share/${id}/_log/sex`, {
                mode: 'no-cors',
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    sex: data,
                    date: date
                })
            });
        },
        owner: function (id, data, date) {
            fetch(`http://localhost:5000/share-we-go-project/us-central1/api/share/${id}/owner`, {
                mode: 'no-cors',
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            fetch(`http://localhost:5000/share-we-go-project/us-central1/api/share/${id}/_log/owner`, {
                mode: 'no-cors',
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    owner: data,
                    date: date
                })
            });
        },
        member: function (id, data, date) {
            fetch(`http://localhost:5000/share-we-go-project/us-central1/api/share/${id}/member`, {
                mode: 'no-cors',
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            fetch(`http://localhost:5000/share-we-go-project/us-central1/api/share/${id}/_log/member`, {
                mode: 'no-cors',
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    member: data,
                    date: date
                })
            });
        },
        alert: function (id, data, date) {
            fetch(`http://localhost:5000/share-we-go-project/us-central1/api/share/${id}/alert`, {
                mode: 'no-cors',
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            fetch(`http://localhost:5000/share-we-go-project/us-central1/api/share/${id}/_log/alert`, {
                mode: 'no-cors',
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    alert: data,
                    date: date
                })
            });
        },
        chat: function (id, data, date) {
            fetch(`http://localhost:5000/share-we-go-project/us-central1/api/share/${id}/chat`, {
                mode: 'no-cors',
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            fetch(`http://localhost:5000/share-we-go-project/us-central1/api/share/${id}/_log/chat`, {
                mode: 'no-cors',
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat: data,
                    date: date
                })
            });
        }
    },
    status: {
        process: function (id, data, date) {
            fetch(`http://localhost:5000/share-we-go-project/us-central1/api/status/${id}/process`, {
                mode: 'no-cors',
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            fetch(`http://localhost:5000/share-we-go-project/us-central1/api/status/${id}/_log/process`, {
                mode: 'no-cors',
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    process: data,
                    date: date
                })
            });
        },
        share: function (id, data, date) {
            fetch(`http://localhost:5000/share-we-go-project/us-central1/api/status/${id}/share`, {
                mode: 'no-cors',
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            fetch(`http://localhost:5000/share-we-go-project/us-central1/api/status/${id}/_log/share`, {
                mode: 'no-cors',
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    share: data,
                    date: date
                })
            });
        },
        owner: function (id, data, date) {
            fetch(`http://localhost:5000/share-we-go-project/us-central1/api/status/${id}/owner`, {
                mode: 'no-cors',
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            fetch(`http://localhost:5000/share-we-go-project/us-central1/api/status/${id}/_log/owner`, {
                mode: 'no-cors',
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    owner: data,
                    date: date
                })
            });
        },
        member: function (id, data, date) {
            fetch(`http://localhost:5000/share-we-go-project/us-central1/api/status/${id}/member`, {
                mode: 'no-cors',
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            fetch(`http://localhost:5000/share-we-go-project/us-central1/api/status/${id}/_log/member`, {
                mode: 'no-cors',
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    member: data,
                    date: date
                })
            });
        },
        alert: function (id, data, date) {
            fetch(`http://localhost:5000/share-we-go-project/us-central1/api/status/${id}/alert`, {
                mode: 'no-cors',
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            fetch(`http://localhost:5000/share-we-go-project/us-central1/api/status/${id}/_log/alert`, {
                mode: 'no-cors',
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    alert: data,
                    date: date
                })
            });
        }
    },
    history: {
        id: function (id, data, date) {
            fetch(`http://localhost:5000/share-we-go-project/us-central1/api/history/${id}`, {
                mode: 'no-cors',
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            // fetch(`http://localhost:5000/share-we-go-project/us-central1/api/history/${id}/_log`, {
            //     mode: 'no-cors',
            //     method: 'post',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({
            //         history: data,
            //         date: date
            //     })
            // });

            fetch(`http://localhost:5000/share-we-go-project/us-central1/api/status/${id}/owner`, {
                mode: 'no-cors',
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    share_id: "",
                    uid: id,
                    value: "false"
                })
            });

            fetch(`http://localhost:5000/share-we-go-project/us-central1/api/status/${id}/member`, {
                mode: 'no-cors',
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    share_id: "",
                    uid: id,
                    value: "false"
                })
            });

            fetch(`http://localhost:5000/share-we-go-project/us-central1/api/status/${id}/_log/owner`, {
                mode: 'no-cors',
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    owner: {
                        share_id: "",
                        uid: id,
                        value: "false"
                    },
                    date: date
                })
            });

            fetch(`http://localhost:5000/share-we-go-project/us-central1/api/status/${id}/_log/member`, {
                mode: 'no-cors',
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    owner: {
                        share_id: "",
                        uid: id,
                        value: "false"
                    },
                    date: date
                })
            });

            fetch(`http://localhost:5000/share-we-go-project/us-central1/api/share/${id}/member`, {
                method: 'delete',
                headers: { 'Content-Type': 'application/json' },
            });

            // window.location.reload();

        }
    },
    report: {
        id: function (id, data, date) {
            fetch(`http://localhost:5000/share-we-go-project/us-central1/api/report/${id}`, {
                mode: 'no-cors',
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            fetch(`http://localhost:5000/share-we-go-project/us-central1/api/report/${id}/_log`, {
                mode: 'no-cors',
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    report: data,
                    date: date
                })
            });
        }
    }
}

export const get = {
    users: {
        all: function (id) {

            return fetch(`http://localhost:5000/share-we-go-project/us-central1/api/users/${id}/all`).then(
                function (res) {
                    return res.json();
                }
            )
        },
        id: function (id) {

            return fetch(`http://localhost:5000/share-we-go-project/us-central1/api/users/${id}`).then(
                function (res) {
                    return res.json();
                }
            )
        },
        profile: function (id) {

            return fetch(`http://localhost:5000/share-we-go-project/us-central1/api/users/${id}/profile`).then(
                function (res) {
                    return res.json();
                }
            )
        },
        location: function (id) {

            return fetch(`http://localhost:5000/share-we-go-project/us-central1/api/users/${id}/location`).then(
                function (res) {
                    return res.json();
                }
            )
        },
        user: function (id) {

            return fetch(`http://localhost:5000/share-we-go-project/us-central1/api/users/${id}/user`).then(
                function (res) {
                    return res.json();
                }
            )
        },
        log: {
            profile: function (id) {

                return fetch(`http://localhost:5000/share-we-go-project/us-central1/api/users/${id}/_log/profile`).then(
                    function (res) {
                        return res.json();
                    }
                )
            },
            location: function (id) {

                return fetch(`http://localhost:5000/share-we-go-project/us-central1/api/users/${id}/_log/location`).then(
                    function (res) {
                        return res.json();
                    }
                )
            },
            user: function (id) {

                return fetch(`http://localhost:5000/share-we-go-project/us-central1/api/users/${id}/_log/user`).then(
                    function (res) {
                        return res.json();
                    }
                )
            }
        }
    },
    share: {
        all: function (id) {

            return fetch(`http://localhost:5000/share-we-go-project/us-central1/api/share/all`).then(
                function (res) {
                    return res.json();
                }
            )
        },
        id: function (id) {

            return fetch(`http://localhost:5000/share-we-go-project/us-central1/api/share/${id}`).then(
                function (res) {
                    return res.json();
                }
            )
        },
        location: function (id) {

            return fetch(`http://localhost:5000/share-we-go-project/us-central1/api/share/${id}/location`).then(
                function (res) {
                    return res.json();
                }
            )
        },
        date: function (id) {

            return fetch(`http://localhost:5000/share-we-go-project/us-central1/api/share/${id}/date`).then(
                function (res) {
                    return res.json();
                }
            )
        },
        max_number: function (id) {

            return fetch(`http://localhost:5000/share-we-go-project/us-central1/api/share/${id}/max_number`).then(
                function (res) {
                    return res.json();
                }
            )
        },
        sex: function (id) {

            return fetch(`http://localhost:5000/share-we-go-project/us-central1/api/share/${id}/sex`).then(
                function (res) {
                    return res.json();
                }
            )
        },
        owner: function (id) {

            return fetch(`http://localhost:5000/share-we-go-project/us-central1/api/share/${id}/owner`).then(
                function (res) {
                    return res.json();
                }
            )
        },
        member: function (id) {

            return fetch(`http://localhost:5000/share-we-go-project/us-central1/api/share/${id}/member`).then(
                function (res) {
                    return res.json();
                }
            )
        },
        alert: function (id) {

            return fetch(`http://localhost:5000/share-we-go-project/us-central1/api/share/${id}/alert`).then(
                function (res) {
                    return res.json();
                }
            )
        },
        chat: function (id) {

            return fetch(`http://localhost:5000/share-we-go-project/us-central1/api/share/${id}/chat`).then(
                function (res) {
                    return res.json();
                }
            )
        },
        log: {
            location: function (id) {

                return fetch(`http://localhost:5000/share-we-go-project/us-central1/api/share/${id}/location`).then(
                    function (res) {
                        return res.json();
                    }
                )
            },
            date: function (id) {

                return fetch(`http://localhost:5000/share-we-go-project/us-central1/api/share/${id}/date`).then(
                    function (res) {
                        return res.json();
                    }
                )
            },
            max_number: function (id) {

                return fetch(`http://localhost:5000/share-we-go-project/us-central1/api/share/${id}/max_number`).then(
                    function (res) {
                        return res.json();
                    }
                )
            },
            sex: function (id) {

                return fetch(`http://localhost:5000/share-we-go-project/us-central1/api/share/${id}/_log/sex`).then(
                    function (res) {
                        return res.json();
                    }
                )
            },
            owner: function (id) {

                return fetch(`http://localhost:5000/share-we-go-project/us-central1/api/share/${id}/_log/owner`).then(
                    function (res) {
                        return res.json();
                    }
                )
            },
            member: function (id) {

                return fetch(`http://localhost:5000/share-we-go-project/us-central1/api/share/${id}/_log/member`).then(
                    function (res) {
                        return res.json();
                    }
                )
            },
            chat: function (id) {

                return fetch(`http://localhost:5000/share-we-go-project/us-central1/api/share/${id}/_log/chat`).then(
                    function (res) {
                        return res.json();
                    }
                )
            }
        }
    },
    status: {
        all: function () {

            return fetch(`http://localhost:5000/share-we-go-project/us-central1/api/status/all`).then(
                function (res) {
                    return res.json();
                }
            )
        },
        id: function (id) {

            return fetch(`http://localhost:5000/share-we-go-project/us-central1/api/status/${id}`).then(
                function (res) {
                    return res.json();
                }
            )
        },
        process: function (id) {

            return fetch(`http://localhost:5000/share-we-go-project/us-central1/api/status/${id}/process`).then(
                function (res) {
                    return res.json();
                }
            )
        },
        share: function (id) {

            return fetch(`http://localhost:5000/share-we-go-project/us-central1/api/status/${id}/share`).then(
                function (res) {

                    return res.json();
                }
            )
        },
        owner: function (id) {

            return fetch(`http://localhost:5000/share-we-go-project/us-central1/api/status/${id}/owner`).then(
                function (res) {
                    return res.json();
                }
            )
        },
        member: function (id) {

            return fetch(`http://localhost:5000/share-we-go-project/us-central1/api/status/${id}/member`).then(
                function (res) {
                    return res.json();
                }
            )
        },
        alert: function (id) {

            return fetch(`http://localhost:5000/share-we-go-project/us-central1/api/status/${id}/alert`).then(
                function (res) {
                    return res.json();
                }
            )
        },
        log: {
            process: function (id) {

                return fetch(`http://localhost:5000/share-we-go-project/us-central1/api/status/${id}/_log/process`).then(
                    function (res) {
                        return res.json();
                    }
                )
            },
            share: function (id) {

                return fetch(`http://localhost:5000/share-we-go-project/us-central1/api/status/${id}/_log/share`).then(
                    function (res) {
                        return res.json();
                    }
                )
            },
            owner: function (id) {

                return fetch(`http://localhost:5000/share-we-go-project/us-central1/api/status/${id}/_log/owner`).then(
                    function (res) {
                        return res.json();
                    }
                )
            },
            member: function (id) {

                return fetch(`http://localhost:5000/share-we-go-project/us-central1/api/status/${id}/_log/member`).then(
                    function (res) {
                        return res.json();
                    }
                )
            },
            alert: function (id) {

                return fetch(`http://localhost:5000/share-we-go-project/us-central1/api/status/${id}/_log/alert`).then(
                    function (res) {
                        return res.json();
                    }
                )
            }
        }
    },
    history: {
        id: function (id) {

            return fetch(`http://localhost:5000/share-we-go-project/us-central1/api/history/${id}`).then(
                function (res) {
                    return res.json();
                }
            )
        },
    }
}

export const d = {
    share: {
        id: function (id, uid, date) {
            fetch(`http://localhost:5000/share-we-go-project/us-central1/api/share/${id}/member`, {
                method: 'delete',
                headers: { 'Content-Type': 'application/json' },
            });

            fetch(`http://localhost:5000/share-we-go-project/us-central1/api/status/${uid}/member`, {
                mode: 'no-cors',
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    share_id: "",
                    uid: id,
                    value: "false"
                })
            });

            fetch(`http://localhost:5000/share-we-go-project/us-central1/api/status/${uid}/owner`, {
                mode: 'no-cors',
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    share_id: "",
                    uid: id,
                    value: "false"
                })
            });

            fetch(`http://localhost:5000/share-we-go-project/us-central1/api/status/${uid}/_log/owner`, {
                mode: 'no-cors',
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    owner: {
                        share_id: "",
                        uid: id,
                        value: "false"
                    },
                    date: date
                })
            });

            fetch(`http://localhost:5000/share-we-go-project/us-central1/api/status/${uid}/_log/member`, {
                mode: 'no-cors',
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    owner: {
                        share_id: "",
                        uid: id,
                        value: "false"
                    },
                    date: date
                })
            });

            // window.location.reload();

        },
        member: function (id, uid, date) {
            fetch(`http://localhost:5000/share-we-go-project/us-central1/api/share/${id}/member/${uid}`, {
                method: 'delete',
                headers: { 'Content-Type': 'application/json' },
            });

            fetch(`http://localhost:5000/share-we-go-project/us-central1/api/status/${uid}/member`, {
                mode: 'no-cors',
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    share_id: "",
                    uid: id,
                    value: "false"
                })
            });

            fetch(`http://localhost:5000/share-we-go-project/us-central1/api/status/${uid}/owner`, {
                mode: 'no-cors',
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    share_id: "",
                    uid: id,
                    value: "false"
                })
            });

            fetch(`http://localhost:5000/share-we-go-project/us-central1/api/status/${uid}/_log/owner`, {
                mode: 'no-cors',
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    owner: {
                        share_id: "",
                        uid: id,
                        value: "false"
                    },
                    date: date
                })
            });

            fetch(`http://localhost:5000/share-we-go-project/us-central1/api/status/${uid}/_log/member`, {
                mode: 'no-cors',
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    owner: {
                        share_id: "",
                        uid: id,
                        value: "false"
                    },
                    date: date
                })
            });

            // window.location.reload();

        },
    }
}

