import React, { Component } from 'react';
import { View } from 'react-native';
import Profile from '../Profile/Profile.js';



export default class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                firstName: 'Skander',
                lastName: 'Ben Romdhan',
                img: 'url'
            }
        }
    }

    render() {
        const { user } = this.state

        return (
            <View>
                <Profile />
            </View>
        )
    }
}