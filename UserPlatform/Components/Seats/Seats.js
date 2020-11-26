import Axios from "axios";
import React, { Component } from "react";
import { View, Text } from "react-native";
import { Input, Card, Button, TextInput } from "react-native-elements";
import Table from "react-native-simple-table";
import Swal from "sweetalert2";
import store from "../../store.js";
import Purchase from '../Purchase/Purchase.js'

export default class Seats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      side: this.props.side,
      seatNumber: "",
      seatsData: [],
      toggle: true,
      event: '',
      side: '',
      numberPhone: ''
    };
  }
  async componentDidMount() {
    var SeatSide = this.props.side;
    if (SeatSide !== "pelouse") {
      SeatSide = "gradin";
    }
    await Axios.get("http://localhost:5000/seats").then((seats) => {
      const Seats = seats.data.filter((seat) => {
        return seat.type === SeatSide;
      });
      this.setState({ seatsData: Seats });
    });
  }
  purchase(seat) {
    const data = store.getState();
    this.setState({ seatNumber: seat , event: this.props.event, side: this.props.side, numberPhone: data.auth.phone, toggle: !this.state.toggle});
  }
  render() {
    const seatsButt = this.state.seatsData.map((seat) => (
      <Text
      style={{borderWidth:1,borderRadius:20, width: 35, height:35, textAlign: 'center', textAlignVertical: "auto", backgroundColor: seat.availability, margin: 3, color: 'white'}}
        key={seat.Number}
        onPress={() => {
          this.purchase(seat.Number);
        }}
      >{seat.Number}</Text>
    ));
    return (
      <View>
     {this.state.toggle && <View
        style={{
          flex: 1,
          flexDirection: "row",
          flexWrap: "wrap",
          position: "realtive",
          justifyContent: "center",
          alignItems: "center",
          margin: "25%",
          padding: 5,
          borderWidth: 4,
          borderTopLeftRadius: 18,
          borderTopRightRadius: 18,
        }}
      >
        {seatsButt}
      </View> }
      {!this.state.toggle && <Purchase  numberPhone={this.state.numberPhone} side={this.state.side} event={this.state.event} seatNumber={this.state.seatNumber}/> } 
      </View>
    );
  }
}
