import React, { Component } from "react";
import { View, Text } from "react-native";
import { Input, Card, Button, TextInput } from "react-native-elements";
import Table from 'react-native-simple-table'


export default class Seats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seatsData: [
        { N: "01" },
        { N: "02" },
        { N: "03" },
        { N: "04" },
        { N: "05" },
        { N: "06" },
        { N: "07" },
        { N: "08" },
        { N: "09" },
        { N: "10" },
        { N: "11" },
        { N: "12" },
        { N: "13" },
        { N: "14" },
        { N: "15" },
        { N: "16" },
        { N: "17" },
        { N: "18" },
        { N: "19" },
        { N: "20" },
      ],
    };
  }
  purchase(seat){
    console.log(seat)
  }
  render() {
    const seatsButt = this.state.seatsData.map((seat) => (
      <Button key={seat.N} title={seat.N} onPress={()=>{this.purchase(seat.N)}}></Button>
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
