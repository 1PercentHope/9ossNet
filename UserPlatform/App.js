import "react-native-gesture-handler";
import React from "react";
<<<<<<< HEAD
import { View } from "react-native";
import Home from "./Components/Home/Home.js";
import SignIn from "./Components/SignIn/SignIn.js";
import SignUp from "./Components/SignUp/SignUp.js";
import User from "./Components/User/User.js";
import Profile from "./Components/Profile/Profile.js";
import Seats from "./Components/Seats/Seats.js";
import History from './Components/History/History.js';
import Purchase from './Components/Purchase/Purchase.js';
=======
import Home from "./components/Home/Home.js";
import SignIn from "./components/SignIn/SignIn.js";
import SignUp from "./components/SignUp/SignUp.js";
import User from "./components/User/User.js";
import Profile from "./components/Profile/Profile.js";
import Seats from "./components/Seats/Seats.js";
import History from "./components/History/History.js";
import Purchase from "./components/Purchase/Purchase.js";

>>>>>>> b9b490af47db5940076b47b6c606fafc76572f0f
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";
import store from "./store.js";
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="User" component={User} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Seats" component={Seats} />
          <Stack.Screen name="History" component={History} />
          <Stack.Screen name="Purchase" component={Purchase} />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}
