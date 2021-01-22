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

exports.saveFilterToLS = async (filter) => {
  try {
    console.log("debugging_local");
    const filterType = filter.filterType
    const filterData = filter.filterData.data
    switch (filterType) {
      case 'major':
        console.log("major_local");
        let dataStringMajor = JSON.stringify(filterData)
        await AsyncStorage.setItem(`filter-${filterType}`, dataStringMajor)
        break;
      case 'city':
        console.log("city_local");
        let dataStringCity = JSON.stringify(filterData)
        await AsyncStorage.setItem(`filter-${filterType}`, dataStringCity)
        break;
      case 'work_type':
        console.log("workType_local");
        let dataStringWorkType = JSON.stringify(filterData)
        await AsyncStorage.setItem(`filter-${filterType}`, dataStringWorkType)
        break;
      default:
        break;
    }
  } catch (e) {
    // saving error
    console.log(e);
  }
}

exports.getFilterFromLS = async (filterType) => {
  try {
    const filterData = await AsyncStorage.getItem(`filter-${filterType}`)
    if (filterData !== null) {
      // value previously stored
      return JSON.parse(filterData);
    }
    else{
      console.log("ko co data local");
    }
  } catch (error) {
    console.log(error);
  }
}

exports.clearAllFilter = async () => {
    const keys = ['filter-major', 'filter-city', 'filter-work_type']
    try {
      await AsyncStorage.multiRemove(keys)
    } catch(e) {
      // remove error
    }
    console.log('Cleared All Filter Done')
}
// export default localStorageUtils = {
//   getUserFromStore: getUserFromStore,
//   saveUserToStore: saveUserInfo,
//   getTokenFromLS: getTokenFromLS,
//   saveTokenToLS: saveTokenToLS
// }