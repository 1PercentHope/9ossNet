import React, { Component } from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input, Card, Button, TextInput } from "react-native-elements";

export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersData: [{ Phonenumber: "22029477", Password: "123456" }],
      Phone: "",
      Password: "",
    };
    this.Onlogin = this.Onlogin.bind(this);
  }
  Onlogin() {
    console.log(this.state.Phone, this.state.Password);

    if (
      this.state.Phone === this.state.usersData[0].Phonenumber &&
      this.state.Password === this.state.usersData[0].Password
    ) {
      this.props.navigation.navigate("User");
    } else if (
      this.state.Phone !== this.state.usersData[0].Phonenumber ||
      this.state.Password !== this.state.usersData[0].Password
    ) {
      console.log("wrong phonenumber or password try again");
    }
  }
  render() {
    return (
      <View>
        <Card>
          <Input
            placeholder="Phone number"
            leftIcon={<Icon name="user" size={24} color="black" />}
            onChange={(e) => {
              this.setState({ Phone: e.target.value });
            }}
          />
          <Input
            placeholder="Password"
            leftIcon={<Icon name="lock" size={24} color="black" />}
            onChange={(e) => {
              this.setState({ Password: e.target.value });
              console.log(this.state.Password);
            }}
          />
          <Button title="Log in" onPress={this.Onlogin} />
          <Text>
            Or{" "}
            <Text onPress={() => this.props.navigation.navigate("SignUp")}>
              register here
            </Text>{" "}
          </Text>
        </Card>
      </View>
    );
  }
}
