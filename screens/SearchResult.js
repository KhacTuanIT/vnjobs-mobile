import React from "react";
import { StyleSheet, Dimensions, ScrollView } from "react-native";
import { Block, theme, Text, Icon } from "galio-framework";

import { Card, Header, Button, HotMajor, ListRecruitmentNews } from "../components";
import articles from "../constants/articles";
import localStorageUtils from '../utils/local-store';
import * as API from '../api/endpoints';
import ArInput from "../components/Input";
import { RecruitmentNewsSearchResult } from "../components";
const axios = require('axios').default;

const { width } = Dimensions.get("screen");

class SearchResult extends React.Component {



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

    const { route, navigation } = this.props
    const { data, title } = route.params
    const recruitmentNews = data
    // console.log(recruitmentNews)
    return (
      <Block flex center style={styles.home}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.articles}
        >
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
  
  }
});

export default SearchResult;
