import React, { Component } from 'react';
import { useWindowDimensions, View } from 'react-native';
import Profile from '../Profile/Profile.js';
import Events from '../Events/Events.js'
import store from "../../store.js";
import Axios from 'axios'


export default class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                firstName: 'Skander',
                lastName: 'Ben Romdhan',
                img: 'url'
            },
            show: true,
            update: false
        }
    }
  async  componentDidMount() {
        const data = store.getState();
        if ((data.auth.token !== null) && (window.localStorage.phone)) {
          Axios.post("http://localhost:5000/users/getuser", {
            phone: window.localStorage.phone,
          },{headers:{token: data.auth.token}}).then((user) => {
            this.setState({
              user: {
                firstName: user.data[0].firstName,
                lastName: user.data[0].lastName,
                img: user.data[0].profileImage,
              },
            });
          });
        } else {
          window.localStorage.removeItem('token')
          window.location.reload(true);
        }
      }

    render() {
        const { user } = this.state

        return (
            <View>
                <Profile toggle={(e)=>{this.setState({show: ! this.state.show})}} appenUpdate={()=>{this.setState({update: !this.state.update})}}/>
              {this.state.show && !this.state.update && <Events events={this.props.events}/> }  
            </View>
        )
    }
}