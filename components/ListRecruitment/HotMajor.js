import React from 'react'
import { ActivityIndicator, StyleSheet, View, ScrollView, Dimensions } from 'react-native'
// import {Icon} from '../Icon';
import { Block, theme, Text, Icon } from 'galio-framework';
const { width } = Dimensions.get("screen");


const renderMajorItem = (listMajor) => {
    console.log(listMajor);
    if (listMajor == null || listMajor.length < 1) {
        return (<Block><Text style={{ paddingTop: 10, paddingBottom: 10 }}>Chưa có ngành nghề nào nổi bật</Text></Block>)
    }
    else return (
        <Block row style={styles.itemMajorBlock}>
            {
                listMajor.map((item, key) => {
                    return (
                        <Block style={styles.itemMajor} key={key}>
                            <Block style={styles.iconMajor}>
                                <Icon name="laptop" color={'white'} family="AntDesign" size={40} />
                            </Block>
                            <Block style={styles.textGroup}>
                                <Text style={styles.textMajor} >{item.major_name}</Text>
                                <Text size={12} color={'#383838'} style={styles.textSlot}>150 Vị trí</Text>
                            </Block>
                        </Block>
                    )
                })
            }
        </Block>
    )
}

const HotMajor = (props) => {
    return (
        <Block flex style={styles.blockArticles}>
            <Text bold size={16}>NGÀNH NGHỀ NỔI BẬT</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrolls}>
                <Block flex row >
                    {/* <Text>HotMajor</Text> */}
                        {renderMajorItem(props.data)}
                </Block>
            </ScrollView>
        </Block>
    );
}

const styles = StyleSheet.create({
    scrolls: {
        marginTop: 0,
        paddingTop: 0
    },
    blockArticles: {
        // display: 'flex'
        // flexDirection:
        paddingTop: 15,
        paddingBottom: 20,
    },
    itemMajorBlock: {
        marginLeft: 25,
        // marginRight: 25,
    },
    itemMajor: {
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 45,
        // backgroundColor: 'red'
    },
    iconMajor: {
        backgroundColor: '#5BC0DE',
        padding: 5,
        borderRadius: 12,
    },
    textMajor: {
        paddingTop: 5
    },
    textGroup: {
        alignItems: 'center',
        paddingTop: 3
    }
})

export default HotMajor;
