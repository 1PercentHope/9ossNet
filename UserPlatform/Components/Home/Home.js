
import React, { Component } from "react";
import { Text, View, Image, StyleSheet, Picker } from "react-native";
import { Button, Card, ListItem, Icon, Header } from "react-native-elements";

import Events from "../Events/Events.js";
import SignIn from '../SignIn/SignIn';


export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render() {
    return (
      <View>
        <Header
          leftComponent={<Button title='Home'
          onPress={() =>
            this.props.navigation.navigate('Home')
          }
          ></Button>}
          centerComponent={{ text: "9ossNet", style: { color: "#fff" } }}
          rightComponent={<Button title='LogIn'
            onPress={() =>
              this.props.navigation.navigate('SignIn')
            }
          ></Button>}
        ></Header>
        <Events />
      </View>

    );
  }
}
