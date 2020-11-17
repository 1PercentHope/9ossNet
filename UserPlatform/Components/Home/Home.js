import React, { Component } from "react";
import { Text, View, Image, StyleSheet, Picker } from "react-native";
import { Button, Card, ListItem, Icon } from "react-native-elements";
import events from "../../dummy data/events.js";

// const styles = StyleSheet.create({
//   eventFrame: {
//     resizeMode: "cover",
//     height: 100,
//     width: 200,
//   },
//   eventDiv: {
//     backgroundColor: "black",
//     alignItems: "center",
//   },
//   innerText: {
//     color: "white",
//     fontWeight: "bold",
//     fontFamily: "Times New Roman",
//   },
// });
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      games: "allgames",
      events: events,
      filterevents: events,
    };
    this.filterByCategory = this.filterByCategory.bind(this);
    this.pikerHandler = this.pikerHandler.bind(this);
  }

  pikerHandler(item, index) {
    console.log(item);
    switch (item) {
      case "8000":
        this.filterByCategory("champions league");

        break;
      case "7000":
        this.filterByCategory("international");
        break;
      default:
        this.filterByCategory("all");
    }
  }

  filterByCategory(category) {
    if (category === "all") {
      this.setState({ filterevents: events });
    } else {
      const eventsFiltredByCategoryI = this.state.events.filter(
        (event) => event.category === category
      );
      this.setState({ filterevents: eventsFiltredByCategoryI });
    }
  }

  render() {
    const eventsD = this.state.filterevents.map((event, key) => (
      <View  key={key} className="eventDiv">
        <Card>
          <Card.Title>League 1</Card.Title>
          <Card.Divider />
          <Card.Image source={{uri: event.image}} />
          <Text>{event.homeTeam} VS {event.awayTeam}</Text>
          <Text>{event.place}</Text>
          <Text>{event.date}</Text>
          <Text>{event.description}</Text>
          <Text>{event.category}</Text>
          <Text>{event.price}</Text>
          <Button
            icon={<Icon name='ionicon' color='#ffffff' />}
            buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
            title='GET TICKET' />
        </Card>
      </View>
    ));
    return (
      <View>
        <Picker onValueChange={this.pikerHandler}>
          <Picker.Item label="All Category" value="0"></Picker.Item>
          <Picker.Item label="champions league" value="8000"></Picker.Item>
          <Picker.Item label="international" value="7000"></Picker.Item>
        </Picker>
        {eventsD}
      </View>
    );
  }
}
