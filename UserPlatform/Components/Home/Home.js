import React, { Component } from "react";
import { View } from "react-native";
import { Icon, Header } from "react-native-elements";
import Events from "../Events/Events.js";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: "lock",
      route: "SignIn",
    };
  }
  componentDidMount() {
    if (window.localStorage.getItem("token") === null) {
      this.setState({ account: "lock", route: "SignIn" });
    } else {
      this.setState({ account: "lock", route: "User" });
    }
  }
  render() {
    const { route } = this.state;
    return (
      <View>
        <Header
          backgroundImage={require("../../assets/header.jpg")}
          containerStyle={{ height: 60 }}
          leftComponent={
            <Icon
              color="white"
              name="home"
              // title='Home'
              onPress={() => this.props.navigation.navigate("Home")}
            ></Icon>
          }
          // centerComponent={{ text: "9ossNet", style: { color: "#fff" } }}
          rightComponent={
            <Icon
              name={this.state.account}
              color="white"
              onPress={() => this.props.navigation.navigate(route)}
            ></Icon>
          }
        ></Header>
        <Events />
      </View>
    );
  }
}
