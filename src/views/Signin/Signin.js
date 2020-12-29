import React, { useState } from 'react'
import { Image, Linking, SafeAreaView, StyleSheet, Text, ToastAndroid, View } from 'react-native'
import GroupTab from '../../components/Signin/GroupTab'
import SigninButton from '../../components/Signin/SigninButton'
import SigninInput from '../../components/Signin/SigninInput'
import logo from '../../../assets/images/VJlogo.png'
import * as APIURL from '../../utils/APIUrl'
import callLoginAPI from '../../utils/callAPI'


export default function Signin({navigation}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const checkLogin = () => {
        const data = {
            email,
            password
        }
        callLoginAPI(APIURL.AUTH_URL, "POST", 
            data,
            // [() => {alert("fail")}]
            // [setEmail(''), setPassword(''), () => {alert('fail')}]
        )
        // return fetch(APIURL.AUTH_URL, {
        //     method: 'POST',
        //     headers: {
        //       Accept: 'application/json',
        //       'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //       email,
        //       password
        //     })
        // })
        // .then((response) => response.json())
        // .then((json) => {
        //     alert(JSON.stringify(json))
        //     if (json.user.email === email) 
        //         navigation.navigate('Home', { userObject: json })
        //     else
        //         alert("Email/Password wrong! Please Try again.") 
        // })
        // .catch((error) => {
        //     alert("Email/Password wrong! Please Try again.") 
        // });
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.logo}>
                <Image source={logo} style={styles.imgLogo} />
            </View>
            <View>
                <SigninInput 
                    placeholder="Email" 
                    iconStart="envelope" 
                    keyboardType="email-address"
                    setText={setEmail}
                />
                <SigninInput 
                    placeholder="Password" 
                    textContentType="password" 
                    iconStart="key" 
                    iconEnd="eye-slash" 
                    setText={setPassword}
                    secureTextEntry={true} 
                />
            </View>            
            <View style={styles.authGrButton}>
                <SigninButton onPress={() => checkLogin()} title="GO!" />
            </View>
            <View>
                <Text style={styles.forgetLink}
                    onPress={() => Linking.openURL('http://google.com')}
                >
                    Forget pasword?    
                </Text>
            </View>
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
    }
})
