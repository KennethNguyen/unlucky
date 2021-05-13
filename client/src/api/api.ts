import axios from "axios";
import { IAuthForm, IDemoUser } from "../types/FormTypes";

// const API = axios.create({
//   baseURL: "https://unluckyapi.herokuapp.com",
// });

// send token back to backend to verify that we are logged in
// API.interceptors.request.use(
//   (req) => {
//     if (localStorage.getItem("profile")) {
//       req.headers.Authorization = `Bearer ${
//         JSON.parse(localStorage.getItem("profile")).token
//       }`;
//     }
//     return req;
//   },
//   (error) => {
//     console.log(error);
//   }
// );

const url = axios.create({ baseURL: "http://localhost:8000" });

export const login = (formData: IAuthForm | IDemoUser) =>
  url.post("/users/login", formData);
export const signUp = (formData: IAuthForm) =>
  url.post("/users/signup", formData);

// export const fetchPosts = () => axios.get(url);
// export const createPost = (newPost) => axios.post(url, newPost)
// export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost)
// export const deletePost = (id) => axios.delete(`${url}/${id}`)
// export const likePost = (id) => axios.patch(`${url}/${id}/likePost`)

// export const fetchPosts = () => API.get("/posts");
// export const createPost = (newPost) => API.post("/posts", newPost);
// export const updatePost = (id, updatedPost) =>
//   API.patch(`/posts/${id}`, updatedPost);
// export const deletePost = (id) => API.delete(`/posts/${id}`);
// export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

// export const signIn = (formData) => API.post("/user/signin", formData);
// export const signUp = (formData) => API.post("/user/signup", formData);
