import React, { Component, Fragment } from "react";
import events from "../../dummy data/events.js";
import { Text, View, Image, StyleSheet, Picker } from "react-native";
import { Button, Card, ListItem, Icon, Header } from "react-native-elements";
import Overlay from "react-native-modal-overlay";
import Seats from "../Seats/Seats.js";
import axios from "axios";

export default class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      games: "allgames",
      events: [],
      filterevents: [],
      modalVisible: true,
      toggle: true,
      grad: true,
      pelouse: true,
      show: true,
    };
    this.filterByCategory = this.filterByCategory.bind(this);
    this.pikerHandler = this.pikerHandler.bind(this);
    this.filterByPlace = this.filterByPlace.bind(this);
    this.pikerHandler2 = this.pikerHandler2.bind(this);
    this.book = this.book.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.onGradin = this.onGradin.bind(this);
    this.onPelouse = this.onPelouse.bind(this);
    this.hideModal2 = this.hideModal2.bind(this);
    this.hideModal3 = this.hideModal3.bind(this);
  }
  componentDidMount() {
    axios
      .get("http://localhost:5000/events")
      .then((res) => {
        this.setState({ events: res.data });
        console.log(res.data,this.state.events)
      })
      .catch((err) => {
        throw err;
      });
  }
  onPelouse() {
    this.setState({ pelouse: !this.state.pelouse, show: !this.state.show });
  }
  onGradin() {
    this.setState({ grad: !this.state.grad, show: !this.state.show });
    console.log(this.state.grad);
  }
  pikerHandler(item, index) {
    console.log(item);
    switch (item) {
      case "8000":
        this.filterByCategory("league 1");
        break;
      case "7000":
        this.filterByCategory("cup");
        break;
      default:
        this.filterByCategory("all");
    }
  }
  pikerHandler2(item1, index) {
    console.log(item1);
    switch (item1) {
      case "a":
        this.filterByPlace("stade Tayeb Mhiri");

        break;
      case "b":
        this.filterByPlace("stade Rades");
        break;

      default:
        this.filterByPlace("all");
    }
  }
  filterByCategory(category) {
    if (category === "all") {
      this.setState({ filterevents: this.state.events });
    } else {
      const eventsFiltredByCategoryI = this.state.events.filter(
        (event) => event.category === category
      );
      this.setState({ filterevents: eventsFiltredByCategoryI });
    }
  }
  filterByPlace(place) {
    if (place === "all") {
      this.setState({ filterevents: this.state.events });
    } else {
      const eventsFiltredByPlace = this.state.events.filter(
        (event) => event.place === place
      );
      this.setState({ filterevents: eventsFiltredByPlace });
    }
  }
  onClose = () => this.setState({ modalVisible: false });
  book() {
    this.setState({ toggle: !this.state.toggle, show: !this.state.show });
    // this.props.navigation.navigate("Seats");
  }
  hideModal() {
    this.setState({ toggle: !this.state.toggle, show: !this.state.show });
  }
  hideModal2() {
    this.setState({ grad: !this.state.grad, show: !this.state.show });
  }
  hideModal3() {
    this.setState({ pelouse: !this.state.pelouse, show: !this.state.show });
  }
  render() {
    const eventsD = this.state.events.map((event, key) => (
      <View key={key} className="eventDiv">
        <Card>
          <Card.Title>{event.category}</Card.Title>
          <Card.Divider />
          <Card.Image source={{ uri: event.image }} />
          <Text>
            {event.homeTeam} VS {event.awayTeam}
          </Text>
          <Text>{event.place}</Text>
          <Text>{event.date}</Text>
          <Text>{event.description}</Text>
          <Text>{event.category}</Text>
          <Text>{event.price}</Text>
          <Button
            onPress={this.book}
            icon={<Icon color="#ffffff" />}
            buttonStyle={{
              borderRadius: 0,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0,
            }}
            title="GET TICKET"
          />
        </Card>
      </View>
    ));

    return (
      <View>
        {this.state.toggle && (
          <View>
            {" "}
            <Picker onValueChange={this.pikerHandler}>
              <Picker.Item label="All Categories" value="0"></Picker.Item>
              <Picker.Item label="League 1" value="8000"></Picker.Item>
              <Picker.Item label="Cup" value="7000"></Picker.Item>
            </Picker>
            <Picker onValueChange={this.pikerHandler2}>
              <Picker.Item label="All stadiums" value="0"></Picker.Item>
              <Picker.Item label="stade Tayeb Mhiri" value="a"></Picker.Item>
              <Picker.Item label="stade Rades" value="b"></Picker.Item>
            </Picker>
            {eventsD}
          </View>
        )}
        {/* Payment/Log in Pop Up */}
        {!this.state.toggle && !this.state.show && (
          <Overlay
            visible={this.state.modalVisible}
            onClose={this.onClose}
            closeOnTouchOutside
            animationType="zoomIn"
            containerStyle={{ backgroundColor: "rgba(220, 220, 220, 0.78)" }}
            childrenWrapperStyle={{ backgroundColor: "#fff" }}
            animationDuration={500}
            style={{
              width: "90%",
              height: "50vh",
              marginLeft: "5%",
              top: "20vh",
            }}
          >
            <Fragment>
              <Button title="gradin" onPress={this.onGradin}></Button>
              <Button title="pelouse" onPress={this.onPelouse}></Button>
              <Text onPress={this.hideModal}>Close</Text>
            </Fragment>
          </Overlay>
        )}
        {!this.state.grad && (
          <Overlay
            visible={this.state.modalVisible}
            onClose={this.onClose}
            closeOnTouchOutside
            animationType="zoomIn"
            containerStyle={{ backgroundColor: "rgba(220, 220, 220, 0.78)" }}
            childrenWrapperStyle={{ backgroundColor: "#fff" }}
            animationDuration={500}
            style={{
              width: "90%",
              height: "50vh",
              marginLeft: "5%",
              top: "20vh",
            }}
          >
            <Fragment>
              <Seats />
              <Text onPress={this.hideModal2}>Close</Text>
            </Fragment>
          </Overlay>
        )}
        {!this.state.pelouse && (
          <Overlay
            visible={this.state.modalVisible}
            onClose={this.onClose}
            closeOnTouchOutside
            animationType="zoomIn"
            containerStyle={{ backgroundColor: "rgba(220, 220, 220, 0.78)" }}
            childrenWrapperStyle={{ backgroundColor: "#fff" }}
            animationDuration={500}
            style={{
              width: "90%",
              height: "50vh",
              marginLeft: "5%",
              top: "20vh",
            }}
          >
            <Fragment>
              <Seats />
              <Text onPress={this.hideModal3}>Close</Text>
            </Fragment>
          </Overlay>
        )}
      </View>
    );
  }
};
