import React from "react";
import { useAppSelector } from "../../app/hooks";
import { postList, postStatus } from "../../features/post/postSlice";
import { SimpleGrid, Box, Spinner, Text } from "@chakra-ui/react";
import Post from "../Post/Post";

const PostsContainer = ({
  setEditPostId,
}: {
  setEditPostId: React.Dispatch<React.SetStateAction<string | undefined>>;
}) => {
  const posts = useAppSelector(postList);
  const postsStatus = useAppSelector(postStatus);

  return (
    <Box flex="1" mb={{ base: 8, md: 0 }}>
      {postsStatus === "loading" ? (
        <React.Fragment>
          <Spinner />
          <Text>Loading all posts...</Text>
        </React.Fragment>
      ) : (
        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          spacingY={8}
          spacingX={{ sm: 4 }}
        >
          {posts?.map((post) => (
            <Post key={post.id} post={post} setEditPostId={setEditPostId} />
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default PostsContainer;
