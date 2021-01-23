import { Block, Input, Icon } from 'galio-framework'
import React, { useState } from "react";
import { useEffect } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Loading, Button } from '../components';
const localStorageUtils = require('../utils/local-store');

import * as API from "../api/endpoints"
const axios = require('axios').default;

const DATA = [
    {
        id: 'major',
        title: 'Ngành Nghề',
    },
    {
        id: 'city',
        title: 'Tỉnh / thành phố',
    },
    {
        id: 'work_type',
        title: 'Loại hình',
    },
];


const Item = ({ item, onPress, style }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, styles.blockItem]}>
        <Text style={styles.title}>{item.title}</Text>
        <Block style={{flexDirection: 'row'}}>
            <Text>Chọn</Text>
            <Icon name="right" family="AntDesign" size={18} color={'black'} style={[style]} />
        </Block>
    </TouchableOpacity>
);

const FilterScreen = (props) => {

    const [isLoaded, setIsLoaded] = useState(true);
    const [data, setData] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const {navigation, route} = props

    useEffect(() => {

    })

    const renderItem = ({ item }) => {
        // const display = item.id === selectedId ? "none" : '';
        //const display = item.id === selectedId ? 'flex' : 'none';
        return (
            <Item
                item={item}
                onPress={() => {
                    setSelectedId(item.id)
                    navigation.navigate('FilterScreenItem', {item: item})
                }}
                //style={{  }}
            />
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <Block center>
                <Button onPress={()=> {
                    localStorageUtils.clearAllFilter()
                }}> Xoá tất cả bộ lọc</Button>
                
            </Block>
            <FlatList
                // key={(item) => item.id}
                data={DATA}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                extraData={selectedId}
            />
        </SafeAreaView>
    );



};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 15,
    },
    item: {
        padding: 15,
        // marginVertical: 8,
        marginHorizontal: 10,
        borderStyle: 'solid',
        borderWidth: 0.5,
        borderBottomColor: 'lightgrey',
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0
    },
    title: {
        // fontSize: 10,
    },
    blockItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    iconSelected: {
        // display: 'none',
        // color: '#29DBA0',
    }
});

export default FilterScreen