import React, { Component } from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input, Card, Button } from "react-native-elements";
import Swal from 'sweetalert2';
import Axios from 'axios'
export default class Purchase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersData: [],
      numberPhone: "",
      password: "",
    };

    this.Onlogin = this.Onlogin.bind(this);
  }


  Onlogin() {
    const { event, side , seatNumber, numberPhone} = this.props;
    Axios.post("http://localhost:5000/purchase/pay", {
      price: "10",
      seatNumber: seatNumber,
      eventid: event,
      type: side,
      numberPhone: numberPhone,
    }).then((res) => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your Qr Code",
        showConfirmButton: true,
        html: "<img src='" + res.data.src + "' style='width:200px;'>",
        content: true,
        preConfirm: ()=>{
        }
      });
      this.setState({toggle: !this.state.toggle})
    });
  }
  render() {
    return (
      <View>
        <Card>
          <Input
            placeholder="Email"
            leftIcon={<Icon name="user" size={24} color="black" />}
            onChange={(e) => {
              this.setState({ Phone: e.target.value });
            }}
          />
          <Input
            placeholder="Password"
            secureTextEntry={true}
            leftIcon={<Icon name="lock" size={24} color="black" />}
            onChange={(e) => {
              this.setState({ Password: e.target.value });
              console.log(this.state.Password);
            }}
          />
          <Button title="Paypal"
            buttonStyle={{
              borderRadius: 0,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0,
              backgroundColor: "blue",
              shadowRadius: 10
            }}
            onPress={this.Onlogin} />
        </Card>
      </View>
    );
  }
}
