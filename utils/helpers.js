import AsyncStorage from '@react-native-async-storage/async-storage';

// After successful login, store the access token and its expiration timestamp in AsyncStorage
export const storeAccessToken = async (token) => {
    try {
      await AsyncStorage.setItem('access_token', token);
    } catch (error) {
      console.error('Error storing access token:', error);
    }
  };

// Retrieve the access token and its expiration timestamp from AsyncStorage
export const getAccessToken = async () => {
    try {
      const token = await AsyncStorage.getItem('access_token');
      return token;
    } catch (error) {
      console.error('Error retrieving access token:', error);
      return null;
    }
};

export const isAccessTokenValid = async () => {
    try {
      const token = await getAccessToken(); // Get the stored access token
      if (!token) {
        // Access token is missing or not stored
        return false;
      }
  
      // You may also store the expiration timestamp in AsyncStorage during login
      const expirationTimestamp = await AsyncStorage.getItem('access_token_expiry');
      if (!expirationTimestamp) {
        // Expiration timestamp is missing or not stored
        return false;
      }
  
      const currentTimestamp = Date.now();
      const tokenExpiration = parseInt(expirationTimestamp, 10);
  
      if (currentTimestamp < tokenExpiration) {
        // Access token is still valid
        return true;
      } else {
        // Access token has expired
        return false;
      }
    } catch (error) {
      console.error('Error validating access token:', error);
      return false;
    }
  };

  export const clearAccessToken = async () => {
    try {
      await AsyncStorage.removeItem('access_token');
    } catch (error) {
      console.error('Error clearing access token:', error);
    }
  };
