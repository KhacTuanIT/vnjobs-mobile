import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function SigninButton({title = "", onPress}) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.signinButton}>
            <Text style={styles.signinButtonText}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    signinButton: {
        marginVertical: 5,
        width: 250,
        height: 45,
        justifyContent: 'center',
        borderRadius: 25,
        backgroundColor: "#4CB3B8",
        shadowColor: "#000",
        shadowOffset: {
            width: 4,
            height: 1,
        },
        shadowOpacity: 0.06,
        shadowRadius: 1.11,
        elevation: 3,
    },
    signinButtonText: {
        textAlign: 'center',
        textAlignVertical: 'center',
        color: '#fff',
        fontSize: 17
    }
})
