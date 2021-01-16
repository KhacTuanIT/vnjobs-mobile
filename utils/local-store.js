import AsyncStorage from '@react-native-async-storage/async-storage';

exports.getUserFromLS = async () => {
  try {
    const user = await AsyncStorage.getItem('user')
    if (user !== null) {
      // value previously stored
      return JSON.parse(user);
    }
  } catch (error) {
    console.log(error);
  }
}

exports.saveUserToLS = async (user) => {
  try {
    const userObj = JSON.stringify(user)
    // console.log(userObj);
    await AsyncStorage.setItem('user', userObj)
  } catch (e) {
    // saving error
    console.log(e);
  }
}

exports.getTokenFromLS = async () => {
  try {
    const token = await AsyncStorage.getItem('token')
    if (token !== null) {
      // value previously stored
      return JSON.parse(token);
    }
  } catch (error) {
    console.log(error);
  }
}

exports.saveTokenToLS = async (token) => {
  try {
    const tokenObj = JSON.stringify(token)
    // console.log(userObj);
    await AsyncStorage.setItem('token', tokenObj)
  } catch (e) {
    // saving error
    console.log(e);
  }
}

// export default localStorageUtils = {
//   getUserFromStore: getUserFromStore,
//   saveUserToStore: saveUserInfo,
//   getTokenFromLS: getTokenFromLS,
//   saveTokenToLS: saveTokenToLS
// }