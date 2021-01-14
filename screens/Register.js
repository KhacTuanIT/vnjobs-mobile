import React from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  LogBox
} from "react-native";
import { Block, Checkbox, Text, theme } from "galio-framework";
import { Button, Icon, Input } from "../components";
import { Images, argonTheme } from "../constants";
import * as API from "../api/endpoints"
const axios = require('axios').default;
import AsyncStorage from '@react-native-async-storage/async-storage';
import { color } from "react-native-reanimated";

const { width, height } = Dimensions.get("screen");

class Register extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      firstName: null,
      lastName : null,
      email: null,
      password: null,
      confirmPassword: null,
      isRegistrationFailed: false,
      errorMessage: null,
      show: false,
      
    }

  }
  componentDidMount() {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
  }
  navigationToSignIn(){
    const {navigation} = this.props
    // return navigation.navigate("Login")
  }

  navigateToSignIn(){
    const {navigation} = this.props
    return navigation.navigate("Login")
  }

  validation(){
    console.log(this.state);
    if(!this.state.email || !this.state.firstName || !this.state.lastName || !this.state.password || !this.state.confirmPassword ){
      this.setState({isRegistrationFailed : true, errorMessage : 'Please fill full information !'});
      return false
    }
    else if(this.state.password !== this.state.confirmPassword){
      this.setState({password: '', confirmPassword: '', isRegistrationFailed : true, errorMessage : 'Password and confirm password are wrong !'})
      return false
    }
    else {
      this.setState({isRegistrationFailed : false})
      return true
    }
  }

  async register(data){
    const validStatusCode = 201;

    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    try {
      console.log(API.REGISTER);
      const response = await axios({
        method: 'POST',
        url: API.REGISTER,
        headers: headers,        
        data,

      });
      console.log(response);
      if(response.status === validStatusCode){
        // return this.navigationToSignIn()
        console.log("login_success");
        styles.notification = { 
          color:'green',     
          fontWeight: 'bold',
          paddingBottom: 10,
          paddingTop: 20,
        };
        this.setState({ isRegistrationFailed: true, errorMessage : 'Sign Up Successfully! Please Sign In', firstName: '', lastName: '', email: '', password: '', confirmPassword: ''});

      }
    } catch (error) {
      console.log(error.response.data);
      console.log(error.response.status);
      if(error.response.status != validStatusCode && error.response.status == 422){
        const errorsData = error.response.data;
        let errorsMsg = '';

        await Object.values(errorsData.errors).forEach(val => {
          errorsMsg += `${val[0]}\n`;
        });

        this.setState({
          isRegistrationFailed: true, errorMessage : errorsMsg
        });
        console.log(this.state);
      }
      // return error.response.status === validStatusCode
    }
  }

  prepareRegister(){
    if(this.validation()){
      const data = {
        first_name: this.state.firstName,
        last_name: this.state.lastName,
        email: this.state.email.toLowerCase(),
        password: this.state.password
      }
      this.register(data);
    }
  }


  render() {
    return (
      <Block flex middle>
        <StatusBar hidden />
        <ImageBackground
          source={Images.RegisterBackground}
          style={{ width, height, zIndex: 1 }}
        >
          <Block flex middle>
            <Block style={styles.registerContainer}>
              <Block flex={0.25} middle style={styles.socialConnect}>
                <Text color="#8898AA" size={12}>
                  Sign up with
                </Text>
                <Block row style={{ marginTop: theme.SIZES.BASE }}>
                  <Button style={{ ...styles.socialButtons, marginRight: 30 }}>
                    <Block row>
                      <Icon
                        name="logo-github"
                        family="Ionicon"
                        size={14}
                        color={"black"}
                        style={{ marginTop: 2, marginRight: 5 }}
                      />
                      <Text style={styles.socialTextButtons}>GITHUB</Text>
                    </Block>
                  </Button>
                  <Button style={styles.socialButtons}>
                    <Block row>
                      <Icon
                        name="logo-google"
                        family="Ionicon"
                        size={14}
                        color={"black"}
                        style={{ marginTop: 2, marginRight: 5 }}
                      />
                      <Text style={styles.socialTextButtons}>GOOGLE</Text>
                    </Block>
                  </Button>
                </Block>
              </Block>
              <Block flex>
                {/* <Block flex={0.10} middle>
                  <Text color="#8898AA" size={12}>
                    Or sign up the classic way
                  </Text>
                </Block> */}
                <Block middle>
                  {
                  this.state.isRegistrationFailed &&
                    <Text style={styles.notification}>{this.state.errorMessage}</Text>
                    }
                </Block>
                <Block flex center>
                  <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior="padding"
                    enabled
                  >
                    <Block row>
                      <Block width={width * 0.4}  style={{paddingRight: 5}}>
                        <Input
                          borderless
                          onChangeText={firstName => this.setState({firstName: firstName})}
                          placeholder="First name"
                          value={this.state.firstName}
                          iconContent={
                            <Icon
                              size={16}
                              color={argonTheme.COLORS.ICON}
                              name="hat-3"
                              family="ArgonExtra"
                              style={styles.inputIcons}
                            />
                          }
                        />
                        
                      </Block>
                      <Block width={width * 0.4} style={{paddingLeft: 5}}>
                        <Input
                          borderless
                          onChangeText={lastName => this.setState({lastName: lastName})}
                          placeholder="Last name"
                          value={this.state.lastName}
                          iconContent={
                            <Icon
                              size={16}
                              color={argonTheme.COLORS.ICON}
                              name="hat-3"
                              family="ArgonExtra"
                              style={styles.inputIcons}
                            />
                          }
                      />
                      
                    </Block>
                    </Block>
                    
                    
                    <Block width={width * 0.8}>
                      <Input
                        borderless
                        onChangeText={email => this.setState({email: email})}
                        placeholder="Email"
                        value={this.state.email}
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            name="ic_mail_24px"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        }
                      />
                      <Input
                        onChangeText={password => this.setState({password: password})}
                        password
                        borderless
                        placeholder="Password"
                        value = {this.state.password}
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            name="padlock-unlocked"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        }
                      />
                    </Block>
                    <Block width={width * 0.8}>
                      <Input
                        onChangeText={confirmPassword => this.setState({confirmPassword: confirmPassword})}
                        password
                        borderless
                        value = {this.state.confirmPassword}
                        placeholder="Confirm password"
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            name="padlock-unlocked"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        }
                      />
                    </Block>
                    <Block row width={width * 0.75}>
                      <Checkbox
                        checkboxStyle={{
                          borderWidth: 3
                        }}
                        initialValue = {true}
                        color={argonTheme.COLORS.PRIMARY}
                        label="I agree with the"
                      />
                      <Button
                        style={{ width: 100 }}
                        color="transparent"
                        textStyle={{
                          color: argonTheme.COLORS.PRIMARY,
                          fontSize: 14
                        }}
                      >
                        Privacy Policy
                      </Button>
                    </Block>
                    <Block middle>
                      <Button color="primary" style={styles.createButton} onPress={()=> this.prepareRegister()}>
                        <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                          CREATE ACCOUNT
                        </Text>
                      </Button>
                    </Block>
                    <Block middle style={styles.moreAboutAccount}>
                      <Text> Already have an account </Text>
                      <Text size={18} bold color={argonTheme.COLORS.PRIMARY} 
                      onPress={() => this.navigateToSignIn()}
                      >
                        {" "}
                        Signin
                      </Text>
                    </Block>
                  </KeyboardAvoidingView>
                </Block>
              </Block>
            </Block>
          </Block>
        </ImageBackground>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  registerContainer: {
    width: width,
    height: height,
    backgroundColor: "#F4F5F7",
    borderRadius: 4,
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: "hidden"
  },
  socialConnect: {
    backgroundColor: argonTheme.COLORS.WHITE,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#8898AA"
  },
  socialButtons: {
    width: 120,
    height: 40,
    backgroundColor: "#fff",
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1
  },
  socialTextButtons: {
    color: argonTheme.COLORS.PRIMARY,
    fontWeight: "800",
    fontSize: 14
  },
  inputIcons: {
    marginRight: 12
  },
  createButton: {
    width: width * 0.5,
    marginTop: 25
  },
  moreAboutAccount: {
    paddingTop: 30,
  },
  notification: {
    color: 'red',
    fontWeight: 'bold',
    paddingBottom: 10,
    paddingTop: 20,
  },
});

export default Register;
