import React, { useState } from "react";
import {
  Alert,
  View,
  AppState,
  StatusBar,
} from "react-native";
import { supabase } from "../utils/supabase";
import { Input } from "@rneui/themed";
import { Button } from "react-native-paper";
import HomeHeader from "@/components/homeheader";

AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          name: email.substring(0, email.indexOf("@")),
          email: email,
        },
      },
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  return (
    <View className="flex-1 bg-secondary">
      <StatusBar className="bg-secondary" barStyle="dark-content" />
      <HomeHeader iconShown={false} />
      <View className="flex-1 flex-col">
        <View className="px-8 mt-6">
          <Input
            label="Email"
            leftIcon={{ type: "font-awesome-5", name: "envelope", size: 18, color: "#b2967d", solid: true }}
            onChangeText={(text) => setEmail(text)}
            value={email}
            placeholder="email@address.com"
            autoCapitalize={"none"}
          />
          <Input
            label="Password"
            leftIcon={{ type: "font-awesome-5", name: "lock", size: 18, color: "#b2967d", solid: true  }}
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={true}
            placeholder="Password"
            autoCapitalize={"none"}
          />
        </View>
        <View className="px-10 mt-6 gap-2">
          <Button
            mode="contained"
            buttonColor="#b2967d"
            disabled={loading}
            onPress={() => signUpWithEmail()}
          >
            Sign Up
          </Button>
          <Button
            mode="text"
            textColor="#b2967d"
            disabled={loading}
            onPress={() => signInWithEmail()}
          >
            Log In
          </Button>
        </View>
      </View>
    </View>
  );
}
