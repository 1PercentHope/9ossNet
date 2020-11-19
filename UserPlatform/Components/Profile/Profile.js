import React, { Component } from 'react';
import { Button, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Header } from 'react-native-elements';
import { ListItem, Avatar } from 'react-native-elements';
import History from '../History/History'
import Home from '../Home/Home'


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
                    <Avatar onPress={() => { this.showProfile() }} size="large" rounded source={{uri:'https://www.aero-mag.com/wp-content/uploads/2019/07/AMJuly19News-ametek1-e1563205327354-1024x1024.jpg'}} />
                    {this.state.hist && this.state.slide && <View>
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
                        </ListItem>
                <Button title='Logout'
                
                ></Button>
                <Button title='Delete account'></Button>
                        </View>}
                </View>
                {!this.state.hist && <History />}

            </View>
        )
    }
}