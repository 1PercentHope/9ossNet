import { connect } from "react-redux";
import React, { Component } from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input, Card, Button } from "react-native-elements";
import Swal from 'sweetalert2';
import { login } from "../../actions/auth";
import store from '../../store.js'
class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersData: [],
      numberPhone: "",
      password: "",
    };

    this.Onlogin = this.Onlogin.bind(this);
    this.navigateTOSignUp=this.navigateTOSignUp.bind(this);
  }


  Onlogin() {
    this.props.login(this.state.Phone, this.state.Password)
    setTimeout(() => {
      const data = store.getState()
      if (data.auth.token) {
        this.props.navigation.navigate("User");
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Wrong Phonenumber OR Password',
          text: `Try again`,
        });
        console.log("wrong phonenumber or password try again")
      }
    }, 500)


  }
  navigateTOSignUp(){
    this.props.navigation.navigate("SignUp");
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
            secureTextEntry={true}
            leftIcon={<Icon name="lock" size={24} color="black" />}
            onChange={(e) => {
              this.setState({ Password: e.target.value });
            }}
          />
          <Button title="Log in"
            buttonStyle={{
              borderRadius: 0,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0,
              backgroundColor: "#085720",
              shadowRadius: 10
            }}
            onPress={this.Onlogin} />
          <Text>
            Or{" "}
            <Text onPress={this.navigateTOSignUp}>
              register <Text style={{borderBottomColor: 'green', borderBottomWidth: 1}}>here</Text>
            </Text>{" "}
          </Text>
        </Card>
      </View>
    );
  }
}
const mapStatetoProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStatetoProps, { login })(SignIn);