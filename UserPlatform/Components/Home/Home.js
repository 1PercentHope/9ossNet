
import React, { Component } from "react";
import { Text, View, Image, StyleSheet, Picker } from "react-native";
import { Button, Card, ListItem, Icon, Header } from "react-native-elements";

import Events from "../Events/Events.js";
import SignIn from '../SignIn/SignIn';


export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: 'Log in',
      route: 'SignIn'
    }
  }
  componentDidMount(){
    if(window.localStorage.getItem('token') === null){
      this.setState({account: 'Log in', route: 'SignIn'})
    }else{
      this.setState({account: 'account', route: 'User'})
    }
  }
  render() {
    const {route} = this.state
    return (
      <View>
        <Header
          leftComponent={<Button title='Home'
          onPress={() =>
            this.props.navigation.navigate('Home')
          }
          ></Button>}
          centerComponent={{ text: "9ossNet", style: { color: "#fff" } }}
          rightComponent={<Button title={this.state.account}
            onPress={() =>
              this.props.navigation.navigate(route)
            }
          ></Button>}
        ></Header>
        <Events />
      </View>

    );
  }
}
