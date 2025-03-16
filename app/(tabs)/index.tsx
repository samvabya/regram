import {
  View,
  Text,
  StatusBar,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import "../../global.css";
import Userpic from "@/components/userpic";
import HomeHeader from "@/components/homeheader";
import PostItem from "@/components/postItem";
import StoryItem from "@/components/storyItem";
import { useAuth } from "@/contexts/AuthContext";
import { getUserImageSrc } from "@/services/imageService";
import { Icon, TouchableRipple } from "react-native-paper";
import CreateContent from "@/components/createContent";
import { fetchPosts } from "@/services/postService";

var limit = 0;
const index = () => {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular: require("../../assets/fonts/Poppins-Regular.ttf"),
    Poppins_500Medium: require("../../assets/fonts/Poppins-Medium.ttf"),
    Poppins_700Bold: require("../../assets/fonts/Poppins-Bold.ttf"),
  });

  const { user } = useAuth() as { user: any };
  const [posts, setPosts] = useState<any>([]);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    limit=limit+10;
    let res = await fetchPosts(limit);
    if(res.success) {
      setPosts(res.data);
    }
  };

  return (
    <View className="flex-1 bg-secondary">
      <StatusBar className="bg-secondary" barStyle="dark-content" />
      <ScrollView showsHorizontalScrollIndicator={false}>
        <HomeHeader />

        <ScrollView horizontal>
          <View className="ml-10" />
          <FlatList
            scrollEnabled={false}
            data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
            renderItem={({ index }) => <StoryItem item={index} />}
            horizontal
          />
          <View className="ml-10" />
        </ScrollView>

        <View className="mt-4" />
        // posts
        <FlatList
          scrollEnabled={false}
          data={posts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <PostItem item={item} />}
          ListHeaderComponent={
            <View>
              <CreateContent />
              <View className="ml-10">
                <Text
                  style={{ fontFamily: "Poppins_400Regular", fontSize: 18 }}
                  className="text-accent"
                >
                  Posts
                </Text>
              </View>
            </View>
          }
        />
      </ScrollView>
    </View>
  );
};

export default index;
