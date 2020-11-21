import React, { Component, Fragment } from "react";
import events from "../../dummy data/events.js";
import { Text, View, Image, StyleSheet, Picker, TouchableOpacity } from "react-native";
import { Button, Card, ListItem, Icon, Header } from "react-native-elements";
import Overlay from "react-native-modal-overlay";
import Seats from "../Seats/Seats.js";
import Swal from 'sweetalert2';
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
    if(window.localStorage.getItem('token') === null){
      Swal.fire({
        position: 'top-end',
        icon: 'info',
        title: 'please signin or create an account',
        showConfirmButton: false,
        timer: 1500,
      });
    }else{
     this.setState({ toggle: !this.state.toggle, show: !this.state.show });
   }
 
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
      <View key={key} className="eventDiv" >
        <Card containerStyle={styles.card}>
          <Card.Title style={{fontSize:40}}>{event.category}</Card.Title>
          <Card.Divider />
          <Card.Image source={{ uri: event.image }} />
          <Text style={{textAlign: 'center', fontSize:20}}>
            {event.homeTeam} VS {event.awayTeam}
          </Text>
          <Text style={{textAlign: 'center', fontSize:20}}>{event.place}</Text>
          <Text style={{textAlign: 'center', fontSize:20}}>{event.date}</Text>
          <Text style={{textAlign: 'center', fontSize:20}}>{event.description}</Text>
          <Text style={{textAlign: 'center', fontSize:20}}>{event.category}</Text>
          <Text style={{textAlign: 'center', fontSize:20}}>{event.price} DT</Text>
          <Button
            onPress={this.book}
            color="#cce6d4"
            buttonStyle={{
              borderRadius: 0,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0,
              backgroundColor: "#085720",
              shadowRadius: 10
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
            <TouchableOpacity style={styles.picker}>
            <Picker onValueChange={this.pikerHandler} itemStyle={{color: 'blue'}}>
              <Picker.Item label="All Categories" value="0"></Picker.Item>
              <Picker.Item label="League 1" value="8000"></Picker.Item>
              <Picker.Item label="Cup" value="7000"></Picker.Item>
            </Picker>
            <Picker onValueChange={this.pikerHandler2}>
              <Picker.Item label="All stadiums" value="0"></Picker.Item>
              <Picker.Item label="stade Tayeb Mhiri" value="a"></Picker.Item>
              <Picker.Item label="stade Rades" value="b"></Picker.Item>
            </Picker>
            </TouchableOpacity>
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

const styles = StyleSheet.create({
  picker: {top:10,alignItems: 'center', justifyContent: "space-around"},
  item: { textAlign: "center"},
  card: {backgroundColor: "#f1f5ed", shadowRadius: 10, borderRadius:10}
});
