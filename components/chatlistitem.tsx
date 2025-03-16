import { View, Text, Pressable, TouchableOpacity } from "react-native";
import React from "react";
import Userpic from "./userpic";

const ChatListItem = () => {
  return (
    <TouchableOpacity>
      <View className="flex-row items-center ml-10 bg-primary py-4 px-4 rounded-l-3xl mb-2">
        <Userpic />
        <View className="ml-2">
          <Text style={{ fontFamily: "Poppins_500Medium", fontSize: 16 }}>
            Xi Jingping
          </Text>
          <Text style={{ fontFamily: "Poppins_400Regular", fontSize: 12 }}>
            Chinese Democratic Republic
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ChatListItem;
