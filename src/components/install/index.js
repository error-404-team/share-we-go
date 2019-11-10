import React, { Component } from 'react'
import A2HSProvider from 'a2hs'
import ButtonInstall from './components/ButtonInstall'

class InstallApp extends Component {
    render() {
        return (
            <A2HSProvider>
                <ButtonInstall />
            </A2HSProvider>
            )
    }
}

export default InstallApp;