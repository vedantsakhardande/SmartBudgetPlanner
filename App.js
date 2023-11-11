import { StyleSheet, View } from 'react-native';
import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Login from "./screens/Login";
import Dashboard from "./screens/Dashboard";
import Settings from "./screens/Settings";
import { NativeBaseProvider, Image, Center, Text, Button, HamburgerIcon, Menu, Box, Pressable } from "native-base";
import AddExpense from './screens/AddExpense';
import { clearAccessToken } from './utils/helpers'

const Router = createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: ({ navigation }) => ({
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
    <Menu w="190" trigger={triggerProps => (
      <Pressable accessibilityLabel="More options menu" {...triggerProps}>
        <HamburgerIcon size="10" color="blue.900" style={{ marginLeft: 100, opacity: 1 }} />
      </Pressable>
    )}>
      <Menu.Item onPress={() => navigation.navigate('Settings', {})}>
        Settings
      </Menu.Item>
      <Menu.Item onPress={() => navigation.navigate('Logout')}>
        Logout
      </Menu.Item>
    </Menu>
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
      navigationOptions: ({ navigation }) => ({
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
    <Menu w="190" trigger={triggerProps => (
      <Pressable accessibilityLabel="More options menu" {...triggerProps}>
        <HamburgerIcon size="10" color="blue.900" style={{ marginLeft: 100, opacity: 1 }} />
      </Pressable>
    )}>
      <Menu.Item onPress={() => navigation.navigate('Settings', {})}>
        Settings
      </Menu.Item>
      <Menu.Item onPress={() => navigation.navigate('Logout')}>
        Logout
      </Menu.Item>
    </Menu>
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
      navigationOptions: ({ navigation }) => ({
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
    <Menu w="190" trigger={triggerProps => (
      <Pressable accessibilityLabel="More options menu" {...triggerProps}>
        <HamburgerIcon size="10" color="blue.900" style={{ marginLeft: 100, opacity: 1 }} />
      </Pressable>
    )}>
      <Menu.Item onPress={() => navigation.navigate('Settings', {})}>
        Settings
      </Menu.Item>
      <Menu.Item onPress={() => navigation.navigate('Logout')}>
        Logout
      </Menu.Item>
    </Menu>
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
    Settings: {
      screen: Settings,
      navigationOptions: ({ navigation }) => ({
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
    <Menu w="190" trigger={triggerProps => (
      <Pressable accessibilityLabel="More options menu" {...triggerProps}>
        <HamburgerIcon size="10" color="blue.900" style={{ marginLeft: 100, opacity: 1 }} />
      </Pressable>
    )}>
      <Menu.Item onPress={() => navigation.navigate('Settings', {})}>
        Settings
      </Menu.Item>
      <Menu.Item onPress={() => navigation.navigate('Logout')}>
        Logout
      </Menu.Item>
    </Menu>
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
