import React, { Component } from "react";
import { Button, Image, View } from "react-native";
import { Icon, Header, Avatar } from "react-native-elements";
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
      view: false,
      word: ''
    };
    this.search = this.search.bind(this)
    this.filter = this.filter.bind(this)
    this.searchDone = this.searchDone.bind(this)
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
  search(){
    this.setState({view: !this.state.view})
  }
  filter(e){
    this.setState({word : e.target.value})

  }
  searchDone(){
   const filt = this.state.events.filter(event=>{
      return ( event.homeTeam === this.state.word || event.homeTeam === this.state.word )
    })
    this.setState({view: !this.state.view, events: filt})
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
          centerComponent={
            <MaterialIcons name="search" size={30} color="white" style={{position:'relative', left:120}}
            onPress={this.search}
            />
          }       
          rightComponent={
            <Ionicons name={this.state.account} size={30} color="white" onPress={() => this.props.navigation.navigate(route)} />
          }
        ></Header> }
       {this.state.view && <View style={{height: 40}}>
          <input type='text' placeholder="Search" onChange={this.filter} style={{height:40, width:320, top:10}}/>
          <MaterialIcons onPress={this.searchDone} name="youtube-searched-for" size={24} color="black" style={{position: 'relative', left:350, top: -20,height:30}}/>
        </View> }
        <Events word={this.state.word}/>
      </View>
    );
  }
}
