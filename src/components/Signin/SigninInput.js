import React, { useState } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'

const showStartIcon = (startIcon) => {
    if (startIcon !== null) {
        return (
            <View style={styles.startIconView}>
                <Icon name={startIcon} size={15} color="#777777" solid/>
            </View>
        )
    }
    return null
}

const showEndIcon = (endIcon, onChangeSecureTextEntry, secureTextEntry) => {
    const [icon, setIcon] = useState(endIcon)
    if (endIcon !== null) {
        return (
            <View 
                style={styles.endIconView} 
                onTouchEnd={() => onChangeSecureTextEntry(!secureTextEntry)}
                onTouchStart={() => (!secureTextEntry ? setIcon("eye-slash") : setIcon("eye"))}
            >
                <Icon name={icon} size={15} color="#777777" solid/>
            </View>
        )
    }
    return null
}

export default function SigninInput(
    {
        iconStart = null, 
        iconEnd = null, 
        placeholder = "", 
        textContentType = "emailAddress",
        secureTextEntry = false,
        keyboardType = "default",
        setText
    }) {
    const [text, onChangeText] = useState('')
    const [secureTE, onChangeSecureTextEntry] = useState(secureTextEntry)
    
    const handleChangeText = text => {
        onChangeText(text)
        setText(text)
    }

    return (
        <View style={styles.inputLogin}>
            { showStartIcon(iconStart) }
            <TextInput 
                style={styles.textInput} 
                placeholder={placeholder} 
                defaultValue={text}
                onChangeText={text => handleChangeText(text)}
                textContentType={textContentType}
                secureTextEntry={secureTE}
                keyboardType={keyboardType}
            />
            { showEndIcon(iconEnd, onChangeSecureTextEntry, secureTE) }
        </View>
    )
}

const styles = StyleSheet.create({
    inputLogin: {
        // flex: 1,
        flexDirection: 'row',
        width: 320,
        height: 45,
        marginVertical: 7,
        marginHorizontal: 'auto',
        borderRadius: 24,
        shadowColor: "#000",
        shadowOffset: {
            width: 4,
            height: 1,
        },
        shadowOpacity: 0.06,
        shadowRadius: 1.11,
        elevation: 3,
        backgroundColor: "#fff",
        justifyContent: 'center',
    },
    startIconView: {
        width: 45,
        height: 45,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    enveIcon: {
        margin: 'auto',
        color: "#8c8c8c"
    },
    textInput: {
        height: 45,
        flex: 1,
        textAlignVertical: 'center',
        fontSize: 17,
        color: "#373737"
    },
    endIconView: {
        width: 45,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopEndRadius: 24,
        borderBottomEndRadius: 24,
    }
})
