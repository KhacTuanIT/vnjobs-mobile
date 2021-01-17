import React from 'react'
import { ActivityIndicator, StyleSheet, View, ScrollView, Dimensions, Image } from 'react-native'
// import {Icon} from '../Icon';
import { Block, theme, Text, Icon } from 'galio-framework';
const { width } = Dimensions.get("screen");


const LastestRecruitmentNews = (props) => {
    return (
        <Block flex style={styles.blockLastestJobs}>
            <Text style={{ paddingBottom: 25 }} bold size={16}>VIỆC LÀM MỚI NHẤT</Text>
            <Block style={styles.jobItem}>
                <Block style={styles.wrapImg}>
                    <Image
                        style={styles.logoOrg}
                        source={{
                            uri: 'https://snack-web-player.s3.us-west-1.amazonaws.com/v2/40/static/media/react-native-logo.79778b9e.png',
                        }}
                    />
                </Block>
                <Block style={styles.infoOrg}>
                    <Text style={styles.text} bold size={15}>Chuyên viên Giám Sát / Nhân Viên Kế Toán Doanh Thu - AR...</Text>
                    <Text style={styles.text}>Phoenix Vietnam Co, Ltd</Text>
                    <Text style={styles.text}>Đà Nẵng</Text>
                </Block>
            </Block>
            <Block style={styles.jobItem}>
                <Block style={styles.wrapImg}>
                    <Image
                        style={styles.logoOrg}
                        source={{
                            uri: 'https://snack-web-player.s3.us-west-1.amazonaws.com/v2/40/static/media/react-native-logo.79778b9e.png',
                        }}
                    />
                </Block>
                <Block style={styles.infoOrg}>
                    <Text style={styles.text} bold size={15}>Lập trình Nodejs</Text>
                    <Text style={styles.text}>Phoenix Vietnam Co, Ltd</Text>
                    <Text style={styles.text}>Đà Nẵng</Text>
                </Block>
            </Block>
            <Block style={styles.jobItem}>
                <Block style={styles.wrapImg}>
                    <Image
                        style={styles.logoOrg}
                        source={{
                            uri: 'https://snack-web-player.s3.us-west-1.amazonaws.com/v2/40/static/media/react-native-logo.79778b9e.png',
                        }}
                    />
                </Block>
                <Block style={styles.infoOrg}>
                    <Text style={styles.text} bold size={15}>Lập trình Nodejs</Text>
                    <Text style={styles.text}>Phoenix Vietnam Co, Ltd</Text>
                    <Text style={styles.text}>Đà Nẵng</Text>
                </Block>
            </Block>
        </Block>
    );
}

const styles = StyleSheet.create({
    blockLastestJobs: {
        backgroundColor: 'white',
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 15,
        paddingRight: 10,
        borderRadius: 7,
    },
    jobItem: {
        flexDirection: 'row',
        flex: 1, 
        paddingTop: 12,
        paddingBottom: 12,
        // backgroundColor: 'lightpink',
        borderStyle: 'solid',
        borderWidth: 0.5,
        borderTopColor: 'lightgrey',
        borderBottomWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0
    },
    wrapImg:{
        height: 80,
        maxHeight: 80,
        flex: 1,
        // backgroundColor: 'lightblue',
    },
    logoOrg: {
        height: '100%',
        // backgroundColor: 'lightblue',
        width: '100%'
    },
    infoOrg: {
        // backgroundColor: 'lightcyan',
        paddingLeft: 10,
        justifyContent: 'center',
        flex: 3,
        
    },
    text: {
        lineHeight: 20,
        flexShrink: 1,
        // flex: 'wrap'
    }
})

export default LastestRecruitmentNews;
