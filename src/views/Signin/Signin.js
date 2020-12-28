import React, { useState } from 'react'
import { Image, Linking, SafeAreaView, StyleSheet, Text, ToastAndroid, View } from 'react-native'
import GroupTab from '../../components/Signin/GroupTab'
import SigninButton from '../../components/Signin/SigninButton'
import SigninInput from '../../components/Signin/SigninInput'
import logo from '../../../assets/images/VJlogo.png'
import * as APIURL from '../../utils/APIUrl'


export default function Signin({navigation}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const showToastLoginFail = () => {
        ToastAndroid.show("Email/Password wrong! Please Try again.", ToastAndroid.SHORT)
    }

    // const showToastLoginFail = (message) => {
    //     ToastAndroid.show(message, ToastAndroid.SHORT)
    // }

    const checkLogin = () => {
        return fetch(APIURL.AUTH_URL, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email,
              password
            })
        })
        .then((response) => response.json())
        .then((json) => {
            if (json.user.email === email) 
                navigation.navigate('Home', { userObject: json })
            else
                showToastLoginFail()
        })
        .catch((error) => {
            showToastLoginFail()
        });
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.logo}>
                <Image source={logo} style={styles.imgLogo} />
            </View>
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
            <View style={styles.authGrButton}>
                <SigninButton onPress={() => checkLogin()} title="GO!" />
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
    }
})
