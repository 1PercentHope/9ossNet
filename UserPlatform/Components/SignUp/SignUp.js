import React, { Component } from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Card, Button } from 'react-native-elements';
import Swal from 'sweetalert2';
import { connect } from "react-redux";
import Axios from 'axios';

export default class SignUn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [{ email: 'ali@rbk.com', Phonenumber: '22029477' }],
            Phone: '',
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/1200px-Unknown_person.jpg'


        };

        this.onSignUp = this.onSignUp.bind(this);
    }
    onSignUp() {
        Axios.post('http://localhost:5000/users/verify', { profileImage: this.state.image,firstName: this.state.firstName, phoneNumber: this.state.Phone })
        Swal.fire({
            title: 'Put Your Verification Code Please',
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Verify',
            showLoaderOnConfirm: true,
            preConfirm: (code) => {
                Axios.post('http://localhost:5000/users/signup', {
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    password: this.state.Password,
                    phoneNumber: this.state.Phone,
                    email: this.state.email,
                    code: code,
                    profileImage: this.state.image
                })
                    .then(res => {
                        console.log(res.data)
                        if (res.data.text === 'ok') {
                            window.location.reload(true)
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Your Informations Or Code are not falid',
                                text: `Try again`,
                            });
                        }
                    })
            },
        })
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
                        onChange={(e) => { this.setState({ firstName: e.target.value }) }}
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
                        onChange={(e) => { this.setState({ lastName: e.target.value }) }}
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
                        onChange={(e) => { this.setState({ Phone: e.target.value }) }}
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
                        onChange={(e) => { this.setState({ Password: e.target.value }) }}
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
                        onChange={(e) => { this.setState({ email: e.target.value }) }}
                    />
                    <Button
                        title="Sign Up"
                        onPress={this.onSignUp}
                        buttonStyle={{
                            borderRadius: 0,
                            marginLeft: 0,
                            marginRight: 0,
                            marginBottom: 0,
                            backgroundColor: "#085720",
                            shadowRadius: 10
                        }}
                    />
                </Card>
            </View>
        )
    }
}