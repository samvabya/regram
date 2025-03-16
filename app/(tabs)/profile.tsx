import { View, Text, StatusBar, ScrollView, Image, Alert } from "react-native";
import React from "react";
import CustomHeader from "@/components/customheader";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/utils/supabase";
import { getUserImageSrc } from "@/services/imageService";
import { Button } from "react-native-paper";

const profile = () => {
  const {user} = useAuth() as { user: any  };
  return (
    <View className="flex-1 bg-secondary">
      <StatusBar className="bg-secondary" barStyle="dark-content" />
      <ScrollView>
        <CustomHeader title="Profile" logoutBtnShown={true} />

        <View className=" items-center justify-center mt-10">
          <Image
            source={getUserImageSrc(user.image)}
            style={{ width: 200, height: 200, borderRadius: 100 }}
          />
          <Text
          className="text-tertiary mt-4 px-6 mb-6"
          style={{ fontFamily: "Poppins_700Bold", fontSize: 30 }}
        >
          {user?.name}
        </Text>

        <Button
        mode="contained"
        buttonColor="#ead7c3"
        textColor="#463f3a"
        icon={"pencil"}
        onPress={() => {}}
        >
          Edit
        </Button>
        </View>
      </ScrollView>
    </View>
  );
};

export default profile;
