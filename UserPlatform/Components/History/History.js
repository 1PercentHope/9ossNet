import React, { Component } from 'react';
import { Button, PricingCard } from 'react-native-elements';
import { View } from 'react-native';
import axios from "axios";

export default class History extends Component {
    constructor(props) {
        super(props);
        this.state = {
            history : [
                {id: 1, price: '17 DT', date: '21/04/2020'},
                {id: 2, price: '100 DT', date: '15/04/2020'},
                {id: 3, price: '10 DT', date: '07/04/2020'}
            ]
        }

    }
    componentDidMount() {
        axios
          .post("http://localhost:5000/purchase/history")
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
    render() {
        return (
            <View>
                {this.state.history.map(purchase => {
                    return (
                        <View key={purchase.id}>
                            <PricingCard
                                color="#4f9deb"
                                title="Purchased"
                                price={purchase.price}
                                info={[purchase.date]}
                            />
                        </View>
                    )
                })}
            </View>
        );
    }
};
