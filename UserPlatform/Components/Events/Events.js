import React, { Component, Fragment } from 'react';
import events from "../../dummy data/events.js";
import { Text, View, Image, StyleSheet, Picker } from "react-native";
import { Button, Card, ListItem, Icon, Header } from "react-native-elements";
import Overlay from 'react-native-modal-overlay';

export default class Events extends Component {
    constructor(props) {
        super(props);
        this.state = {
            games: "allgames",
            events: events,
            filterevents: events,
            modalVisible: true,
            toggle: true
        }
        this.filterByCategory = this.filterByCategory.bind(this);
        this.pikerHandler = this.pikerHandler.bind(this);
        this.filterByPlace = this.filterByPlace.bind(this);
        this.pikerHandler2 = this.pikerHandler2.bind(this);
        this.book = this.book.bind(this);
        this.hideModal = this.hideModal.bind(this)
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
            this.setState({ filterevents: events });
        } else {
            const eventsFiltredByCategoryI = this.state.events.filter(
                (event) => event.category === category
            );
            this.setState({ filterevents: eventsFiltredByCategoryI });
        }
    }
    filterByPlace(place) {
        if (place === "all") {
            this.setState({ filterevents: events });
        } else {
            const eventsFiltredByPlace = this.state.events.filter(
                (event) => event.place === place
            );
            this.setState({ filterevents: eventsFiltredByPlace });
        }
    }
    onClose = () => this.setState({ modalVisible: false });
    book() {
        this.setState({ toggle: !this.state.toggle })
    }
    hideModal() {
        this.setState({ toggle: !this.state.toggle })
    }
    render() {
        const eventsD = this.state.filterevents.map((event, key) => (
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
                {this.state.toggle && <View> <Picker onValueChange={this.pikerHandler}>
                    <Picker.Item label="All Categories" value="0"></Picker.Item>
                    <Picker.Item label="League 1" value="8000"></Picker.Item>
                    <Picker.Item label="Cup" value="7000"></Picker.Item>
                </Picker>
                    <Picker onValueChange={this.pikerHandler2}>
                        <Picker.Item label="All stadiums" value="0"></Picker.Item>
                        <Picker.Item label="stade Tayeb Mhiri" value="a"></Picker.Item>
                        <Picker.Item label="stade Rades" value="b"></Picker.Item>
                    </Picker>
                    {eventsD} </View>}
                {/* Payment/Log in Pop Up */}
                {!this.state.toggle && <Overlay visible={this.state.modalVisible} onClose={this.onClose} closeOnTouchOutside
                    animationType="zoomIn" containerStyle={{ backgroundColor: 'rgba(220, 220, 220, 0.78)' }}
                    childrenWrapperStyle={{ backgroundColor: '#fff' }}
                    animationDuration={500}
                    style={{ width: '90%', height: '50vh', marginLeft: '5%', top: '20vh' }}>
                    <Fragment>
                        <Text>Disclaimer:</Text>
                        <Text>Please log in for some security reasons</Text>
                        <Text onPress={this.hideModal}>Close</Text>
                    </Fragment>
                </Overlay>}
            </View>
        );
    }
};
