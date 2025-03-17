import { View, Text, Image } from "react-native";
import React from "react";
import { getUserImageSrc } from "@/services/imageService";
import { Button } from "react-native-paper";

export default function UserDetailsHeader({user, showEditBtn = false}: {user: any, showEditBtn?: boolean}) {
  return (
    <View className=" items-center justify-center mt-10">
      <Image
        source={getUserImageSrc(user.image)}
        style={{ width: 200, height: 200, borderRadius: 100 }}
      />
      <Text
        className="text-tertiary mt-4 px-6 mb-2"
        style={{ fontFamily: "Poppins_700Bold", fontSize: 30 }}
      >
        {user?.name}
      </Text>
      <Text
        className="text-grey-300 mb-6"
        style={{ fontFamily: "Poppins_400Regular", fontSize: 12 }}
      >
        regram user
      </Text>
      {showEditBtn && <Button
        mode="contained"
        buttonColor="#ead7c3"
        textColor="#463f3a"
        icon={"pencil"}
        onPress={() => {}}
        >
          Edit
        </Button>}
    </View>
  );
}
