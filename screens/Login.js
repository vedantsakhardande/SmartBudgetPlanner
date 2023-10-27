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
import * as Font from "expo";

function Login(props) {
  const [ username, setUsername ] = useState("")
  const [ password, setPassword ] = useState("")
  const [ loginError, setLoginError ] = useState(false)
  const [ isLoading, setIsLoading ] = useState(true)
  handleUsername = (text) => {
    setUsername(text)
    setLoginError(false)
  };
  handlePassword = (text) => {
    setPassword(text)
    setLoginError(false)
  };

  useEffect(async() => {
    const isTokenValid = await isAccessTokenValid()
    console.log("isTokenValid:",isTokenValid)
    if (!isTokenValid) {
      console.log("Inside token expired")
      // Access token is expired, clear it from AsyncStorage
      clearAccessToken();
      // Redirect or take appropriate action
    }
    else{
      console.log("Inside token expired")
      props.navigation.navigate("Dashboard", {});
    }
  }, []); 

  

  authorize = () => {
    setLoginError(false)
    fetch(`http://192.168.29.173:5001/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then(async(response) => {
        console.log("Response :",response)
        if (response.status === 200) {
          const { access_token } = await response.json()
          storeAccessToken(access_token)
          props.navigation.navigate("Dashboard", {});
        } else {
          setLoginError(true)
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };



    let alert = <View></View>;
    if (loginError) {
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
            onPress={() => this.authorize()}
          >
            Login
          </Button>
        </View>
      </ScrollView>
    );
}

export default Login;