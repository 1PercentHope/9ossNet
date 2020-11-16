import React, { Component } from "react";
import { Text, View, Image, StyleSheet, Picker } from "react-native";
import { Button, ThemeProvider } from "react-native-elements";
import events from "../../dummy data/events.js";

const styles = StyleSheet.create({
  eventFrame: {
    resizeMode: "cover",
    height: 100,
    width: 200,
  },
  eventDiv: {
    backgroundColor: "black",
    alignItems: "center",
  },
  innerText: {
    color: "white",
    fontWeight: "bold",
    fontFamily: "Times New Roman",
  },
});
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
      <View style={styles.eventDiv} key={key} className="eventDiv">
        <Image style={styles.eventFrame} source={event.image} />
        <View>
          <Text style={styles.innerText}>
            {event.homeTeam} VS {event.awayTeam}
          </Text>
          <Text style={styles.innerText}>{event.place}</Text>
          <Text style={styles.innerText}>{event.date}</Text>
          <Text style={styles.innerText}>{event.description}</Text>
          <Text style={styles.innerText}>{event.category}</Text>
          <Text style={styles.innerText}>{event.price}</Text>
          <Button title="9oss"></Button>
        </View>
        {console.log(event.image)}
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
