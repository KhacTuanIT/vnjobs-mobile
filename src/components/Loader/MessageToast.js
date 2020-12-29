import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function MessageToast({visible = false, message = ""}) {
    return (
        <View style={visible ? styles.container : styles.hide}>
            <Text style={styles.textToast}>{message}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: '100%',
        height: '10%',
        bottom: 0,
        alignItems: 'center'
    },
    hide: {
        display: 'none'
    },
    textToast: {
        fontSize: 14,
        color: '#ff3979',
        fontWeight: 'bold'
    }
})
