import React from "react";
import { StyleSheet, Dimensions, ScrollView, TouchableOpacity } from "react-native";
import { Block, theme, Text, Icon } from "galio-framework";

import { Card, Header, Button, HotMajor, ListRecruitmentNews, Input } from "../components";
import articles from "../constants/articles";
import localStorageUtils from '../utils/local-store';
import * as API from '../api/endpoints';
import ArInput from "../components/Input";
const axios = require('axios').default;

const { width } = Dimensions.get("screen");

class ListJobs extends React.Component {
  state = {
    isLoading: false,
    majors: null,
    recruitmentNews: null,
    key: ''
  };

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

  onSearch = () => {
    console.log(this.state.key)
    this.setState({ loadingSearching: true });
    const { route, navigation } = this.props
    if (this.state.key != '') {
      const data = {
        city: this.state.key
      }
      const url = API.SEARCH;
      this.postAPI(url, data)
        .then(res => {
          console.log(res.data.data)
          navigation.navigate('Search', { data: res.data.data, loading: this.state.loadingSearching })
        }).catch(err => console.log(err))
    }
  }

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
    const { navigation, route } = this.props
    console.log("RECRUIT:STT||" + recruitmentNews);
    return (
      <Block flex center style={styles.home}>
        {/* <Block style={{ marginBottom: theme.SIZES.BASE }}>
          <Header
            // tabs={tabs.categories}
            search
            // white
            // transparent
            title="Danh sách việc làm"
            navigation={this.props.navigation}
            scene={this.props.scene}
          />
        </Block> */}
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
              onPress={() => navigation.navigate('FilterScreen')}
            >
              Filter
            </Button>
          </Block>
          <Block style={styles.blockJobs}>
            {(recruitmentNews != null && recruitmentNews.length > 0) ?
              recruitmentNews.map((value, key) => {
                return (<ListRecruitmentNews navigation={navigation} route={route} title={value.major_name} news={value.recruitment_news} key={key} />)
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
    backgroundColor: '#F1F2F1',
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

export default ListJobs;
