import { View, Image, StatusBar, Alert } from "react-native";

const index = () => {
  return (
    <View className="flex-1 items-center justify-center bg-secondary">
      <StatusBar className="bg-secondary" barStyle="dark-content" />
      <Image
        source={require("../assets/images/regram.png")}
        style={{ width: 150, height: 50, objectFit: "contain" }}
      />
    </View>
  );
};

export default index;
