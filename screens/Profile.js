import React from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  Platform
} from "react-native";
import { Block, Text, Button as GaButton, theme } from "galio-framework";

import { Button } from "../components";
import { Images, argonTheme } from "../constants";
import { HeaderHeight } from "../constants/utils";
import * as API from "../api/endpoints"
const localStorageUtils = require('../utils/local-store');
import AsyncStorage from '@react-native-async-storage/async-storage';

const axios = require('axios').default;

const { width, height } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;
class Profile extends React.Component {
  _unsubscribe = false
  constructor(props) {
    super(props);
    this.state = {
      firstName: 'Đang tải',
      lastName: 'dữ liệu',
      dob: 'Đang tải dữ liệu',
      phone: 'Đang tải dữ liệu',
      email: 'Đang tải dữ liệu',
      address: 'Đang tải dữ liệu',
      bio: 'Đang tải dữ liệu',
      social_linkedin: 'Đang tải dữ liệu',
      social_facebook: 'Đang tải dữ liệu',
      userInfo: {}
    }
  }

  async componentDidMount() {
    const { navigation } = this.props;
    this._unsubscribe = navigation.addListener('focus', async() => {
      console.log("[PROFILE]: UPDATE SCREEN WITH API");
      await this.syncOfflineAndFetchData()
    });

    await this.syncOfflineAndFetchData()
    // console.log(userFromLocal);
    // console.log(tokenCredential);
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  async syncOfflineAndFetchData(){
    /*
    * Check logged or not, then countinue with same case.
    */
    const userFromLocal = await localStorageUtils.getUserFromLS();
    const tokenCredential = await localStorageUtils.getTokenFromLS();
    if(userFromLocal != undefined) {
      return await this.getUserData(userFromLocal, tokenCredential.access_token);
    }
    else return this.navigateToScreen('Login') 
  }

  navigateToScreen(screenName) {
    const { navigation } = this.props
    return navigation.navigate(screenName)
  }

  async getUserData(user, token,) {

    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await axios({
        method: 'GET',
        url: `${API.USER}`,
        headers: headers,
      });
      // console.log(response);
      if (response.status === 200) {
        console.log("FETCH API (get User) SUCCESSFULLY");
        const userFetched = response.data;
        this.setState({ userInfo: userFetched })
        this.setState({
          firstName: userFetched.first_name,
          lastName: userFetched.last_name,
          dob: userFetched.dob,
          phone: userFetched.phone,
          email: userFetched.email,
          address: userFetched.address,
          bio: userFetched.bio,
          social_linkedin: userFetched.social_linkedin,
          social_facebook: userFetched.social_facebook,
        });

        //Save to localStorage user
        await localStorageUtils.saveUserToLS(userFetched)
      }
    } catch (error) {
      console.log(error);
      console.log(error.response.data);
      // console.log(error.response.status);
      if (error.response) {
        console.log("loi rui | Profile");
        if (error.response.status === 401 || error.response.status === 403) {
          //Tach 403/401 ra, neu gap 401 & 403 gi do thi vang ra bat dang nhap lai
          this.navigateToScreen('Login');
        }
        else if (error.response.status === 404) {

        }
        else if (error.response.status === 405) {
          //method not allow
        }
        else if (error.response.status === 500) {
          //Server error, check return message and debug

        }
      }
      else if (error.message === 'Network Error') {
        this.setState({
          firstName: user.first_name,
          lastName: user.last_name,
          dob: user.dob,
          phone: user.phone,
          email: user.email,
          address: user.address,
          bio: user.bio,
          social_linkedin: user.social_linkedin,
          social_facebook: user.social_facebook,
        });
      }
    }
  }

  render() {
    // const { isFocused } = this.props;
    return (
      <Block flex style={styles.profile}>
        <Block flex>
          <ImageBackground
            source={Images.ProfileBackground}
            style={styles.profileContainer}
            imageStyle={styles.profileBackground}
          >
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ width, marginTop: '25%' }}
            >

