import { View, Text, StatusBar, ScrollView, Pressable } from "react-native";
import React from "react";
import ChatListItem from "@/components/chatlistitem";
import CustomHeader from "@/components/customheader";

const chats = () => {
  return (
    <View className="flex-1 bg-secondary">
      <StatusBar className="bg-secondary" barStyle="dark-content" />
      <ScrollView>
        <CustomHeader title="Chats" />
        <View className="mt-8" />
        <ChatListItem />
        <ChatListItem />
        <ChatListItem />
        <ChatListItem />
      </ScrollView>
    </View>
  );
};

export default chats;
