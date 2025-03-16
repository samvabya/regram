import { View, Image } from "react-native";
import React from "react";

const userpic = ({imageUrl = "https://images.wsj.net/im-735617?width=1280&size=1"}) => {
  return (
      <Image
        source={{
          uri: imageUrl,
        }}
        style={{ width: 40, height: 40, borderRadius: 50 }}
      />
  );
};

export default userpic;
