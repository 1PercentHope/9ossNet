import Axios from "axios";
import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import { Input, Card, Button, TextInput } from "react-native-elements";
import Table from "react-native-simple-table";
import Swal from "sweetalert2";
import store from "../../store.js";
import Purchase from '../Purchase/Purchase.js'
import seats from '../../assets/Seats.png'

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
      numberPhone: '',
      showSeats: false,
      price: ''
    };
    this.toggleMap = this.toggleMap.bind(this)
  }
  async componentDidMount() {
    var SeatSide = this.props.side;
    await Axios.post("http://localhost:5000/seats/seatid",{matchId: this.props.event, side : this.props.side}).then((seats) => {
      const Seats = seats.data.filter((seat) => {
        return seat.type === SeatSide;
      });
      this.setState({ seatsData: Seats });
    });
  }
  purchase(seat, avail) {
    if (avail === 'red') {
      return
    } else {
      const data = store.getState();
      this.setState({ seatNumber: seat, event: this.props.event, side: this.props.side, numberPhone: data.auth.phone, toggle: !this.state.toggle});
      if(this.props.side === 'pelouse'){
        const newPrice = (Number(this.props.price) + 10) + ''
        console.log(newPrice)
        this.setState({price: newPrice})
      }else{
        this.setState({price: this.props.price})
      }
    }
  }
  toggleMap() {
    this.setState({ showSeats: !this.state.showSeats })
  }
  render() {
    const seatsButt = this.state.seatsData.map((seat) => (
      <Text
        style={{ borderWidth: 1, borderRadius: 20, width: 35, height: 35, textAlign: 'center', textAlignVertical: "auto", backgroundColor: seat.availability, margin: 3, color: 'white' }}
        key={seat.Number}
        onPress={() => {
          this.purchase(seat.Number, seat.availability);
        }}
      >{seat.Number}</Text>
    ));
    return (
      <View>
        {this.state.toggle && !this.state.showSeats && <View
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
        </View>}
        {!this.state.showSeats && this.state.toggle && <Text onPress={this.toggleMap} style={{ position: 'relative', top: -10, borderWidth: 1, borderColor: 'green', textAlign: 'center', marginLeft: 50, marginRight: 50 }}>Seats map</Text>}
        {this.state.showSeats && <Card.Image source={{ uri: seats }} style={{ height: 300, width: 295, marginTop: 5 }} />}
        {!this.state.toggle && <Purchase numberPhone={this.state.numberPhone} side={this.state.side} event={this.state.event} seatNumber={this.state.seatNumber} price={this.state.price}/>}
      </View>
    );
  }
}
