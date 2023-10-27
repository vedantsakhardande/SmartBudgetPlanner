import React, { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import {
    Text,
    Container, 
    Center,
    Heading,
    Box,
    Stack,
    Progress,
    VStack,
    Divider,
    View,
    HStack,
    CheckIcon,
    Icon,
    Alert,
    Input,
    Select,
    ScrollView,
    Button
  } from "native-base";
  import { storeAccessToken, getAccessToken } from '../utils/helpers'
  import { Svg, Path } from 'react-native-svg';
  import { ProgressChart } from 'react-native-chart-kit';


// Define a functional component named HelloWorld
function AddExpense(props) {
  // State to store the fetched data
  const [addExpenseError, setAddExpenseError] = useState(false);
  const [type, setType] = useState("Others")
  const [amount, setAmount] = useState(0)
  const [description, setDescription] = useState("")
  const [user, setUser] = useState({})


  handleType = (text) => {
    setType(text)
  };
  handleAmount = (text) => {
    setAmount(text)
  };
  handleDescription = (text) => {
    setDescription(text)
  };

  useEffect(async() => {
    const accessToken = await getAccessToken()
    const decodedToken = jwtDecode(accessToken);
    setUser(decodedToken)
  }, []); 



   postTransaction = async() => {
    // Check if type and amount are present
    if (!amount) {
      return Promise.reject(new Error('Amount is required.'));
    }
  
    // Prepare the data for the POST request
    const data = {
      type,
      amount: Number(amount),
      description
    };
  
    const accessToken = await getAccessToken()
    // Define the API endpoint
    const apiUrl = 'http://192.168.29.173:5001/transactions'; // Replace with the actual API URL
  
    try {
      // Make a POST request to the API
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
          // You may need to include additional headers, such as authentication headers, here.
        },
        body: JSON.stringify(data),
      });
  
      // Check if the response status is in the 2xx range (success)
      if (response.status == 201) {
        props.navigation.navigate("Dashboard", {});
      } else {
        setAddExpenseError(true)
      }
    } catch (error) {
      // Handle network or request errors
      return Promise.reject(error);
    }
  }
//   addExpense = async() => {
//     try {
//         // Call the postTransaction function with type and amount
//         await postTransaction();
  
//         // Handle the success case (transaction created)
//         // Alert.alert('Success', 'Expense added successfully.');
//         this.props.navigation.navigate("Dashboard", {});
//       } catch (error) {
//         // Handle errors (validation error or API error)
//         // Alert.alert('Error', error.message);
        
//       }
    
//   };

    let alert = <View></View>;
    if (addExpenseError) {
    alert = (
        <Alert w="100%" status="error">
        <Text fontSize="md" color="coolGray.800">
            Error while adding expense
        </Text>
        </Alert>
    );
    }

    console.log("User is :",user)
  // Render the fetched data
  return ( 
    <ScrollView>
        {alert}
        <Text fontWeight="extrabold" fontSize="2xl" color="blue.900" marginLeft="5%">Welcome {user.name}</Text>
<Text style={{ textAlign: 'center', flex: 1 }} color="blue.900" fontWeight="extrabold" fontSize="lg" marginTop="10%" marginBottom="5%">Add Expense</Text>
        <Center>
        <View>
        <Text style={{ margin: 10 }} fontSize="sm">
            Type
          </Text>
          <Select selectedValue={type} minWidth="200" accessibilityLabel="Choose Expense Type" placeholder="Choose Expense Type" _selectedItem={{
        bg: "blue.200",
        endIcon: <CheckIcon size="5" />
      }} mt={1} onValueChange={itemValue => handleType(itemValue)}>
          <Select.Item label="Entertainment" value="Entertainment" />
          <Select.Item label="Household" value="Household" />
          <Select.Item label="Food" value="Food" />
          <Select.Item label="Others" value="Others" />
        </Select>
          <Text style={{ margin: 10 }} fontSize="sm">
            Amount
          </Text>
          <Input
            placeholder="Amount"
            value={String(amount)}
            onChangeText={this.handleAmount}
          />
          <Text style={{ margin: 10 }} fontSize="sm">
            Description
          </Text>
          <Input            
            placeholder="Description"
            value={description}
            onChangeText={this.handleDescription}
          />
        </View>
        <View>
          <Button
            style={{ marginVertical: "5%" }}
            bgColor="blue.900"
            onPress={() => this.postTransaction()}
          >
            Submit
          </Button>
        </View>
        </Center>
    </ScrollView>
  );
}

export default AddExpense;