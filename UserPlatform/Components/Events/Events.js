import React, { Component, Fragment } from "react";
import events from "../../dummy data/events.js";
import { Text, View, Image, StyleSheet, Picker, TouchableOpacity } from "react-native";
import { Button, Card,ListItem, Icon  } from "react-native-elements";
import Overlay from "react-native-modal-overlay";
import Seats from "../Seats/Seats.js";
import Swal from 'sweetalert2';
import axios from "axios";


export default class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      games: "allgames",
      events: [],
      filterevents: [],
      modalVisible: true,
      toggle: true,
      grad: true,
      pelouse: true,
      show: true,
      side: '',
      intro: [],
      current: ''
    };
    this.filterByCategory = this.filterByCategory.bind(this);
    this.filterByPlace = this.filterByPlace.bind(this);
    this.pikerHandler = this.pikerHandler.bind(this);
    this.pikerHandler2 = this.pikerHandler2.bind(this);
    this.book = this.book.bind(this);
    this.onGradin = this.onGradin.bind(this);
    this.onPelouse = this.onPelouse.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.hideModal2 = this.hideModal2.bind(this);
    this.hideModal3 = this.hideModal3.bind(this);
  }
 async componentDidMount() {

    await axios.get("http://localhost:5000/events")
      .then((res) => {
        this.setState({ events: res.data ,filterevents: res.data});
        console.log(this.state)
      })
      .catch((err) => {
        throw err;
      });
    await axios.get('http://localhost:5000/users/intro')
    .then(res=>{
      this.setState({intro: res.data, current: res.data[0].picture})
      console.log(res.data)
    })
    let i =0;
    setInterval(()=>{
        this.setState({current: this.state.intro[i].picture})
        i++
        if(i === this.state.intro.length){
          i =0
        }
    },2000)
  }
  async onGradin(a) {
    await this.setState({ grad: !this.state.grad, show: !this.state.show, side: a });
   }
  async onPelouse() {
    await this.setState({ pelouse: !this.state.pelouse, show: !this.state.show , side: 'pelouse'});
  }

  pikerHandler(item, index) {
    switch (item) {
      case "8000":
        this.filterByCategory("League1");
        break;
      case "7000":
        this.filterByCategory("Cup");
        break;
      default:
        this.filterByCategory("all");
    }
  }
  pikerHandler2(item1, index) {
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
    console.log(category);
    if (category === "all") {
      this.setState({ filterevents: this.state.events });
    } else {
      const eventsFiltredByCategoryI = this.state.events.filter(
        (event) =>  {return event.category === category}
      );
      this.setState({ filterevents: eventsFiltredByCategoryI });
      console.log(eventsFiltredByCategoryI);
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
  book(eventid) {
    this.setState({id: eventid})
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
    const eventsD = this.state.filterevents.map((event, key) => (
      <View key={key} className="eventDiv"  style={{height: 270, marginTop: 5}}>
          <Card.Image source={{ uri: event.image }} style={{height: 200}}/>
          <Text style={{textAlign: 'center', fontSize:18, position: 'relative', left: -61, top:10}}>
            {event.homeTeam} vs {event.awayTeam}
            
          </Text>
          <Text style={{textAlign: 'center', fontSize:10, position: "relative", left: -70, top: 10, color: 'grey'}}>{event.date} •</Text>
          <Text style={{textAlign: 'center', fontSize:15, marginLeft: 250,position: "relative", top: -20, left:20, shadowRadius:1, width:70, borderRadius:10}}>{event.price} DT</Text>
          <Text
            onPress={()=>{this.book(event.id)}}
            style={{
              borderRadius: 0,
              marginLeft: 10,
              marginRight: 0,
              marginBottom: 30,
              shadowRadius: 1,
              width: 70,
              height:30,
              top: -30,
              zIndex: 10,
              textAlign: 'center',
              position: 'relative',
              top: -40
            }}>
            Book
            </Text>
          
      </View>
    ));

    return (
      <View>
        {this.state.toggle && (
          <View> 
             {/* <TouchableOpacity style={styles.picker}>
             <Picker onValueChange={this.pikerHandler} itemStyle={{backgroundcolor: 'red'}}>
               <Picker.Item label="All Categories" value="0"></Picker.Item>
               <Picker.Item label="League 1" value="8000"></Picker.Item>
               <Picker.Item label="Cup" value="7000"></Picker.Item>
             </Picker>
             <Picker onValueChange={this.pikerHandler2}>
              <Picker.Item label="All stadiums" value="0"></Picker.Item>
               <Picker.Item label="stade Tayeb Mhiri" value="a"></Picker.Item>
               <Picker.Item label="stade Rades" value="b"></Picker.Item>
             </Picker>
            </TouchableOpacity> */}
            <Card.Image source={{ uri: this.state.current }} style={{height: 150, marginTop: 5}}/>
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
              <Button title="gradin" onPress={()=>{this.onGradin('gradin')}}></Button>
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
              <Seats event={this.state.id} side={this.state.side} grad={this.state.grad} />
              <Text onPress={this.hideModal3}>Close</Text>
            </Fragment>
          </Overlay>
        )}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  picker: {top:10,alignItems: 'left', justifyContent: "space-around"},
  item: { textAlign: "center"},
  card: {backgroundColor: "white", shadowRadius: 10, borderRadius:10, width: "80%", alignContent: "center", left: '7%'}
});



