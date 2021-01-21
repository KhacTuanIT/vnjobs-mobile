import React from "react";
import { StyleSheet, Dimensions, ScrollView } from "react-native";
import { Block, theme, Text, Icon } from "galio-framework";

import { Card, Header, Button, HotMajor, ListRecruitmentNews } from "../components";
import articles from "../constants/articles";
import localStorageUtils from '../utils/local-store';
import * as API from '../api/endpoints';
import ArInput from "../components/Input";
import RecruitmentNewsSearchResult from "../components/ListRecruitment/RecruitmentNewsSearchResult";
const axios = require('axios').default;

const { width } = Dimensions.get("screen");

class SearchResult extends React.Component {

  render() {
    const {route, navigation} = this.props
    const {data, title} = route.params
    const recruitmentNews = data.data
    console.log(recruitmentNews)
    return (
        <Block flex center style={styles.home}>
            <Block style={{ marginBottom: theme.SIZES.BASE }}>
            <Header
                // tabs={tabs.categories}
                search
                // white
                // transparent
                title="Danh sách việc làm"
                navigation={this.props.navigation}
                scene={this.props.scene}
            />
            </Block>
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
                >
                Filter
                </Button>
            </Block>
            <Block style={styles.blockJobs}>
                {(recruitmentNews != null && recruitmentNews.length > 0) ?
                recruitmentNews.map((value, key) => {
                    return (<RecruitmentNewsSearchResult title={title} news={value} key={key} />)
                })
                : <RecruitmentNewsSearchResult title="Chưa có việc làm mới" />
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
