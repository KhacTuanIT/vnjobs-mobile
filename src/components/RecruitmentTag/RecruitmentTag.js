import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function RecruitmentTag() {
    return (
        <View style={styles.recruitmentTag}>
            <Text>Recruitment Tag</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    recruitmentTag: {
        marginVertical: 10,
        width: '95%',
        height: 200,
        flexDirection: 'column',
        backgroundColor: "#f9f9f9",
        borderRadius: 10,
        borderColor: "#dfdfdf",
        borderWidth: 1,
        padding: 7,
        shadowColor: "#000",
        shadowOffset: {
            width: 4,
            height: 1,
        },
        shadowOpacity: 0.06,
        shadowRadius: 1.11,
        elevation: 3,
    }
})
