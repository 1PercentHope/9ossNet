import React, { Component } from 'react';
import {Text, Card,Button, PricingCard } from 'react-native-elements';
import { View } from 'react-native';
import axios from "axios";
import store from '../../store.js'

export default class History extends Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [
                { id: 1, price: '17 DT', date: '21/04/2020' },
                { id: 2, price: '100 DT', date: '15/04/2020' },
                { id: 3, price: '10 DT', date: '07/04/2020' }
            ]
        }

    }
    componentDidMount() {
        const data = store.getState()
    console.log(data)
        axios
            .post("http://localhost:5000/purchase/history")
            .then((res) => {
                this.setState({ history: res.data });
                console.log(this.state.history)
            })
            .catch((err) => {
                throw err;
            });
    }

    toggleOverlay() {
        this.setState({ visible: !this.state.visible });
    };
    render() {
        return (
            <View>
                {this.state.history.map(purchase => {
                    return (
                        <View key={purchase.id}>
                            <Card>
                                <Card.Title >Purchase</Card.Title>
                                <Card.Divider />
                                <Card.Image source={{ uri: purchase.code }} itemStyle={{widht: '20'}} />
                                <Text >{purchase.date}</Text>
                                <Text >{purchase.ammount} DT</Text>
                                {/* <PricingCard
                                color="#4f9deb"
                                title="Purchased"
                                price={purchase.price}
                                info={[purchase.date]}
                            /> */}
                            </Card>
                        </View>
                    )
                })}
            </View>
        );
    }
};
