import React, { useState, useEffect } from 'react';
import { Dimensions, useWindowDimensions } from 'react-native';
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
    Icon,
    ScrollView,
    Button
  } from "native-base";
import { TabView, SceneMap } from 'react-native-tab-view';
import { Svg, Path } from 'react-native-svg';
import { ProgressChart } from 'react-native-chart-kit';
import { useNavigation } from '@react-navigation/native';
import { storeAccessToken, getAccessToken } from '../utils/helpers'
const screenWidth = Dimensions.get('window').width;
const chartSize = screenWidth * 0.8;





// Define a functional component named HelloWorld
function Dashboard(props) {
//   const navigation = useNavigation();
  // State to store the fetched data
  const [data, setData] = useState(null);
  const [forecastData, setForecastData] = useState(null)
  // State to track loading and error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState({})
  const [index, setIndex] = useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Expense Tracker' },
    { key: 'second', title: 'Expense Forecast' },
  ]);

  const FirstRoute = () => (
    <ScrollView>
<Text fontWeight="extrabold" fontSize="2xl" color="blue.900" marginLeft="5%">Welcome {user.name}</Text>
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
  // <View style={{ flex: 1, backgroundColor: '#ff4081' }} />

const SecondRoute = () => (
  <ScrollView>
    <Text fontWeight="extrabold" fontSize="2xl" color="blue.900" marginLeft="5%">Welcome {user.name}</Text>
    <Text style={{ textAlign: 'center', flex: 1 }} color="blue.900" fontWeight="extrabold" fontSize="lg" marginTop="10%" >EXPENSE FORECAST</Text>
    <VStack space={5} alignItems="center" style={{ marginTop: "5%" }}>
    <Text style={{ textAlign: 'center', flex: 1 }} color="blue.900" fontWeight="extrabold" fontSize="lg" >{forecastData.budget_status === 'No Data Available' ? 'NO DATA AVAILABLE' : 'YOU ARE' }</Text>
    { forecastData.budget_status !== 'No Data Available' &&
    <>
      <Center w="64" h="20" bg={forecastData.budget_status === 'Over Budget' ? 'red.700' : 'green.700' } rounded="md" shadow={3} >
      <Text style={{ textAlign: 'center', flex: 1 }} color="white" fontWeight="extrabold" fontSize="lg" marginTop="10%" >{forecastData.budget_status}</Text>
      </Center>
      <Text style={{ textAlign: 'center', flex: 1 }} color="blue.900" fontWeight="extrabold" fontSize="lg" >BY</Text> 
      <Center w="64" h="20" bg="lightBlue.700" rounded="md" shadow={3} >
      <Text style={{ textAlign: 'center', flex: 1 }} color="white" fontWeight="extrabold" fontSize="lg" marginTop="10%" >₹{forecastData.budget_difference}</Text>  
      </Center>
    </>}
    </VStack>
  </ScrollView>
);

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

  const layout = useWindowDimensions();

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
        const accessToken = await getAccessToken()
        const response = await fetch(`https://smart-budget-planner-api.onrender.com/transactions?${dateRange}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          },
        });
        
        // Check if the response status is okay (200)
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        // Parse the response data as JSON
        const { transactions, budget } = await response.json();
        let totalExpensesForMonth = 0
  
        let currentMonthTransactionsForecast = []
        transactions.forEach(transaction => {
            totalExpensesForMonth += transaction.amount
            // Create a Date object from the input timestamp
            const dateObject = new Date(transaction.timestamp);
  
            // Format the Date object as "YYYY-MM-DD"
            const year = dateObject.getUTCFullYear();
            const month = (dateObject.getUTCMonth() + 1).toString().padStart(2, "0"); // Month is zero-based
            const day = dateObject.getUTCDate().toString().padStart(2, "0");
  
            // Combine the formatted date components
            const formattedDate = `${year}-${month}-${day}`;
            currentMonthTransactionsForecast.push({ Date: formattedDate, Amount: transaction.amount })
        })
        const monthlyBudget = budget
        const percentageSpend = totalExpensesForMonth/monthlyBudget * 100
  
  
        const data = { totalExpensesForMonth, percentageSpend, transactions }
  
        const forecastResponse = await fetch(`https://smart-budget-planner-api.onrender.com/predict`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          },
          body: JSON.stringify({
            budget: monthlyBudget,
            transactions: currentMonthTransactionsForecast,
          }),
        });
        const forecastPrediction = await forecastResponse.json()
        
        // Update the state with the fetched data
        setData(data);
        setForecastData(forecastPrediction)
        setLoading(false); // Set loading to false
      } catch (error) {
        setError(error); // Set error state if there's an error
        setLoading(false); // Set loading to false
      }
    }
        // Call the fetchData function when the component mounts
        fetchData();
      }, [props]); // The empty dependency array ensures the effect runs once when the component mounts

    useEffect(() => {
    async function setAccessToken() {
      const accessToken = await getAccessToken()
      const decodedToken = jwtDecode(accessToken);
      setUser(decodedToken)
    }
    setAccessToken()
  }, []); 

  addExpense = () => {
    props.navigation.navigate("AddExpense", {});
  };

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

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
// 
  
}

export default Dashboard;