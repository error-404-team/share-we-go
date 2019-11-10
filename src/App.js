import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { routerPublic, routerPrivate } from './router';
import Loading from './pages/loading';
import firebase from './connect/firebase';
// import Private from './pages/private';
// import Login from './pages/login'
import { post, get } from './RESTful_API';
import { dateTime } from './module';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      auth: false,
    }

    // const me = this

    firebase.auth().onAuthStateChanged((user) => {
      this.onAuth(user)
    });

    if (this.state.auth !== null) {
      get.status.member(this.state.auth.uid).then(function (data) {
        console.log(data);
        // me.setState({ status: { member: data } })
        // this.updateStatusMember(data)
      });
    }
  }

  componentDidMount() {

    // บล็อกการ zoom
    document.firstElementChild.style.zoom = "reset";



    // กำหนดเวลาโชว์การเปิดตัว
    setTimeout(() => {
      this.setState({ loading: false })
    }, 3000)


  }

  onAuth(user) {
    if (user) {
      // console.log(user);
      this.setState({ auth: true })
      post.users.user(user.uid, user, dateTime)

      if (navigator.geolocation) {
        navigator.geolocation.watchPosition(function (position) {
          post.users.location(user.uid, position, dateTime)
          console.log(position);
        }, function () {
          // handleLocationError(true, infoWindow, map.getCenter());
        });
      }
    }
  }


  render() {

    const { auth, loading } = this.state;

    return (
      <React.Fragment>
        <Router>
          {loading == true
            ? (<React.Fragment><Loading /></React.Fragment>)
            : (<React.Fragment>
              {auth === false
                ? (<React.Fragment>{
                  routerPublic.map((route, index) => (
                    <Route
                      key={index}
                      path={route.path}
                      exact={route.exact}
                      component={route.page}
                    />
                  ))
                }</React.Fragment>)
                : (<React.Fragment>{routerPrivate.map((route, index) => (
                  <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    component={route.page}
                  />
                ))}</React.Fragment>)
              }
            </React.Fragment>)
          }
        </Router>
      </React.Fragment>
    )
  }
}


export default App;