              <Block flex style={styles.profileCard}>
                <Block middle style={styles.avatarContainer}>
                  <Image
                    source={{ uri: Images.ProfilePicture }}
                    style={styles.avatar}
                  />
                </Block>
                <Block style={styles.info}>
                  <Block row middle style={styles.blockInfo}>
                    <Block middle>
                      <Text
                        bold
                        size={18}
                        color="#525F7F"
                        style={{ marginBottom: 4 }}
                      >
                        {this.state.email}
                      </Text>
                      <Text size={12} color={argonTheme.COLORS.TEXT}>Email</Text>
                    </Block>
                  </Block>
                  <Block row middle style={styles.blockInfo}>
                    <Block middle>
                      <Text
                        bold
                        size={18}
                        color="#525F7F"
                        style={{ marginBottom: 4 }}
                      >
                        {!this.state.phone ? 'Chưa cập nhật' : this.state.phone}
                      </Text>
                      <Text size={12} color={argonTheme.COLORS.TEXT}>Số điện thoại</Text>
                    </Block>
                  </Block>
                </Block>
                <Block flex>
                  <Block middle style={styles.nameInfo}>
                    <Text bold size={28} color="#32325D">
                      {this.state.lastName + ' ' + this.state.firstName}
                    </Text>
                  </Block>
                </Block>
                <Block flex middle>
                  <GaButton
                    round
                    onlyIcon
                    shadowless
                    icon="edit"
                    iconFamily="Font-Awesome"
                    // iconColor={theme.COLORS.BLACK}
                    iconSize={theme.SIZES.BASE * 1}
                    // size={'small'}
                    color={theme.COLORS.WHIYE}
                    style={[styles.editBtn, styles.shadow]}
                    onPress={() => this.navigateToScreen('EditProfile')}
                  />
                </Block>
              </Block>
              <Block flex style={styles.profileBlock}>
                <Block style={styles.profileRow}>
                  <Text style={styles.rowTextLeft} bold size={18} color="#333">Ngày sinh</Text>
                  <Text style={styles.rowTextRight} size={16} color="#333">{this.state.dob}</Text>
                </Block>
              </Block>
              <Block flex style={styles.profileBlock}>
                <Block style={styles.profileRow}>
                  <Text style={styles.rowTextLeft} bold size={18} color="#333">Địa chỉ</Text>
                  <Text style={styles.rowTextRight} size={16} color="#333">{this.state.address}</Text>
                </Block>
              </Block>
              <Block flex style={styles.profileBlock}>
                <Block style={styles.profileRow}>
                  <Text style={styles.rowTextLeft} bold size={18} color="#333">Bio</Text>
                  <Text style={styles.rowTextRight} size={16} color="#333">
                    {this.state.bio}
                  </Text>
                </Block>
              </Block>
              <Block row center space="between">
                <Block flex middle right>
                  <GaButton
                    round
                    onlyIcon
                    shadowless
                    icon="facebook"
                    iconFamily="Font-Awesome"
                    iconColor={theme.COLORS.WHITE}
                    iconSize={theme.SIZES.BASE * 1.625}
                    color={theme.COLORS.FACEBOOK}
                    style={[styles.social, styles.shadow]}
                  />
                </Block>
                <Block flex middle center>
                  <GaButton
                    round
                    onlyIcon
                    shadowless
                    icon="linkedin"
                    iconFamily="Font-Awesome"
                    iconColor={theme.COLORS.WHITE}
                    iconSize={theme.SIZES.BASE * 1.625}
                    color={theme.COLORS.LINKEDIN}
                    style={[styles.social, styles.shadow]}
                  />
                </Block>
                <Block flex middle left>
                  <GaButton
                    round
                    onlyIcon
                    shadowless
                    icon="github"
                    iconFamily="Font-Awesome"
                    iconColor={theme.COLORS.WHITE}
                    iconSize={theme.SIZES.BASE * 1.625}
                    color={theme.COLORS.GITHUB}
                    style={[styles.social, styles.shadow]}
                  />
                </Block>
              </Block>
              {/* <Block flex style={styles.profileBlock}>
                <Block style={styles.profileRow}>
                  <Text style={styles.rowTextLeft} bold size={18} color="#333">LinkedIn</Text>
                  <Text style={styles.rowTextRight} size={16} color="#333">
                    {this.state.social_linkedin}
                  </Text>
                </Block>
              </Block> */}
            </ScrollView>
          </ImageBackground>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  profile: {
    // marginTop: Platform.OS === "android" ? -HeaderHeight : 0,
    // marginBottom: -HeaderHeight * 2,
    flex: 1
  },
  profileContainer: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 1
  },
  profileBackground: {
    width: width,
    height: height / 2
  },
  profileCard: {
    // position: "relative",
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: 65,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2
  },
  info: {
    paddingHorizontal: 40
  },
  avatarContainer: {
    position: "relative",
    marginTop: -80
  },
  avatar: {
    width: 124,
    height: 124,
    borderRadius: 62,
    borderWidth: 0
  },
  nameInfo: {
    marginTop: 20
  },
  divider: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#E9ECEF"
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: "center",
    width: thumbMeasure,
    height: thumbMeasure
  },
  blockInfo: {
    marginVertical: 7
  },
  profileBlock: {
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: 3
  },
  profileRow: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  rowTextLeft: {
    flex: 3
  },
  rowTextRight: {
    flex: 5,
  },
  button: {
    marginBottom: theme.SIZES.BASE,
    width: width - theme.SIZES.BASE * 2
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: "center"
  },
  editBtn: {
    // width: theme.SIZES.BASE * 3,
    // height: theme.SIZES.BASE * 2.5,
    // borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: "center"
  },
});

export default Profile;
