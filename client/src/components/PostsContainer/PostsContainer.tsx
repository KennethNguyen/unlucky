import React from "react";
import { useAppSelector } from "../../app/hooks";
import { postList, postStatus } from "../../features/post/postSlice";
import { SimpleGrid, Box } from "@chakra-ui/react";
import Post from "../Post/Post";

const a = [1, 2, 3, 4, 5];

const PostsContainer = () => {
  const posts = useAppSelector(postList);
  const postsStatus = useAppSelector(postStatus);

  return (
    <Box flex="1" mb={{ base: 8, md: 0 }}>
      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        spacingY={8}
        spacingX={{ sm: 4 }}
      >
        {a.map((element) => (
          <Post key={element} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default PostsContainer;
