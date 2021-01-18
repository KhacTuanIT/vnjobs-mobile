import React from "react";
import { StyleSheet, Dimensions, ScrollView } from "react-native";
import { Block, theme, Text, Icon } from "galio-framework";

import { Card, Header, Button, HotMajor, ListRecruitmentNews } from "../components";
import articles from "../constants/articles";
import localStorageUtils from '../utils/local-store';
import * as API from '../api/endpoints';
const axios = require('axios').default;

const { width } = Dimensions.get("screen");

class ListJobs extends React.Component {
  state = {
    isLoading: false,
    majors: null,
    recruitmentNews: null,
  };

  async componentDidMount() {
    this.setState({ isLoading: true })
    await this.getMajors()
    await this.getRecruitmentNews()
  }

  async getMajors() {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    try {
      const response = await axios({
        method: 'GET',
        url: `${API.LIST_MAJOR}`,
        headers: headers,
      });
      // console.log(response);
      if (response.status === 200) {
        console.log("[ListJob] FETCH API (GETTING LIST MAJOR] SUCCESSFULLY");
        const majors = response.data.data;
        // console.log(majors);
        this.setState({ majors: majors, isLoading: false })
      }
    } catch (error) {
      console.log(error);
      console.log(error.response.data);
      // console.log(error.response.status);
      if (error.response) {
        console.log("loi rui | Profile");
        if (error.response.status === 401 || error.response.status === 403) {
          //Tach 403/401 ra, neu gap 401 & 403 gi do thi vang ra bat dang nhap lai
          // this.navigateToScreen('Login');
        }
        else if (error.response.status === 404) {

        }
        else if (error.response.status === 405) {
          //method not allow
        }
        else if (error.response.status === 500) {
          //Server error, check return message and debug

        }
      }
      else if (error.message === 'Network Error') {

      }
    }
  }

  async getRecruitmentNews() {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    try {
      const response = await axios({
        method: 'GET',
        url: `${API.LIST_RECRUITMENT_NEWS_SORT_BY_MAJOR}`,
        headers: headers,
      });
      // console.log(response);
      if (response.status === 200) {
        console.log("[ListJob] FETCH API (GETTING LIST RECRUITMENT_NEWS] SUCCESSFULLY");
        const recruitmentNews = response.data;
        this.setState({ recruitmentNews: recruitmentNews, isLoading: false })
      }
    } catch (error) {
      console.log(error);
      console.log(error.response.data);
      // console.log(error.response.status);
      if (error.response) {
        console.log("loi rui | Profile");
        if (error.response.status === 401 || error.response.status === 403) {
          //Tach 403/401 ra, neu gap 401 & 403 gi do thi vang ra bat dang nhap lai
          // this.navigateToScreen('Login');
        }
        else if (error.response.status === 404) {

        }
        else if (error.response.status === 405) {
          //method not allow
        }
        else if (error.response.status === 500) {
          //Server error, check return message and debug

        }
      }
      else if (error.message === 'Network Error') {

      }
    }
  }

  render() {
    const { recruitmentNews } = this.state
    console.log("RECRUIT:STT||" + recruitmentNews);
    return (
      <Block flex center style={styles.home}>
        <Block style={{ marginBottom: theme.SIZES.BASE }}>
          <Header
            tabs={tabs.categories}
            search
            title="Danh sách việc làm"
            navigation={this.props.navigation}
          />
        </Block>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.articles}
        >
          <HotMajor data={this.state.majors} />
          <Block row flex style={styles.filterBar}>
            <Text style={styles.leftFilterText}>Có 1000 công việc phù hợp</Text>
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
                return (<ListRecruitmentNews title={value.major_name} news={value.recruitment_news} key={key} />)
              })
              : <ListRecruitmentNews title="Chưa có việc làm mới" />
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

export default ListJobs;
