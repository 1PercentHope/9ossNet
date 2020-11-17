import React, { Component } from 'react';
import { Button, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Header } from 'react-native-elements';
import { ListItem, Avatar } from 'react-native-elements';
import History from '../History/History'



export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                firstName: 'Skander',
                lastName: 'Ben Romdhan',
                img: 'url'
            },
            slide: false,
            hist: true
        }
    }
    showProfile() {
        this.setState({ slide: !this.state.slide })
    }
    getHistory() {
        this.setState({ hist: !this.state.hist })
    }
    render() {
        const { user } = this.state

        return (
            <View>
                <View>
                    <Header
                        centerComponent={{ text: '9ossNet', style: { color: '#fff' } }}
                        rightComponent={{ icon: 'menu', color: '#fff' }}
                    >
                        <Button onPress={() => { this.showProfile() }}>
                            <Icon name='user'
                                size={24}
                                color='White' /></Button>
                    </Header>

                    {this.state.hist && this.state.slide && <View><Avatar title={user.firstName} />
                        <ListItem bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title>{user.firstName}</ListItem.Title>
                            </ListItem.Content>
                        </ListItem>
                        <ListItem bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title>{user.lastName}</ListItem.Title>
                            </ListItem.Content>
                        </ListItem>
                        <ListItem bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title>Mkachakh</ListItem.Title>
                            </ListItem.Content>
                        </ListItem>
                        <ListItem bottomDivider onPress={() => { this.getHistory() }}>
                            <Icon name="key" />
                            <ListItem.Content>
                                <ListItem.Title>History</ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Chevron />
                        </ListItem></View>}
                </View> 
                {!this.state.hist && <History/>}

            </View>
        )
    }
}