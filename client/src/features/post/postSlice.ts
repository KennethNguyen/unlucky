import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { fetchPosts, createPost, updatePost } from "../../api/api";
import { IPostForm } from "../../types/FormTypes";
import { IPost, IComment } from "../../types/PostTypes";

export interface PostState {
  posts: IPost[] | null;
  status: "idle" | "loading" | "failed" | "success";
  formStatus: "idle" | "loading" | "failed" | "success";
}

const initialState: PostState = {
  posts: [],
  status: "idle",
  formStatus: "idle",
};

export const getPosts = createAsyncThunk<IPost[]>(
  "posts/getPosts",
  async () => {
    try {
      const response = await fetchPosts();
      const fetchedPosts = response.data;
      // reformat the returned data from api call
      return fetchedPosts as IPost[];
    } catch (error) {
      // the last 'error' is the message return value of the api upon an error
      throw new Error(error.response.data.error);
    }
  }
);

// { state: RootState }
export const createNewPost = createAsyncThunk<IPost, IPostForm>(
  "posts/createNewPost",
  async (formData: IPostForm) => {
    try {
      const response = await createPost(formData);
      const createdPost = response.data;
      return createdPost as IPost;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  }
);

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPosts.fulfilled, (state, { payload }) => {
      state.posts = payload;
      state.status = "idle";
    });
    builder.addCase(getPosts.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(createNewPost.fulfilled, (state, { payload }) => {
      state.posts?.push(payload);
      state.formStatus = "idle";
    });
    builder.addCase(createNewPost.pending, (state) => {
      state.formStatus = "loading";
    });
  },
});

export const postStatus = (state: RootState) => state.post.status;
export const postList = (state: RootState) => state.post.posts;
export const postFormStatus = (state: RootState) => state.post.formStatus;

export default postSlice.reducer;
