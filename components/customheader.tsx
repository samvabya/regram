import { View, Text, Alert } from "react-native";
import React from "react";
import { IconButton } from "react-native-paper";
import { supabase } from "@/utils/supabase";
import { useAuth } from "@/contexts/AuthContext";

const CustomHeader = ({
  title,
  logoutBtnShown = false,
}: {
  title: string;
  logoutBtnShown?: boolean;
}) => {
  const { setAuth } = useAuth() as { setAuth: (user: any) => void };
  const logout = async () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          const { error } = await supabase.auth.signOut();
          if (error) {
            Alert.alert("Error", error.message);
          }
          setAuth(null);
        },
      },
    ]);
  };

  return (
    <View className="flex-row items-center">
      <View className="flex-1 flex-col">
        <Text
          className="ml-10 mt-6"
          style={{ fontFamily: "Poppins_400Regular", fontSize: 30 }}
        >
          {title}
        </Text>
      </View>
      {logoutBtnShown && (
        <View className="flex mr-6">
          <IconButton
            icon={require("../assets/icons/logout.png")}
            iconColor="crimson"
            size={20}
            onPress={() => {
              logout();
            }}
          />
        </View>
      )}
    </View>
  );
};
export default CustomHeader;
