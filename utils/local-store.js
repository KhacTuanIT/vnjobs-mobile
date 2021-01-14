import { exp } from "react-native-reanimated";

import AsyncStorage from '@react-native-async-storage/async-storage';

getUserFromStore = async () => {
    try {
      const user = await AsyncStorage.getItem('user')
      if(user !== null) {
        // value previously stored
        return JSON.parse(user);
      }
    } catch (error) {
      console.log(error);
    }
  }

  saveUserInfo = async (user) => {
    try {
      const userObj = JSON.stringify(user)
      console.log(userObj);
      await AsyncStorage.setItem('user', userObj)
    } catch (e) {
      // saving error
      console.log(e);
    }
  }

  export default localStorageUtils = {
      getUserFromStore : getUserFromStore,
      saveUserToStore : saveUserInfo
  }