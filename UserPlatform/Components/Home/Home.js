import React, { Component } from "react";
import { View } from "react-native";
import { Header, Avatar } from "react-native-elements";
import Events from "../Events/Events.js";
import logo from '../../assets/signature.png'
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios'

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: "md-lock",
      route: "SignIn",
      events: [],
      word: ''
    };
  }
  async componentDidMount() {
    if (window.localStorage.getItem("token") === null) {
      this.setState({ account: "md-lock", route: "SignIn" });
    } else {
      this.setState({ account: "md-unlock", route: "User" });
    }
    
    await axios.get("http://localhost:5000/events")
      .then((res) => {
        this.setState({ events: res.data});
      })
      .catch((err) => {
        throw err;
      });
  }


  render() {
    const { route } = this.state;
    return (
      <View>
       {!this.state.view && <Header
          backgroundImage={require("../../assets/header.jpg")}
          containerStyle={{ height: 60 }}
          leftComponent={
            <Avatar
            size="large"
            rounded
            source={{
              uri: logo
            }}
            avatarStyle={{
              marginTop: 7
            }}
          />     
          }     
          rightComponent={
            <Ionicons name={this.state.account} size={30} color="white" onPress={() => this.props.navigation.navigate(route)} />
          }
        ></Header> }
        <Events word={this.state.word}/>
      </View>
    );
  };
};
