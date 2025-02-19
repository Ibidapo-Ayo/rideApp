import { View, Text, Image, ImageSourcePropType } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { icons } from "@/constants";

const TabIcons = ({
  focused,
  source,
}: {
  focused: boolean;
  source: ImageSourcePropType;
}) => {
  return (
    <View
      className={`flex justify-center items-center rounded-full ${focused ? "bg-general-300" : ""}`}
    >
      <View
        className={`rounded-full flex w-12 h-12 items-center justify-center ${focused ? "bg-general-400" : ""}`}
      >
        <Image
          source={source}
          className="w-7 h-7"
          resizeMode="contain"
          tintColor={"white"}
        />
      </View>
    </View>
  );
};

const RootGroup = () => {
  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "white",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#333",
          display: "flex",
          alignItems: "stretch", 
          justifyContent: "space-between", 
          flexDirection: "row",
          marginHorizontal: 20,
          marginBottom: 20,
          paddingTop: 10,
          paddingBottom: 10,
          height: 60,
          borderRadius: 50, 
          position: "absolute"
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcons focused={focused} source={icons.home} />
          ),
        }}
      />
      <Tabs.Screen
        name="rides"
        options={{
          title: "",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcons focused={focused} source={icons.list} />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcons focused={focused} source={icons.chat} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcons focused={focused} source={icons.profile} />
          ),
        }}
      />
    </Tabs>
  );
};

export default RootGroup;
