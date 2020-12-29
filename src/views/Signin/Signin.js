import React, { useState, useRef } from 'react'
import { Image, Linking, SafeAreaView, StyleSheet, Text, ToastAndroid, View } from 'react-native'
import GroupTab from '../../components/Signin/GroupTab'
import SigninButton from '../../components/Signin/SigninButton'
import SigninInput from '../../components/Signin/SigninInput'
import logo from '../../../assets/images/VJlogo.png'
import * as APIURL from '../../utils/APIUrl'
const axios = require('axios');

export default function Signin({navigation}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [failedText, setFailedText] = useState(false)

    const pwd = useRef('')

    // const testRef = React.createRef();

    function showFailedNoitification(){
        setFailedText(true)
    }

    function redirectView (response) {
        navigation.navigate('Home', { userObject: response.json })
    }

    const checkLogin = async () => {
        try {            
            const header = {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
    
            const response = await axios({
                method: 'POST',
                url: APIURL.AUTH_URL,
                headers: {header},
                data: {
                  email: email,
                  password: password
                }
              });
            
            // console.log(response.data)
            if(response.status === 200) {
                console.log(response.data);
                    redirectView(response)

            }
            else 
                setStatusLogin(true)
            
        } catch (error) {
            console.log(error.response);
            console.log(error.response.status);
            showFailedNoitification();
            pwd.current.clearText();

        }
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.logo}>
                <Image source={logo} style={styles.imgLogo} />
            </View>
            { failedText &&
                <View>
                    <Text style={styles.notification}>Wrong Username or Password !!</Text>
                </View>
            }
            <SigninInput 
                placeholder="Email" 
                iconStart="envelope" 
                keyboardType="email-address"
                setText={setEmail}
            />
            <SigninInput
                ref = {pwd}
                placeholder="Password" 
                textContentType="password" 
                iconStart="key" 
                iconEnd="eye-slash" 
                setText={setPassword}
                secureTextEntry={true} 
            />
            <View style={styles.authGrButton}>
                <SigninButton onPress={() => checkLogin()} title="SIGN IN" />
            </View>
            <Text style={styles.forgetLink}
                onPress={() => Linking.openURL('http://google.com')}
            >
                Forget pasword?    
            </Text>
            <GroupTab />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        marginBottom: 30,
        width: 65,
        height: 65
    },
    imgLogo: {
        width: 65,
        height: 65
    },
    authGrButton: {
        marginTop: 10
    },
    forgetLink: {
        color: 'blue',
        textDecorationLine: 'underline',
        marginTop: 10
    },
    notification: {
        fontWeight: 'bold',
        color: 'red',
        paddingTop: 15,
        paddingBottom: 15
    }

})
