import React, { Component } from "react";
import { View, Text } from "react-native";
import { Input, Card, Button, TextInput } from "react-native-elements";
import Table from 'react-native-simple-table'


export default class Seats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seatsData: [
        { N: "1" },
        { N: "2" },
        { N: "3" },
        { N: "4" },
        { N: "5" },
        { N: "6" },
        { N: "7" },
        { N: "8" },
        { N: "9" },
        { N: "10" },
      ],
    };
  }

  render() {
    const seatsButt = this.state.seatsData.map((seat) => (
      <Button title={seat.N}></Button>
    ));
    return (
      <View>
      {seatsButt}
      </View>
    );
  }
}
