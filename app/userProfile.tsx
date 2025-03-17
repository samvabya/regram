import {
  View,
  Text,
  StatusBar,
  ActivityIndicator,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import CustomHeader from "@/components/customheader";
import { useLocalSearchParams } from "expo-router";
import { getUserData, getUserPosts } from "@/services/userService";
import UserDetailsHeader from "@/components/userDetailsHeader";
import PostItem from "@/components/postItem";

var limit = 0;
export default function UserProfile() {
  const { userId } = useLocalSearchParams();
  const [user, setUser] = useState<any>(null);
  const [startLoading, setStartLoading] = useState(true);
  const [posts, setPosts] = useState<any>([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    let res = await getUserData(userId);
    if (res.success) {
      setUser(res.data);
    }
    setStartLoading(false);
  };

  const getPosts = async () => {
    if (!hasMore) {
      return;
    }

    limit = limit + 4;
    let res = await getUserPosts(userId, limit);
    if (res.success && res.data) {
      if (posts.length === res.data.length) {
        setHasMore(false);
      }
      setPosts(res.data);
    }
  };

  if (startLoading) {
    return (
      <View>
        <ActivityIndicator className="mt-4 color-tertiary" size="large" />
      </View>
    );
  }

  if (!user) {
    return (
      <View className="flex-1 items-center justify-center mt-4">
        <Text className="text-zinc-600 text-2xl font-bold">Sorry!</Text>
        <Text className="text-grey-500">User not found</Text>
      </View>
    );
  }
  return (
    <View className="flex-1 bg-secondary">
      <StatusBar className="bg-secondary" barStyle="dark-content" />
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <PostItem item={item} />}
        ListHeaderComponent={
          <View>
            <CustomHeader title="Profile" />
            <UserDetailsHeader user={user} />
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
        }}
        onEndReachedThreshold={0}
      />
    </View>
  );
}
