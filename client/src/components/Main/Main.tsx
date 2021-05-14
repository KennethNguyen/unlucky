import React, { useState, useEffect } from "react";
import { useAppDispatch } from "../../app/hooks";
import { fetchPosts } from "../../features/post/postSlice";
import PostForm from "../PostForm/PostForm";
import { Flex } from "@chakra-ui/react";
import PostsContainer from "../PostsContainer/PostsContainer";

const Main = () => {
  const [editPostId, setEditPostId] = useState<string | undefined>(undefined);

  const dispatch = useAppDispatch();

  /* fetch posts from database */
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <Flex
      minW="95%"
      align={{ base: "center", md: "flex-start" }}
      justify="center"
      direction={{ base: "column", md: "row" }}
      mb={{ base: 12, md: 6 }}
      mt={{ base: 8, md: 6 }}
      mr={{ base: 0, md: 4 }}
    >
      <PostsContainer setEditPostId={setEditPostId} />
      <PostForm editPostId={editPostId} setEditPostId={setEditPostId} />
    </Flex>
  );
};

export default Main;
