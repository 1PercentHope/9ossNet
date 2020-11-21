import React, { Component } from 'react';
import { Button, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Header } from 'react-native-elements';
import { ListItem, Avatar } from 'react-native-elements';
import History from '../History/History'
import Axios from 'axios';





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
        if(this.state.hist === false){
            this.setState({hist: true})
        }
    }
    getHistory() {
        this.setState({ hist: !this.state.hist })
    }
    logOut(){
        Axios.delete('http://localhost:5000/users/signout')
        window.localStorage.removeItem('token');
        window.location.reload(true)
    }
    render() {
        const { user } = this.state

        return (
            
            <View>
               
                <View>
                    <Avatar onPress={() => { this.showProfile(), this.props.toggle() }} size="large" rounded source={{uri:'https://www.aero-mag.com/wp-content/uploads/2019/07/AMJuly19News-ametek1-e1563205327354-1024x1024.jpg'}} />
                    {this.state.hist && this.state.slide && <View>
                        <ListItem bottomDivider>
                        <Icon />
                            <ListItem.Content>
                                <ListItem.Title>   {user.firstName}</ListItem.Title>
                            </ListItem.Content>
                        </ListItem>
                        <ListItem bottomDivider>
                        <Icon />
                            <ListItem.Content>
                                <ListItem.Title>   {user.lastName}</ListItem.Title>
                            </ListItem.Content>
                        </ListItem>
                        <ListItem bottomDivider>
                        <Icon />
                            <ListItem.Content>
                                <ListItem.Title>   Mkachakh</ListItem.Title>
                            </ListItem.Content>
                        </ListItem>
                        <ListItem bottomDivider onPress={() => { this.getHistory() }}>
                            <Icon />
                            <ListItem.Content>
                                <ListItem.Title>   History</ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Chevron />
                        </ListItem>
                        <ListItem bottomDivider onPress={()=>{this.logOut()}}>
                            <Icon name="key" />
                            <ListItem.Content>
                                <ListItem.Title>Logout</ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Chevron />
                        </ListItem>
                {/* <Button title='Logout'
                    onPress={()=>{this.logOut()}}
                ></Button> */}
                {/* <Button title='Delete account'></Button> */}
                        </View>}
                </View>
                {!this.state.hist && <History />}

            </View>
        )
    }
}