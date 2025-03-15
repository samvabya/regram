import { View, Text, Image } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const _layout = () => {
  return (
    <Tabs
    screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#463f3a",
        tabBarStyle: {
            elevation: 0,
            borderTopWidth: 0,
            height: 60,
            paddingTop: 10,backgroundColor: "#fbf6ef",
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Image source={require("../../assets/icons/home.png")} style={{ width: size, height: size, tintColor: color }} />
          ),
        }}
      />
      <Tabs.Screen
        name="chats"
        options={{
          title: "Chats",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Image source={require("../../assets/icons/chats.png")} style={{ width: size, height: size, tintColor: color }} />
          ),
        }}
      />
      <Tabs.Screen
        name="headsup"
        options={{
          title: "Heads Up",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Image source={require("../../assets/icons/headsup.png")} style={{ width: size, height: size, tintColor: color }} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Image source={require("../../assets/icons/user.png")} style={{ width: size, height: size, tintColor: color }} />
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;
