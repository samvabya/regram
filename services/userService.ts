import { supabase } from "@/utils/supabase";

export const getUserData = async (userId: any) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

    if (error) {
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: true,
      data,
    };
};

export const getUserPosts = async (userId: any, limit: number = 10) => {
  console.log(userId)
  const { data, error } = await supabase
  .from("posts")
  .select("*, user: users(id, name, image), postLikes(*), comments(count)")
  .eq("userId", userId)
  .order("created_at", { ascending: false })
  .limit(limit);

    if (error) {
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: true,
      data,
    };
};
