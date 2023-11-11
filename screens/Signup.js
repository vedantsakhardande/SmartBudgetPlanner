import { View, ScrollView, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { storeAccessToken, getAccessToken, isAccessTokenValid, clearAccessToken } from '../utils/helpers'
import {
  Button,
  Input,
  Text,
  Alert,
  Center,
} from "native-base";

function Signup(props) {
  const [ name, setName ] = useState("")
  const [ username, setUsername ] = useState("")
  const [ password, setPassword ] = useState("")
  const [ signupError, setSignupError ] = useState(false)
  const [ isLoading, setIsLoading ] = useState(true)
  handleName = (text) => {
    setName(text)
    setSignupError(false)
  };
  handleUsername = (text) => {
    setUsername(text)
    setSignupError(false)
  };
  handlePassword = (text) => {
    setPassword(text)
    setSignupError(false)
  };

  useEffect(async() => {
    const isTokenValid = await isAccessTokenValid()
    if (!isTokenValid) {
      // Access token is expired, clear it from AsyncStorage
      clearAccessToken();
      // Redirect or take appropriate action
    }
    else{
      props.navigation.navigate("Dashboard", {});
    }
  }, []); 

  

  signup = () => {
    setSignupError(false)
    fetch(`http://192.168.29.139:80/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        name,
        username,
        password,
      }),
    })
      .then(async(response) => {
        if (response.status === 201) {
          props.navigation.navigate("Login", {});
        } else {
          setSignupError(true)
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };



    let alert = <View></View>;
    if (signupError) {
      alert = (
        <Alert w="100%" status="error">
          <Text fontSize="md" color="coolGray.800">
            Problem during signup
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
          Signup
        </Text>
        <View>
            <Text style={{ margin: 10 }} fontSize="sm">
            Name
          </Text>
          <Input
            placeholder="Name"
            value={name}
            onChangeText={this.handleName}
          />
          <Text style={{ margin: 10 }} fontSize="sm">
            Username
          </Text>
          <Input
            placeholder="Username"
            value={username}
            onChangeText={this.handleUsername}
          />
          <Text style={{ margin: 10 }} fontSize="sm">
            Password
          </Text>
          <Input
            type="password"
            placeholder="Password"
            value={String(password)}
            onChangeText={this.handlePassword}
          />
        </View>
        <View>
          <Button
            style={{ marginVertical: "5%" }}
            bgColor="blue.900"
            onPress={() => this.signup()}
          >
            Signup
          </Button>
        </View>
        <Button
            style={{ marginVertical: "5%" }}
            bgColor="blue.900"
            onPress={() => props.navigation.navigate("Login")}
          >
            Login
          </Button>
      </ScrollView>
    );
}

export default Signup;