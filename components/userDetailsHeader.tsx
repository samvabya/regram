import { View, Text, Image, Pressable } from "react-native";
import React, { useState } from "react";
import { getUserImageSrc } from "@/services/imageService";
import { Button } from "react-native-paper";
import { router } from "expo-router";

export default function UserDetailsHeader({user, editable = false}: {user: any, editable?: boolean}) {

  const edit=()=> {router.push({
    pathname: "/newPic",
    params: {
      id: user.id
    }
  })}


  return (
    <View className=" items-center justify-center mt-10">
      <Pressable onPress={edit} disabled={!editable}>
      <Image
        source={getUserImageSrc(user.image)}
        style={{ width: 200, height: 200, borderRadius: 100 }}
      />
      </Pressable>
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
      {editable && <Button
      className="mb-6 -mt-2"
        mode="contained"
        buttonColor="#ead7c3"
        textColor="#463f3a"
        icon={"pencil"}
        onPress={edit}
        >
          Edit
        </Button>
        }
    </View>
  );
}
