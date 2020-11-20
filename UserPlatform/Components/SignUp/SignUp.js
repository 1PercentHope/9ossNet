import React, { Component } from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Card, Button } from 'react-native-elements';
import Swal from 'sweetalert2';
import { connect } from "react-redux";

export default class SignUn extends Component {
    constructor(props) {
        super(props);
        this.state={
            data:[{email:'ali@rbk.com',Phonenumber:'22029477'}],
            Phone:'',
            email:'',
            firstName:'',
            lastName:'',
            password:'',


        };

        this.onSignUp=this.onSignUp.bind(this);
    }
    onSignUp(){
       if(this.state.Phone === this.state.data[0].Phonenumber||this.state.email===this.state.data[0].email){
        Swal.fire({
            icon: 'error',
            title: 'Phonenumber OR Email already existant',
            text: `Try Another Please`,
          });
           console.log('already exisisting')
       } else{
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Welcome to 9ossNet',
            showConfirmButton: false,
            timer: 1500,
          });
          console.log('Welcome new user') 
        this.props.navigation.navigate('User') }
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
                        onChange={(e)=>{this.setState({Phone:e.target.value})}}
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
                        onChange={(e)=>{this.setState({email:e.target.value})}}
                    />
                    <Button
                        title="Sign Up"
                        onPress={this.onSignUp}
                    />
                </Card>
            </View>
        )
    }
}