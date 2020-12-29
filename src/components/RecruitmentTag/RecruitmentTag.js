import React from 'react'
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import background from '../../../assets/images/background.jpg'
import icon from '../../../assets/icon.png'

export default function RecruitmentTag() {
    return (
        <TouchableOpacity style={styles.recruitmentTag} activeOpacity={0.8}>
            <View style={styles.backgroundImg}>
                <Image  
                    style={styles.stretch}
                    source={background}
                />
                <Image style={styles.logo} source={icon}/>
                <Text style={styles.companyNameText}>Company Name</Text>
            </View>
            <View style={styles.recruitmentContent}>
                <Text>Recruitment Tag</Text>
            </View>
            
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    recruitmentTag: {
        marginVertical: 10,
        width: '95%',
        height: 240,
        backgroundColor: "#fdfdfd",
        borderRadius: 10,
        borderColor: "#f9f9f9",
        borderWidth: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 4,
            height: 1,
        },
        shadowOpacity: 0.06,
        shadowRadius: 1.11,
        elevation: 3,
    },
    backgroundImg: {
        width: '100%',
        height: 65,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: '#ffffff'
    },
    recruitmentContent: {
        width: '100%',
        height: 135,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        padding: 5
    },
    stretch: {
        width: '100%',
        height: 65,
        resizeMode: 'stretch',
    },
    logo: {
        width: 55,
        height: 55,
        position: 'absolute',
        top: 5,
        left: 5,
        borderRadius: 28
    },
    companyNameText: {
        position: 'absolute',
        left: 75,
        bottom: 5,
        fontSize: 20,
        color: '#9c9c9c'
    }
})
