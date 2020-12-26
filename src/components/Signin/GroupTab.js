import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import TabButton from './TabButton'

export default function GroupTab() {
    return (
        <View style={styles.groupTab}>
            <TabButton name="facebook" color="#1877F2" />
            <TabButton name="google" color="#E74C3C"/>
        </View>
    )
}

const styles = StyleSheet.create({
    groupTab: {
        height: 45,
        width: 200,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        marginTop: 20,
        flexDirection: 'row',
    }
})
