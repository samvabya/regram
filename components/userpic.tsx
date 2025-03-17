import { View, Image } from "react-native";
import React from "react";
import { getUserImageSrc } from "@/services/imageService";

const userpic = ({imageUrl}: {imageUrl: any}) => {
  return (
      <Image
        source={getUserImageSrc(imageUrl)}
        style={{ width: 40, height: 40, borderRadius: 50 }}
      />
  );
};

export default userpic;
