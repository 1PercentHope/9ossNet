import React, { Component } from 'react';
import { View } from 'react-native';
import Profile from '../Profile/Profile.js';
import Events from '../Events/Events.js'



export default class Purchase extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const { user } = this.state

        return (
            <View>
               hello
            </View>
        )
    }
}