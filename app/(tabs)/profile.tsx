import { View, StatusBar, ActivityIndicator, FlatList, Text } from "react-native";
import React, { useState } from "react";
import CustomHeader from "@/components/customheader";
import { useAuth } from "@/contexts/AuthContext";
import UserDetailsHeader from "@/components/userDetailsHeader";
import PostItem from "@/components/postItem";
import { getUserPosts } from "@/services/userService";

var limit = 0;
const profile = () => {
  const {user} = useAuth() as { user: any  };
  const [posts, setPosts] = useState<any>([]);
  const [hasMore, setHasMore] = useState(true);

  const getPosts = async () => {
    if (!hasMore) {
      return;
    }

    limit = limit + 4;
    let res = await getUserPosts(user.id, limit);
    if (res.success && res.data) {
      if (posts.length === res.data.length) {
        setHasMore(false);
      }
      setPosts(res.data);
    }
  };

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
            <UserDetailsHeader user={user} editable/>
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
    </View>
  );
};

export default profile;
