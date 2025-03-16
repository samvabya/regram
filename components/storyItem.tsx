import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";

export default function StoryItem(item: any) {
  return (
    <TouchableOpacity className="mr-2">
      <Image
        source={{
          uri: `https://picsum.photos/200?random=${item.item}`,
        }}
        style={{ width: 100, height: 100, borderRadius: 20 }}
        className="mt-8 border-primary border-4"
      />
    </TouchableOpacity>
  );
}
