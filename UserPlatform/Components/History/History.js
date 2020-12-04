import React, { Component } from 'react';
import {Text, Card,Button, PricingCard, } from 'react-native-elements';
import { View,Image } from 'react-native';
import axios from "axios";
import store from '../../store.js';
import Swal from "sweetalert2";

export default class History extends Component {
    constructor(props) {
        super(props);
        this.state = {
            history: []
        }
this.showTicket= this.showTicket.bind(this);
    }
    componentDidMount() {
        const data = store.getState()
        axios.post("http://localhost:5000/purchase/history", {numberPhone: data.auth.phone})
            .then((res) => {
                this.setState({ history: res.data });
            })
            .catch((err) => {
                throw err;
            });
    }

    toggleOverlay() {
        this.setState({ visible: !this.state.visible });
    };
    showTicket(img,date){
        Swal.fire({
            title: `Purchased: ${date}`,
            text: 'Screenshoot it please',
            imageUrl: img,
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: 'Custom image',
          })
    }
    render() {
        return (
            <View>
                {this.state.history.map(purchase => {
                    return (
                        <View key={purchase.id} style={{height: '500'}}
                        
                        >
                            
                            <Card style={{height: '500'}}
                            >
                                <Card.Title style={{textAlign: "center", fontSize: 20, fontWeight: 'bold'}}>Purchase</Card.Title>
                                <Card.Divider />
                                <Card.Image source={{ uri: purchase.code }} itemStyle={{widht: '500', height: '500' }} 
                                onPress={()=>{this.showTicket(purchase.code,purchase.date)}}
                                />
                                <Text style={{textAlign: "center", fontSize: 20, fontWeight: 'bold'}}>{purchase.date}</Text>
                                <Text style={{textAlign: "center", fontSize: 20, fontWeight: 'bold'}}>{purchase.ammount} DT</Text>
                            </Card>
                            
                        </View>
                    )
                })}
            </View>
        );
    }
};
