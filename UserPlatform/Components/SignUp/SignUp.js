import React, { Component } from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Card, Button } from 'react-native-elements';



export default class SignUn extends Component {
    constructor(props) {
        super(props);
    }

    render() {


        return (
            <View>
                <Card>
                    <Input
                        placeholder='Firstname'
                        leftIcon={
                            <Icon
                                name='user'
                                size={24}
                                color='black'
                            />
                        }
                    />
                    <Input
                        placeholder='Lastname'
                        leftIcon={
                            <Icon
                                name='user'
                                size={24}
                                color='black'
                            />
                        }
                    />
                    <Input
                        placeholder='Phone number'
                        leftIcon={
                            <Icon
                                name='phone'
                                size={24}
                                color='black'
                            />
                        }
                    />
                    <Input
                        placeholder='Password'
                        leftIcon={
                            <Icon
                                name='lock'
                                size={24}
                                color='black'
                            />
                        }
                    />
                    <Input
                        placeholder='Email'
                        leftIcon={
                            <Icon
                                name='info'
                                size={24}
                                color='black'
                            />
                        }
                    />
                    <Button
                        title="Sign Up"
                    />
                </Card>
            </View>
        )
    }
}