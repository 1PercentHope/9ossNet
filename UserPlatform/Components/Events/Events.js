import React, { Component, Fragment } from "react";
import events from "../../dummy data/events.js";
import { Text, View, Image, StyleSheet, Picker, TouchableOpacity } from "react-native";
import { Button, Card, ListItem, Icon } from "react-native-elements";
import Overlay from "react-native-modal-overlay";
import Seats from "../Seats/Seats.js";
import Swal from 'sweetalert2';
import axios from "axios";
import ads from '../../assets/ads.gif'
import { MaterialIcons, Ionicons } from '@expo/vector-icons';


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
      current: '',
      upload: true,
      view: false,
      word: '',
      storedEvents: [],
      price: '',
      color: "green"
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
    this.search = this.search.bind(this);
    this.searchDone = this.searchDone.bind(this);
    this.filter = this.filter.bind(this)


  }
  async componentDidMount() {

    await axios.get("http://localhost:5000/events")
      .then((res) => {
        this.setState({ events: res.data, filterevents: res.data, storedEvents: res.data });
      })
      .catch((err) => {
        throw err;
      });
  }
  async onGradin() {
    await this.setState({ pelouse: !this.state.pelouse, show: !this.state.show, side: 'gradin' });
  }
  async onPelouse() {
    await this.setState({ pelouse: !this.state.pelouse, show: !this.state.show, side: 'pelouse' });
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
    if (category === "all") {
      this.setState({ filterevents: this.state.events });
    } else {
      const eventsFiltredByCategoryI = this.state.events.filter(
        (event) => { return event.category === category }
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
  book(eventid,eventPrice) {
    this.setState({ id: eventid, color: 'white' })
    if (window.localStorage.getItem('token') === null) {
      Swal.fire({
        position: 'top-end',
        icon: 'info',
        title: 'please signin or create an account',
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      this.setState({ toggle: !this.state.toggle, show: !this.state.show, price: eventPrice });
    }
    setTimeout(()=>{
      this.setState({ color: 'green' })
    },1000)

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
  search() {
    this.setState({ view: !this.state.view })
  }
  searchDone() {
    let filt = []
    if(this.state.word.length > 0){
     filt = this.state.filterevents.filter(event => {
      return (event.homeTeam === this.state.word || event.awayTeam === this.state.word)
    })
    this.setState({ view: !this.state.view, filterevents: filt })
  }else if (this.state.word === 'all' || this.state.word.length === 0){
    this.setState({ view: !this.state.view, filterevents: this.state.storedEvents })
  }
    
  }
  filter(e) {
    this.setState({ word: e.target.value })

  }
  render() {
    const eventsD = this.state.filterevents.map((event, key) => (
      <View key={key} className="eventDiv" style={{ height: 270, marginTop: 5 }}>
        <Card.Image source={{ uri: event.image }} style={{ height: 200 }} />
        <Text style={{ textAlign: 'center', fontSize: 18, position: 'relative', left: -61, top: 10 }}>
          {event.homeTeam} vs {event.awayTeam}

        </Text>
        <Text style={{ textAlign: 'center', fontSize: 10, position: "relative", left: -70, top: 10, color: 'grey' }}>{event.date} •</Text>
        <Text style={{ textAlign: 'center', fontSize: 15, marginLeft: 250, position: "relative", top: -20, left: 20, shadowRadius: 1, width: 70, borderRadius: 10, borderWidth: 1 }}>{event.price} DT</Text>
        <Text
          onPress={() => { this.book(event.id, event.price) }}
          style={{
            borderRadius: 0,
            marginLeft: 10,
            marginRight: 0,
            marginBottom: 30,
            shadowRadius: 1,
            borderWidth: 1,
            borderColor: this.state.color,
            width: 70,
            height: 30,
            top: -30,
            zIndex: 10,
            textAlign: 'center',
            position: 'relative',
            top: -40,
          }}>
          Book
            </Text>

      </View>
    ));


    return (
      <View>
        {!this.state.view && <MaterialIcons name="search" size={30} color="black" style={{ position: 'relative', left: 340, width: '100%' }}
          onPress={this.search}
        />}
        {this.state.view && <View style={{ height: 40 }}>
          <input type='text' placeholder="Search" onChange={this.filter} style={{ height: 300, width: 320,position:'relative', top: 7 }} />
          <MaterialIcons onPress={this.searchDone} name="youtube-searched-for" size={30} color="black" style={{ position: 'relative', left: 340, top: -21, height: 30 }} />
        </View>}
        {this.state.toggle && (
          <View>
            <Card.Image source={{ uri: ads }} style={{ height: 100, marginTop: 5, width: "100%" }} />
            {eventsD}
          </View>
        )}
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
              borderColor: 'green'
            }}
          >
            <Fragment>
              <Text onPress={this.onGradin} style={{ width: 80, borderWidth: 1, borderColor: 'green', marginBottom: 2, textAlign: 'center', fontSize: 18, borderRadius: 5 }}>Gradin</Text>
              <Text onPress={this.onPelouse} style={{ width: 80, borderWidth: 1, borderColor: 'green', marginBottom: 2, textAlign: 'center', fontSize: 18, borderRadius: 5 }}>Pelouse</Text>
              <Text onPress={this.hideModal} style={{ position: 'relative', left: 135, top: -75 }}>X</Text>
            </Fragment>
          </Overlay>
        )}
        {!this.state.grad && (
          <Overlay
            visible={this.state.modalVisible}
            onClose={this.onClose}
            closeOnTouchOutside
            animationType="zoomIn"
            containerStyle={{ backgroundColor: "rgba(220, 220, 220, 0.1)" }}
            childrenWrapperStyle={{ backgroundColor: "#fff" }}
            animationDuration={500}
            style={{
              width: "90%",
              height: "50vh",
              marginLeft: "5%",
              top: "20vh",
              borderColor: 'green'
            }}
          >
            <Fragment>
              <Seats />
              <Text onPress={this.hideModal2}>Go back</Text>
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
              borderColor: 'green'
            }}
          >
            <Fragment>
              <Seats event={this.state.id} side={this.state.side} grad={this.state.grad} price={this.state.price}/>
              <Text onPress={this.hideModal3}>Go back</Text>
            </Fragment>
          </Overlay>
        )}
       {!this.state.toggle && <View style={{position:'relative',top: -438, width:"70vw",left:'50%', transform: 'translate(-50%)', zIndex: 100, width: '100vw', backgroundColor: '#f2f2f2', height:'10vh',paddingTop:'5vh'}}>
        <Text style={{textAlign:'center',width: '80vw', position:'relative',left:'50%', transform: 'translate(-50%)', fontSize:15, borderWidth: 1, borderColor: 'black', padding: 10}}>
          Please pick carefully your seat number and it's category, once the operation is done there will be no <Text style={{borderBottomWidth:2, borderBottomColor: 'green'}}>retrieve</Text> .
        </Text>
        <Text style={{width: '80vw', position:'relative',left:'50%', transform: 'translate(-50%)', fontSize:15, position:"relative", top:530, textAlign:'center'}}>Pelouse seats have extra fee of 10 dt</Text>
        </View> }
      </View>
    );
  }
};

const styles = StyleSheet.create({
  picker: { top: 10, alignItems: 'left', justifyContent: "space-around" },
  item: { textAlign: "center" },
  card: { backgroundColor: "white", shadowRadius: 10, borderRadius: 10, width: "80%", alignContent: "center", left: '7%' }
});



