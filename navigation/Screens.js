import React from "react";
import { Easing, Animated, Dimensions, View } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Block } from "galio-framework";

// screens
import Home from "../screens/Home";
import Onboarding from "../screens/Onboarding";
import Pro from "../screens/Pro";
import Profile from "../screens/Profile";
import Register from "../screens/Register";
import Elements from "../screens/Elements";
import Articles from "../screens/Articles";
import Login from "../screens/Login";
import ListJobs from "../screens/ListJobs";
import EditProfile from "../screens/EditProfile";

// drawer
import CustomDrawerContent from "./Menu";

// header for screens
import { Icon, Header, ListRecruitmentNews, RecruitmentNewsSearchResult } from "../components";
import { argonTheme, tabs } from "../constants";
import RecruitmentNews from "../screens/RecruitmentNews";
import * as API from "../api/endpoints"
import Apply from "../screens/Apply";
import SearchResult from "../screens/SearchResult";
import FilterScreen from "../screens/FilterScreen";
import FilterScreenItem from "../screens/FilterScreenItem";
const axios = require('axios').default;

const { width } = Dimensions.get("screen");

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function ElementsStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Elements"
        component={Elements}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Elements" navigation={navigation} scene={scene} />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" }
        }}
      />
      <Stack.Screen
        name="Pro"
        component={Pro}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title=""
              back
              white
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      />
    </Stack.Navigator>
  );
}

function ArticlesStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Articles"
        component={Articles}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Bài viết" navigation={navigation} scene={scene} />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" }
        }}
      />
      <Stack.Screen
        name="Pro"
        component={Pro}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title=""
              back
              white
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      />
    </Stack.Navigator>
  );
}

function ProfileStack(props) {
  return (
    <Stack.Navigator initialRouteName="Profile" mode="card" headerMode="screen">
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              transparent
              // white
              back
              title="Hồ sơ cá nhân"
              navigation={navigation}
              scene={scene}
            />
          ),
          // headerTransparent: true,
          cardStyle: { backgroundColor: "#FFFFFF" }
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              transparent
              // white
              back
              title="Chỉnh sửa hồ sơ"
              navigation={navigation}
              scene={scene}
            />
          ),
          // headerTransparent: true,
          cardStyle: { backgroundColor: "#FFFFFF" }
        }}
      />
      <Stack.Screen
        name="Pro"
        component={Pro}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title=""
              back
              white
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      />
    </Stack.Navigator>
  );
}

function ListJobsStack(props) {
  return (
    <Stack.Navigator initialRouteName="Apply" mode="card" headerMode="screen">
      <Stack.Screen
        name="ListJobs"
        component={ListJobs}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              // transparent
              // white
              // search
              title="Danh sách bài đăng"
              navigation={navigation}
              scene={scene}
            />
          ),
          // headerTransparent: true,
          cardStyle: { backgroundColor: "#FFFFFF" }
        }}
      />
      <Stack.Screen
        name="ListRecruitmentNews"
        component={ListRecruitmentNews}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              // transparent
              // white
              // search
              back
              title="Danh sách bài đăng"
              navigation={navigation}
              scene={scene}
            />
          ),
          // headerTransparent: true,
          cardStyle: { backgroundColor: "#FFFFFF" }
        }}
      />
      <Stack.Screen
        name="RecruitmentNews"
        component={RecruitmentNews}
        option={{
          header: ({ navigation, scene }) => (
            <Header
              title="Chi tiết bài đăng"
              back
              white
              // transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      />
      <Stack.Screen
        name="FilterScreen"
        component={FilterScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              title="Lọc"
              navigation={navigation}
              scene={scene}
            />
          ),
          // headerTransparent: true,
          cardStyle: { backgroundColor: "#FFFFFF" }
        }}
      />
      <Stack.Screen
        name="FilterScreenItem"
        component={FilterScreenItem}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              title="Lọc"
              navigation={navigation}
              scene={scene}
            />
          ),
          // headerTransparent: true,
          cardStyle: { backgroundColor: "#FFFFFF" }
        }}
      />
    </Stack.Navigator>
  );
}

function HomeStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Trang chủ"
              // tabs={tabs.jobs}
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" }
        }}
      />
      <Stack.Screen
        name="Pro"
        component={Pro}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title=""
              back
              white
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      />
      <Stack.Screen
        name="RecruitmentNews"
        component={RecruitmentNews}
        option={{
          header: ({ navigation, scene }) => (
            <Header
              title="Chi tiết bài đăng"
              back
              white
              // transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      />
      <Stack.Screen
        name="Apply"
        component={Apply}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              // transparent
              // white
              back
              title="Ứng tuyển"
              navigation={navigation}
              scene={scene}
            />
          ),
          // headerTransparent: true,
          cardStyle: { backgroundColor: "#FFFFFF" }
        }}
      />
      <Stack.Screen
        name="Search"
        component={SearchResult}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              title="Tìm kiếm"
              navigation={navigation}
              scene={scene}
            />
          ),
          // headerTransparent: true,
          cardStyle: { backgroundColor: "#FFFFFF" }
        }}
      />
      <Stack.Screen
        name="RecruitmentNewsSearchResult"
        component={RecruitmentNewsSearchResult}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              title="Kết quả tìm kiếm"
              navigation={navigation}
              scene={scene}
            />
          ),
          // headerTransparent: true,
          cardStyle: { backgroundColor: "#FFFFFF" }
        }}
      />
      <Stack.Screen
        name="FilterScreen"
        component={FilterScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              title="Lọc"
              navigation={navigation}
              scene={scene}
            />
          ),
          // headerTransparent: true,
          cardStyle: { backgroundColor: "#FFFFFF" }
        }}
      />
      <Stack.Screen
        name="FilterScreenItem"
        component={FilterScreenItem}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              title="Lọc"
              navigation={navigation}
              scene={scene}
            />
          ),
          // headerTransparent: true,
          cardStyle: { backgroundColor: "#FFFFFF" }
        }}
      />
    </Stack.Navigator>
  );
}

export default function OnboardingStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="none">
      <Stack.Screen
        name="Onboarding"
        component={Onboarding}
        option={{
          headerTransparent: true
        }}
      />
      <Stack.Screen name="App" component={AppStack} />
    </Stack.Navigator>
  );
}

function AppStack(props) {
  return (
    <Drawer.Navigator
      style={{ flex: 1 }}
      drawerContent={props => <CustomDrawerContent {...props} />}
      drawerStyle={{
        backgroundColor: "white",
        width: width * 0.8
      }}
      drawerContentOptions={{
        activeTintcolor: "white",
        inactiveTintColor: "#000",
        activeBackgroundColor: "transparent",
        itemStyle: {
          width: width * 0.75,
          backgroundColor: "transparent",
          paddingVertical: 16,
          paddingHorizonal: 12,
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          overflow: "hidden"
        },
        labelStyle: {
          fontSize: 18,
          marginLeft: 12,
          fontWeight: "normal"
        }
      }}
      initialRouteName="Home"
    >
      <Drawer.Screen name="Home" component={HomeStack} />
      <Drawer.Screen name="Profile" component={ProfileStack} />
      <Drawer.Screen name="Register" component={Register} />
      <Drawer.Screen name="Login" component={Login} />
      <Drawer.Screen name="Elements" component={ElementsStack} />
      <Drawer.Screen name="Articles" component={ArticlesStack} />
      <Drawer.Screen name="ListJobs" component={ListJobsStack} />
      <Drawer.Screen name="RecruitmentNews" component={RecruitmentNews} />
      <Drawer.Screen name="EditProfile" component={EditProfile} />
      {/* <Drawer.Screen name="Apply" component={ApplyStack} /> */}
      
    </Drawer.Navigator>
  );
}

