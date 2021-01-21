import { Block, Input } from 'galio-framework'
import React, { useState } from "react";
import { SafeAreaView, View, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';

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
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
];

prepareItem = async () => {
    const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
    try {
        const response = await axios({
            method: 'GET',
            url: API.LIST_MAJOR,
            headers
        })

        if (response.status == 200) {
            const majors = response.data
            setItems(...majors)
        }
    } catch (error) {
        console.log(error)
    }
}

const Item = ({ item, onPress, style }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
        <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
);

const FilterScreen = (props) => {

    const [selectedId, setSelectedId] = useState(null);

    const renderItem = ({ item }) => {
        const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";

        return (
            <Item
                item={item}
                onPress={() => setSelectedId(item.id)}
                style={{ backgroundColor }}
            />
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
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
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
});

export default FilterScreen