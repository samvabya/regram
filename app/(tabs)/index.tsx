import {
  View,
  Text,
  StatusBar,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import "../../global.css";
import HomeHeader from "@/components/homeheader";
import PostItem from "@/components/postItem";
import StoryItem from "@/components/storyItem";
import CreateContent from "@/components/createContent";
import { fetchPosts } from "@/services/postService";
import { supabase } from "@/utils/supabase";
import { getUserData } from "@/services/userService";

var limit = 0;
const index = () => {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular: require("../../assets/fonts/Poppins-Regular.ttf"),
    Poppins_500Medium: require("../../assets/fonts/Poppins-Medium.ttf"),
    Poppins_700Bold: require("../../assets/fonts/Poppins-Bold.ttf"),
  });

  const [posts, setPosts] = useState<any>([]);
  const [hasMore, setHasMore] = useState(true);

  const handlePostEvent = async (payload: any) => {
    // console.log(payload);
    if (payload.eventType == "INSERT" && payload.new.id) {
      let newPost = { ...payload.new };
      let res = await getUserData(newPost.userId);
      newPost.postLikes = [];
      newPost.comments = [{count: 0}];
      newPost.user = res.success ? res.data : {};
      setPosts((prevPosts: any) => [newPost, ...prevPosts]);
    }
    if(payload.eventType == "DELETE" && payload.old.id) {
      setPosts((prevPosts: any) => {
        return prevPosts.filter((post: any) => post.id != payload.old.id);
      });
    }
  };

  useEffect(() => {
    let postChannel = supabase
      .channel("posts")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "posts",
        },
        handlePostEvent
      )
      .subscribe();

    // getPosts();

    return () => {
      supabase.removeChannel(postChannel);
    };
  }, []);

  const getPosts = async () => {
    if (!hasMore) {
      return;
    }

    limit = limit + 4;
    let res = await fetchPosts(limit);
    if (res.success && res.data) {
      if (posts.length === res.data.length) {
        setHasMore(false);
      }
      setPosts(res.data);
    }
  };
  return (
    <View className="flex-1 bg-secondary">
      <StatusBar className="bg-secondary" barStyle="dark-content" />
      {/* <ScrollView showsHorizontalScrollIndicator={false}> */}

      <View />
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <PostItem item={item} />}
        ListHeaderComponent={
          <View>
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
            <View className="mt-4"/>
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
        ListFooterComponent={
          hasMore ? (
            <View>
              <ActivityIndicator className="mt-4 color-tertiary" size="large" />
            </View>
          ) : (
            <View className="items-center justify-center mt-4">
              <Text className="text-zinc-600 text-2xl font-bold">Oops!</Text>
              <Text className="text-grey-500">You have caught up on posts</Text>
            </View>
          )
        }
        onEndReached={() => {
          getPosts();
          console.log("Reached the end");
        }}
        onEndReachedThreshold={0}
      />
      {/* </ScrollView> */}
    </View>
  );
};

export default index;
