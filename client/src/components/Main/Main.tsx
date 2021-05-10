import React from "react";
import PostForm from "../PostForm/PostForm";
import { Flex } from "@chakra-ui/react";
import PostsContainer from "../PostsContainer/PostsContainer";

const Main = () => {
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
      <PostsContainer />
      <PostForm />
    </Flex>
  );
};

export default Main;
