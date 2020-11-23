import Axios from "axios";
import React, { Component } from "react";
import { View, Text } from "react-native";
import { Input, Card, Button, TextInput } from "react-native-elements";
import Table from 'react-native-simple-table'
import Swal from 'sweetalert2';
import store from '../../store.js'



export default class Seats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      side: this.props.side,
      seatNumber: '',
      seatsData: [
      ],
    };
  }
  async componentDidMount(){
   await Axios.get('http://localhost:5000/seats')
    .then(seats=>{
      const stadSeat = this.props.side
      console.log(stadSeat)
      const Seats = seats.data.filter(seat=>{return seat.type === stadSeat })
      this.setState({seatsData: Seats})
      console.log(seats.data)
    })
  }
  purchase(seat){
    this.setState({seatNumber: seat})
    const data = store.getState()
    const {event, side} = this.props
    Axios.post('http://localhost:5000/purchase/pay',{price: '10',seatNumber: seat,eventid: event, type: side , numberPhone: data.auth.phone})
    .then(res=>{
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your Qr Code',
        showConfirmButton: true,
        html: "<img src='" + res.data.src + "' style='width:150px;'>",
        content:true,
      });
    })
  }
  render() {
    const seatsButt = this.state.seatsData.map((seat) => (
      <Button key={seat.Number} title={seat.Number} onPress={()=>{this.purchase(seat.Number)}}></Button>
    ));
    return (
      <View style={{flex: 1, flexDirection: 'row',flexWrap: 'wrap',position: 'realtive',
      justifyContent: 'center',
      alignItems: 'center',margin:'25%',padding:5,borderWidth: 4,
      borderTopLeftRadius: 18,
      borderTopRightRadius: 18,}}>
      {seatsButt}
      </View>
    );
  }
}
