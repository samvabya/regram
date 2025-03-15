import { View, Image } from "react-native";
import React from "react";

const userpic = () => {
  return (
      <Image
        source={{
          uri: "https://images.wsj.net/im-735617?width=1280&size=1",
        }}
        style={{ width: 40, height: 40, borderRadius: 50 }}
      />
  );
};

export default userpic;
