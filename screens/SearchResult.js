import React from "react";
import { StyleSheet, Dimensions, ScrollView, TouchableOpacity } from "react-native";
import { Block, theme, Text, Icon } from "galio-framework";

import { Card, Header, Button, HotMajor, ListRecruitmentNews, Input } from "../components";
import articles from "../constants/articles";
import localStorageUtils from '../utils/local-store';
import * as API from '../api/endpoints';
import ArInput from "../components/Input";
import { RecruitmentNewsSearchResult } from "../components";
const axios = require('axios').default;

const { width } = Dimensions.get("screen");

class SearchResult extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      key: ''
    }
  }

  /*
  renderContent() {
    const { route, navigation } = this.props
    const { data, loading } = route.params
    const recruitmentNews = data

    console.log(recruitmentNews);

    console.log("===========");

    console.log(loading); //temp_

    if (recruitmentNews) {
      recruitmentNews.map((value, key) => {
        console.log('run_in_here');
        return (
          <Block>
              <Text>{value.title}</Text>
          </Block>

        )
      })
    }
    else {
      return (<Text>No Result found.</Text>)
    }

  }
  */
  postAPI = async (url, data) => {

    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }

    try {
      const response = await axios({
        method: 'POST',
        url,
        headers,
        data
      })
      return response
    } catch (error) {
      console.log(error)
    }
  }

  onSearch = async() => {
    console.log(this.state.key)
    this.setState({ loadingSearching: true });
    const { route, navigation } = this.props
    if (this.state.key != '') {
      const data = {
        city: this.state.key
      }
      const major = await localStorageUtils.getFilterFromLS('major')
      const city = await localStorageUtils.getFilterFromLS('city')
      const workType = await localStorageUtils.getFilterFromLS('work_type')
      if (major !== undefined) data.major = major.major_name
      if (city !== undefined) data.city = city.name
      if (workType !== undefined) data.workType = workType.name
      data.city = this.state.key
      const url = API.SEARCH;
      this.postAPI(url, data)
        .then(res => {
          console.log(res.data.data)
          localStorageUtils.clearAllFilter();
          navigation.navigate('Search', { data: res.data.data, loading: this.state.loadingSearching })
        }).catch(err => console.log(err))
    }
    else {
      const major = await localStorageUtils.getFilterFromLS('major')
      const city = await localStorageUtils.getFilterFromLS('city')
      const workType = await localStorageUtils.getFilterFromLS('work_type')
      console.log("Filter DATA in SearchResult");

      const data = {
      }
      console.log(data)
      if (major !== undefined) data.major = major.major_name
      if (city !== undefined) data.city = city.name
      if (workType !== undefined) data.workType = workType.name
      const url = API.SEARCH;
      this.postAPI(url, data)
        .then(res => {
          console.log(res.data.data)
          localStorageUtils.clearAllFilter();
          navigation.navigate('Search', { data: res.data.data, loading: this.state.loadingSearching })
        }).catch(err => console.log(err))
    }
  }

  // getFilter = async (filter) => {
      
  //     console.log(data)
  //     if (major !== undefined || city !== undefined || workType !== undefined) {
  //       console.log(data)
  //       const url = API.SEARCH;
  //       this.postAPI(url, data)
  //         .then(res => {
  //           console.log(res.data.data)
  //           localStorageUtils.clearAllFilter();
  //           navigation.navigate('Search', { data: res.data.data, loading: this.state.loadingSearching })
  //         }).catch(err => console.log(err))
  //     }

      
  //     // console.log(major.major_name ? major.major_name : 'Khong tim thay major name');
  //     // console.log(city.name ? city.name : 'Khong tim thay city name');
  //     // console.log(workType.name ? workType.name : 'Khong tim thay worktype name');
  // }
  render() {
    /*
    const renderContent = () => {
      const {route, navigation} = this.props
      const {data, loading} = route.params
      const recruitmentNews = data.data.data
      if (recruitmentNews != null) {
        if (recruitmentNews.length > 0) {
          console.log(recruitmentNews)
          var rs = null
          rs = recruitmentNews.map((news, index) => {
            return (
              <RecruitmentNewsSearchResult 
                key={index}
                news={news} 
                navigation={navigation}
                route={route}
              />
            )
          })
          return rs
        }
        return null
      }
      return null
    }
    */

    // this.getFilter()
    const { route, navigation } = this.props
    const { data, title } = route.params
    console.log(data)
    const recruitmentNews = data;
    // console.log(recruitmentNews)
    return (
      <Block flex center style={styles.home}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.articles}
        >
          <Block flex middle>
            <Input
              onChangeText={key => { this.setState({ key: key }) }}
              value={this.state.key}
            />
            <TouchableOpacity style={styles.buttonSearch} onPress={() => this.onSearch()} >
              <Text color='#777' sizes={18}>Tìm kiếm ... </Text>
            </TouchableOpacity>

          </Block>
          <Block row flex style={styles.filterBar}>
            <Text style={styles.leftFilterText}>Kết quả tìm kiếm</Text>
            <Button
              small
              icon="filter"
              iconFamily="AntDesign"
              color="transparent"
              iconColor={"black"}
              textStyle={{ color: "black" }}
              style={styles.filterButton}
              onPress={() => navigation.navigate('FilterScreen')}
            >
              Filter
                </Button>
          </Block>
          <Block style={styles.blockJobs}>
            {
              recruitmentNews &&
              recruitmentNews.map((value, id) => {
                console.log('run_in_here');
                return (
                  <RecruitmentNewsSearchResult
                    key={id}
                    news={recruitmentNews[id]}
                    navigation={navigation}
                    route={route}
                  />

                )
              })
            }
          </Block>
        </ScrollView>
      </Block>
    );
  }
}
const styles = StyleSheet.create({
  home: {
    width: width,
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
  },
  filterBar: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftFilterText: {
    alignItems: "center",
  },
  filterButton: {
    borderWidth: 0.5,
    borderColor: "lightgrey",
    borderRadius: 7,
  },
  blockJobs: {
    // marginTop: 20,
    // paddingBottom: 20,

  },
  buttonSearch: {
    paddingHorizontal: 17,
    paddingVertical: 8,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    marginBottom: 15,
  }
});

export default SearchResult;
