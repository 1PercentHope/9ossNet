import React, { Component } from "react";
import { Button, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Header } from "react-native-elements";
import { ListItem, Avatar, Accessory } from "react-native-elements";
import History from "../History/History";
import Axios from "axios";
import store from "../../store.js";
import Uploadimage from "../Uploadimage/Uploadimage";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        firstName: "",
        lastName: "",
        img: "",
      },
      slide: false,
      hist: true,
      phone: "",
      imageUp: "",
      image: ''
    };
    this.goCloudy = this.goCloudy.bind(this);
  }
  componentDidMount() {
    const data = store.getState();
    console.log(data.auth);
    if (data.auth.token !== null) {
      Axios.post("http://localhost:5000/users/getuser", {
        phone: data.auth.phone,
      }).then((user) => {
        this.setState({
          user: {
            firstName: user.data[0].firstName,
            lastName: user.data[0].lastName,
            img: user.data[0].profileImage,
          },
        });
      });
    } else {
      window.location.reload(true);
    }
  }
  showProfile() {
    this.setState({ slide: !this.state.slide });
    if (this.state.hist === false) {
      this.setState({ hist: true });
    }
  }
  getHistory() {
    this.setState({ hist: !this.state.hist });
  }
  logOut() {
    Axios.delete("http://localhost:5000/users/signout");
    window.localStorage.removeItem("token");
    window.location.reload(true);
  }
 async goCloudy(e) {
      console.log(e.target.files)
    const file = e.target.files[0];
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "angular_cloudinary");
    data.append("cloud_name", "codexmaker");
    // sending the image to cloudinary
   await Axios.post(
      "https://api.cloudinary.com/v1_1/codexmaker/image/upload",
      this.state.image
    ).then((res) => {
      console.log(res.data.url);
      this.setState({ image: res.data.url });
      // sending th image and saving it to the database
    });
  }
  render() {
    const { user } = this.state;

    return (
      <View>
        <View>
          <Avatar
            onPress={() => {
              this.showProfile(), this.props.toggle();
            }}
            size="medium"
            rounded
            source={{
              uri: this.state.user.img
            }}>
            <Accessory style={{height: 15, width:15}}/>
          </Avatar>
          <View style={{backgroundColor: 'grey', height: 1, width: '100%', opacity: 0.3}}></View>
          {this.state.hist && this.state.slide && (
            <View>
              <ListItem bottomDivider>
                <Icon />
                <ListItem.Content>
                  <ListItem.Title> {user.firstName}</ListItem.Title>
                </ListItem.Content>
              </ListItem>
              <ListItem bottomDivider>
                <Icon />
                <ListItem.Content>
                  <ListItem.Title> {user.lastName}</ListItem.Title>
                </ListItem.Content>
              </ListItem>
              <ListItem bottomDivider>
                <Icon />
                <ListItem.Content>
                  <ListItem.Title> Mkachakh</ListItem.Title>
                </ListItem.Content>
              </ListItem>
              <ListItem
                bottomDivider
                onPress={() => {
                  this.getHistory();
                }}
              >
                <Icon />
                <ListItem.Content>
                  <ListItem.Title> History</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem>
              <ListItem bottomDivider>
                {/* <Icon name="home" /> */}
                <ListItem.Content>
                  {/* <ListItem.Title>Update profile image</ListItem.Title> */}
                  <Uploadimage imageChange={(img)=>{this.setState({image: img})}}/>
                </ListItem.Content>
                <ListItem.Chevron bottomDivider />
              </ListItem>
              <ListItem
                bottomDivider
                onPress={() => {
                  this.logOut();
                }}
              >
                {/* <Icon name="key" /> */}
                <ListItem.Content>
                  <ListItem.Title>Logout</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem>
            </View>
          )}
         
        </View>
      </View>
    );
  }
}
