import React, { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import {
    Text,
    Center,
    View,
    Alert,
    Input,
    ScrollView,
    Button
  } from "native-base";
  import { storeAccessToken, getAccessToken } from '../utils/helpers'


// Define a functional component named HelloWorld
function Settings(props) {
  // State to store the fetched data
  const [updateBudgetError, setUpdateBudgetError] = useState(false);
  const [budget, setBudget] = useState(1000)
  const [user, setUser] = useState({})


  handleBudget = (text) => {
    setBudget(text)
  };

  useEffect(async() => {
    const accessToken = await getAccessToken()
    const decodedToken = jwtDecode(accessToken);
    setUser(decodedToken)
  }, []); 



   patchProfile = async() => {
    // Check if type and amount are present
    if (!budget) {
      return Promise.reject(new Error('Budget Amount is required.'));
    }
  
    // Prepare the data for the POST request
    const data = {
      budget: Number(budget),
    };
  
    const accessToken = await getAccessToken()
    // Define the API endpoint
    const apiUrl = 'https://smart-budget-planner-api.onrender.com/user/budget'; // Replace with the actual API URL
  
    try {
      // Make a POST request to the API
      const response = await fetch(apiUrl, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
          // You may need to include additional headers, such as authentication headers, here.
        },
        body: JSON.stringify(data),
      });
  
      // Check if the response status is in the 2xx range (success)
      if (response.status == 200) {
        props.navigation.navigate("Dashboard", { navigateToSettings : false });
      } else {
        setUpdateBudgetError(true)
      }
    } catch (error) {
      // Handle network or request errors
      return Promise.reject(error);
    }
  }

    let alert = <View></View>;
    if (updateBudgetError) {
    alert = (
        <Alert w="100%" status="error">
        <Text fontSize="md" color="coolGray.800">
            Error while updating budget
        </Text>
        </Alert>
    );
    }

  // Render the fetched data
  return ( 
    <ScrollView>
        {alert}
        <Text fontWeight="extrabold" fontSize="2xl" color="blue.900" marginLeft="5%">Welcome {user.name}</Text>
<Text style={{ textAlign: 'center', flex: 1 }} color="blue.900" fontWeight="extrabold" fontSize="lg" marginTop="10%" marginBottom="5%">Update Profile</Text>
        <Center>
        <View>
          <Text style={{ margin: 10 }} fontSize="sm">
            Budget
          </Text>
          <Input
            placeholder="Budget"
            value={String(budget)}
            onChangeText={this.handleBudget}
          />
        </View>
        <View>
          <Button
            style={{ marginVertical: "5%" }}
            bgColor="blue.900"
            onPress={() => this.patchProfile()}
          >
            Submit
          </Button>
        </View>
        </Center>
    </ScrollView>
  );
}

export default Settings;