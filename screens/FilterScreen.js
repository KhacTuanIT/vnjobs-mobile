import { Block, Input, Icon } from 'galio-framework'
import React, { useState } from "react";
import { useEffect } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Loading } from '../components';

import * as API from "../api/endpoints"
const axios = require('axios').default;

const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-14s5571e29d72',
        title: 'Third Item',
    },
    {
        id: '58694a0f-sdsd-471f-bd96-asdsdad',
        title: 'Four Item',
    },
    {
        id: '58694a034344f-sdsd-471f-axxx-asdsdad',
        title: 'Five Item',
    },
];


const Item = ({ item, onPress, style }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, styles.blockItem]}>
        <Text style={styles.title}>{item.major_name}</Text>
        <Icon name="check" family="Entypo" color={'#29DBA0'} size={16} style={[style]} />
    </TouchableOpacity>
);

const FilterScreen = (props) => {

    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState([]);
    const [selectedId, setSelectedId] = useState(null);

    //CHECK DATA FROM PARAM PREVIOUS SCREEN
    // API = MAJOR/WORKTYPE => SET const url : {API.SAMECASE}


    useEffect(() => {
        prepareItem = async () => {
            const headers = {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
            try {
                const response = await axios({
                    method: 'GET',
                    url: API.LIST_MAJOR, //Inject dynamic url in here
                    headers
                })

                if (response.status == 200) {
                    const majors = response.data
                    // console.log(majors.data);
                    setIsLoaded(true)
                    setData(majors.data)
                }
            } catch (error) {
                console.log(error)
                setIsLoaded(false)
            }
        }

        prepareItem()
    })

    const renderItem = ({ item }) => {
        // const display = item.id === selectedId ? "none" : '';
        const display = item.id === selectedId ? 'flex' : 'none';

        return (
            <Item
                item={item}
                onPress={() => setSelectedId(item.id)}
                style={{ display }}
            />
        );
    };

    if (isLoaded) {
        return (
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.major_name}
                    extraData={selectedId}
                />
            </SafeAreaView>
        );
    }
    else {
        return (
            <SafeAreaView style={styles.container}>
                {/* <FlatList
                    data={DATA}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    extraData={selectedId}
                /> */}
                <Loading message={'Đang tải bộ lọc'}/>
            </SafeAreaView>
        )
    }

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