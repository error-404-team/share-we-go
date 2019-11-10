import React, { Fragment } from 'react';
import UserStatus from './components/UserStatus';
import MemberStatus from './components/MemberStatus';
import OwnerStatus from './components/OwnerStatus';
import firebase from '../../connect/firebase';
import { get } from '../../RESTful_API';

class Private extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            status: null,
            auth: null
        }
        const me = this

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                me.updateAuth(user)
                setInterval(() => {
                    get.status.id(this.state.auth.uid).then(function (data) {
                        me.updateStatus(data)
                    })
                }, 3000)
            }
        }
        )
    }

    updateAuth(data) {
        this.setState({ auth: data })
    }

    updateStatus(data) {

        this.setState({ status: data })
    }

    render() {
        return (
            <Fragment>
                {this.state.status !== null
                    ? (<Fragment>
                        {this.state.status.owner.value !== "false"
                            ? <OwnerStatus uid={this.state.auth.uid} {...this.state} />
                            : (<Fragment>
                                {this.state.status.member.value !== "false"
                                    ? <MemberStatus uid={this.state.auth.uid} {...this.state} />
                                    : <UserStatus uid={this.state.auth.uid} {...this.state} />
                                }
                            </Fragment>)
                        }
                    </Fragment>)
                    : (<Fragment></Fragment>)
                }
            </Fragment>
        )
    }
}

export default Private;