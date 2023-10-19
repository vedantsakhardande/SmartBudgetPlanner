import { StyleSheet, View } from 'react-native';
import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Login from "./screens/Login";
import Dashboard from "./screens/Dashboard";
import { NativeBaseProvider, Image, Center, Text } from "native-base";
import AddExpense from './screens/AddExpense';

const Router = createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: () => ({
        title: `.`,
        headerLeft: () => (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={require("./assets/images/logo.png")}
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              marginLeft: 5,
            }}
            alt=""
          />
          <Text fontWeight="bold" fontSize="lg" color="blue.900" style={{ marginLeft: 5 }}> Smart Budget Planner</Text>
          </View>
        ),
        headerLayoutPreset: "center",
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: "##ffffff",
        },
        headerTintColor: "#ffffff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }),
    },
    Dashboard: {
      screen: Dashboard,
      navigationOptions: () => ({
        title: `.`,
        headerLeft: () => (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={require("./assets/images/logo.png")}
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              marginLeft: 5,
            }}
            alt=""
          />
          <Text fontWeight="bold" fontSize="lg" color="blue.900" style={{ marginLeft: 5 }}> Smart Budget Planner</Text>
          </View>
        ),
        headerLayoutPreset: "center",
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: "##ffffff",
        },
        headerTintColor: "#ffffff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }),
    },
    AddExpense: {
      screen: AddExpense,
      navigationOptions: () => ({
        title: `.`,
        headerLeft: () => (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={require("./assets/images/logo.png")}
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              marginLeft: 5,
            }}
            alt=""
          />
          <Text fontWeight="bold" fontSize="lg" color="blue.900" style={{ marginLeft: 5 }}> Smart Budget Planner</Text>
          </View>
        ),
        headerLayoutPreset: "center",
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: "##ffffff",
        },
        headerTintColor: "#ffffff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }),
    },
  },
  {
    initialRouteName: "Login",
  }
);

const AppContainer = createAppContainer(Router);


export default function App() {

  return (
    <NativeBaseProvider>
      <AppContainer
        ref={(nav) => {
          this.navigator = nav;
        }}
      />
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#fff",
    // alignItems: 'center',
    // justifyContent: 'center'
  },
  logout: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  mb15: {
    flexDirection: "row",
    justifyContent: "center",
    fontFamily: "Open-Sans-Bold",
  },
});
