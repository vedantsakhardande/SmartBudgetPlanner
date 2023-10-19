import { View, ScrollView, Image } from "react-native";
import React, { Component } from "react";
import {
  Button,
  Input,
  Text,
  Alert,
  Center,
} from "native-base";
import * as Font from "expo";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      loginError: false,
      isLoading: true,
    };
  }
  handleUsername = (text) => {
    this.setState({ username: text, loginError: false });
  };
  handlePassword = (text) => {
    this.setState({ password: text, loginError: false });
  };

  authorize = () => {
    this.setState({ loginError: false });
    fetch(`http://192.168.0.105:5001/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          this.props.navigation.navigate("Dashboard", {});
        } else {
          this.setState({ loginError: true });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Prefill that data in a form and to update call /student/:rollNo OR /vaccination/:rollNo based on what is updated
  render() {
    let alert = <View></View>;
    if (this.state.loginError) {
      alert = (
        <Alert w="100%" status="error">
          <Text fontSize="md" color="coolGray.800">
            Incorrect Username or Password!
          </Text>
        </Alert>
      );
    }
    return (
      <ScrollView
        style={{
          marginHorizontal: 10,
          marginVertical: 80,
        }}
      >
        {alert}

        <Center>
          <Image
            source={require("../assets/images/logo.png")}
            style={{ width: 80, height: 80, borderRadius: 20 }}
          />
        </Center>
        <Text
          style={{
            fontWeight: "bold",
            textAlign: "center",
            fontSize: 20,
            marginTop: 20,
          }}
        >
          Login
        </Text>
        <View>
          <Text style={{ margin: 10 }} fontSize="sm">
            Username
          </Text>
          <Input
            placeholder="Username"
            value={this.state.username}
            onChangeText={this.handleUsername}
          />
          <Text style={{ margin: 10 }} fontSize="sm">
            Password
          </Text>
          <Input
            type="password"
            placeholder="Password"
            value={String(this.state.password)}
            onChangeText={this.handlePassword}
          />
        </View>
        <View>
          <Button
            style={{ marginVertical: "5%" }}
            bgColor="blue.900"
            onPress={() => this.authorize()}
          >
            Login
          </Button>
        </View>
      </ScrollView>
    );
  }
}