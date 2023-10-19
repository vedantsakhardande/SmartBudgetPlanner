import React, { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
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
    Icon,
    ScrollView,
    Button
  } from "native-base";
  import { Svg, Path } from 'react-native-svg';
  import { ProgressChart } from 'react-native-chart-kit';
  import { useNavigation } from '@react-navigation/native';



// Define a functional component named HelloWorld
function Dashboard(props) {
//   const navigation = useNavigation();
  // State to store the fetched data
  const [data, setData] = useState(null);
  // State to track loading and error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch data from an API
    async function fetchData() {
      try {
        const today = new Date();

        // Get the first day of the current month
        const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

        // Format the dates in the desired format
        const fromYear = firstDayOfMonth.getFullYear();
        const fromMonth = String(firstDayOfMonth.getMonth() + 1).padStart(2, '0');
        const fromDate = String(firstDayOfMonth.getDate()).padStart(2, '0');

        const toYear = today.getFullYear();
        const toMonth = String(today.getMonth() + 1).padStart(2, '0');
        const toDate = String(today.getDate()).padStart(2, '0');

        const from = `${fromYear}-${fromMonth}-${fromDate}`;
        const to = `${toYear}-${toMonth}-${toDate}`;

        // Create the date range string
        const dateRange = `from=${from}&to=${to}`;
        // Make a fetch request to your API endpoint
        const response = await fetch(`http://192.168.0.105:5001/transactions?${dateRange}`);
        
        // Check if the response status is okay (200)
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        // Parse the response data as JSON
        const { transactions } = await response.json();
        let totalExpensesForMonth = 0
        transactions.forEach(transaction => {
            totalExpensesForMonth += transaction.amount
        })
        const monthlyBudget = 1500
        const percentageSpend = totalExpensesForMonth/monthlyBudget * 100


        const data = { totalExpensesForMonth, percentageSpend, transactions }

        
        
        // Update the state with the fetched data
        setData(data);
        setLoading(false); // Set loading to false
      } catch (error) {
        setError(error); // Set error state if there's an error
        setLoading(false); // Set loading to false
      }
    }

    // Call the fetchData function when the component mounts
    fetchData();
  }, [props]); // The empty dependency array ensures the effect runs once when the component mounts

  addExpense = () => {
    props.navigation.navigate("AddExpense", {});
  };

// 
  const screenWidth = Dimensions.get('window').width;
  const chartSize = screenWidth * 0.8;

  // Render based on loading and error states
  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  const chartConfig = {
    backgroundGradientFromOpacity: 0, // Make the start color fully transparent
    backgroundGradientToOpacity: 0,   // Make the end color fully transparent
    color: data.percentageSpend <= 50 ? (opacity = 1) => `rgba(8, 163, 50, ${opacity})` : data.percentageSpend < 100 ? (opacity = 1) => `rgba(222, 112, 16, ${opacity})` : (opacity = 1) => `rgba(181, 4, 4, ${opacity})`, // Adjust the color as needed
  };

  // Render the fetched data
  return ( 
    <ScrollView>
<Text fontWeight="extrabold" fontSize="2xl" color="blue.900" marginLeft="5%">Welcome Vedant</Text>
<Text style={{ textAlign: 'center', flex: 1 }} color="blue.900" fontWeight="extrabold" fontSize="lg" marginTop="10%" >Expense Tracker</Text>
<Center>
    <Button
            style={{ marginVertical: "5%", width: '50%' }}
            onPress={() => this.addExpense()}
          >
            Add New Expense
          </Button>
          </Center>
<Center>
    <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
    <ProgressChart
        data={{
          labels: ['Spent'], // Label for the data point
          data: [data.percentageSpend / 100], // Progress value as a decimal (0 to 1)
        }}
        width={chartSize} // Width of the chart
        height={chartSize} // Height of the chart
        strokeWidth={30} // Width of the chart's progress line
        radius={64} // Radius of the chart (controls the size)
        chartConfig={chartConfig} // Configuration options for the chart
        hideLegend={true} // Set to true to hide the legend
      />
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <View
          style={{
            width: 18,
            height: 18,
            backgroundColor: chartConfig.color(), // Use the same color as the chart
            marginRight: 8,
          }}
        />
        <Text>Total Expenditure - {data.percentageSpend.toFixed(2)}%</Text>
      </View>
      

      </ScrollView>
    </Center>
<VStack space={3} divider={<Divider />} w="100%" marginTop="5%" marginBottom="5%">
    <HStack justifyContent="space-between" marginLeft="5%" marginRight="5%" marginBottom="5%" alignItems="center">
        <Text style={{ textAlign: 'center', flex: 1 }} color="blue.900" fontWeight="extrabold" fontSize="lg">Type</Text>
        <Text style={{ textAlign: 'center', flex: 1 }} color="blue.900" fontWeight="extrabold" fontSize="lg">Amount</Text>
        <Text style={{ textAlign: 'center', flex: 1 }} color="blue.900" fontWeight="extrabold" fontSize="lg">Description</Text>
      </HStack>
    {data.transactions.map((transaction, index) => (
        <HStack key={index} justifyContent="space-between" marginLeft="5%" marginRight="5%" alignItems="center">
        <Text  style={{ textAlign: 'center', flex: 1 }}>{transaction.type}</Text>
        <Text  style={{ textAlign: 'center', flex: 1 }}>{transaction.amount}</Text>
        <Text  style={{ textAlign: 'center', flex: 1 }}>{transaction.description}</Text>
      </HStack>
      ))}
</VStack>
    
    
    </ScrollView>
  );
}

export default Dashboard;