import { Block, Input, Icon } from 'galio-framework'
import React, { useState } from "react";
import { useEffect } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Loading } from '../components';
import { city, work_type } from '../constants';
import * as API from "../api/endpoints";
const localStorageUtils = require('../utils/local-store');
const axios = require('axios').default;

const saveFilter = async (filterType, filterData) => {
    const filter = { filterType, filterData }
    localStorageUtils.saveFilterToLS(filter);
}

const Item = ({ item, onPress, style, type }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, styles.blockItem]}>
        {
            (type.localeCompare('major') == 0) &&
            <Text style={styles.title}>{item.major_name}</Text>
        }
        {
            (type.localeCompare('city') == 0) &&
            <Text style={styles.title}>{item.name}</Text>
        }
        {
            (type.localeCompare('work_type') == 0) &&
            <Text style={styles.title}>{item.name}</Text>
        }
        {/* <Text style={styles.title}>'heelo'</Text> */}
        <Icon name="check" family="AntDesign" color={'#29DBA0'} size={16} style={[style]} />
    </TouchableOpacity>
);

const FilterScreenItem = (props) => {

    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [typeItem, setTypeItem] = useState(null);
    const [localFilterMajor, setLocalFilterMajor] = useState(null)
    const [localFilterCity, setLocalFilterCity] = useState(null)
    const [localFilterWorkType, setLocalFilterWorkType] = useState(null)
    const { navigation, route } = props



    useEffect(() => {

        const getFilter = async (filter) => {
            const major = await localStorageUtils.getFilterFromLS('major')
            const city = await localStorageUtils.getFilterFromLS('city')
            const workType = await localStorageUtils.getFilterFromLS('work_type')
            console.log("Filter DATA");
            console.log(major.major_name ? major.major_name : 'Khong tim thay major name');
            console.log(city.name ? city.name : 'Khong tim thay city name');
            console.log(workType.name ? workType.name : 'Khong tim thay worktype name');
            setLocalFilterMajor(major)
            setLocalFilterCity(city)
            setLocalFilterWorkType(workType)
        }

        getFilter()

        const prepareItem = async () => {
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
                    setIsLoaded(true)
                    setData(majors.data)
                }
            } catch (error) {
                console.log(error)
                setIsLoaded(false)
            }
        }

        const { item } = route.params

        switch (item.id) {
            
            case 'major':
                setTypeItem('major')
                prepareItem()
                break;
            case 'city':
                setIsLoaded(true)
                setTypeItem('city')
                break;
            case 'work_type':
                setIsLoaded(true)
                setTypeItem('work_type')
                break;
            default:
                console.log("vo case default");
                break;
        }

    }, [])

    const renderItem = ({ item }) => {
        // const display = item.id === selectedId ? "none" : '';
        const display = item.id === selectedId ? 'flex' : 'none';

        return (
            <Item
                item={item}
                onPress={() => {
                    setSelectedId(item.id)
                    const filter = { type: typeItem, data: item }
                    saveFilter(typeItem, filter)
                }}
                style={{ display }}
                type={typeItem}
            />
        );
    };

    if (isLoaded) {
        switch (typeItem) {
            case 'major':
                return (
                    <SafeAreaView style={styles.container}>
                        <FlatList
                            data={data}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.id.toString()}
                            extraData={selectedId}
                        />
                    </SafeAreaView>
                );
            case 'city':
                return (
                    <SafeAreaView style={styles.container}>
                        <FlatList
                            data={city}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.id.toString()}
                            extraData={selectedId}
                        />
                    </SafeAreaView>
                );
            case 'work_type':
                return (
                    <SafeAreaView style={styles.container}>
                        <FlatList
                            data={work_type}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.id.toString()}
                            extraData={selectedId}
                        />
                    </SafeAreaView>
                );
            default:
                return (
                    <Text>Lỗi - Không tải được bộ lọc</Text>
                );
        }
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
                <Loading message={'Đang tải bộ lọc'} />
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

export default FilterScreenItem