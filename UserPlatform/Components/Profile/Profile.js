import React, { Component } from 'react';
import { Button, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Header } from 'react-native-elements';
import { ListItem, Avatar } from 'react-native-elements';
import History from '../History/History'
import Axios from 'axios';
import store from '../../store.js'
import Uploadimage from '../Uploadimage/Uploadimage'




export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                firstName: '',
                lastName: '',
                img: ''
            },
            slide: false,
            hist: true,
            phone: '',
            imageUp:''
        }
        this.goCloudy=this.goCloudy.bind(this);
    }
    componentDidMount() {
        const data = store.getState()
        console.log(data.auth)
        if (data.auth.token !== null) {
            Axios.post('http://localhost:5000/users/getuser', { phone: data.auth.phone })
                .then(user => {
                    this.setState({
                        user: {
                            firstName: user.data[0].firstName,
                            lastName: user.data[0].lastName,
                            img: user.data[0].profileImage
                        }
                    })
                })
        } else {
            window.location.reload(true)
        }
    }
    showProfile() {
        this.setState({ slide: !this.state.slide })
        if (this.state.hist === false) {
            this.setState({ hist: true })
        }
    }
    getHistory() {
        this.setState({ hist: !this.state.hist })
    }
    logOut() {
        Axios.delete('http://localhost:5000/users/signout')
        window.localStorage.removeItem('token');
        window.location.reload(true)
    }
    goCloudy(){
        this.setState({imageUp:'shown'})
    }
    render() {
        const { user } = this.state

        return (

            <View>

                <View>
                    <Avatar onPress={() => { this.showProfile(), this.props.toggle() }} size="large" rounded source={{ uri: 'data:image/jpeg;base64,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' }} />
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
                        <ListItem bottomDivider onPress={this.goCloudy}> 
                            <Icon name ="home"/>
                            <ListItem.Content >
                                <ListItem.Title >Update profile image</ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Chevron  bottomDivider /></ListItem>
                        <ListItem bottomDivider onPress={() => { this.logOut() }}>
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
                {this.state.imageUp === 'shown' && <Uploadimage/>}
                {!this.state.hist && <History />}

            </View>
        )
    }
}