import React, { useState } from "react";
import { ICommentForm } from "../../types/FormTypes";
import { IPost as PostProps } from "../../types/PostTypes";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { userData } from "../../features/user/userSlice";
import {
  createComment,
  likeComment,
  deletePost,
  likePost,
  deleteComment,
} from "../../features/post/postSlice";

import {
  Avatar,
  Box,
  Flex,
  VStack,
  HStack,
  Text,
  IconButton,
  Divider,
  Button,
  InputGroup,
  Input,
  InputRightElement,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { FaThumbsUp } from "react-icons/fa";
import moment from "moment";

const initialComment: ICommentForm = {
  text: "",
};

const Post = ({
  post,
  setEditPostId,
}: {
  post: PostProps;
  setEditPostId: React.Dispatch<React.SetStateAction<string | undefined>>;
}) => {
  const {
    likes,
    comments,
    timePosted,
    edited,
    title,
    text,
    hashTag,
    postedBy,
    id,
  } = post;

  const dispatch = useAppDispatch();
  const user = useAppSelector(userData);

  const [commentText, setCommentText] = useState<ICommentForm>(initialComment);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setCommentText({ text: e.target.value });
  };

  const addNewComment = (): void => {
    dispatch(createComment({ postId: id, text: commentText }));
    setCommentText(initialComment);
  };

  return (
    <Box
      bg="#011627"
      w="90%"
      p={2}
      borderWidth={2}
      mx="auto"
      boxShadow="lg"
      rounded="md"
    >
      {/* Heading */}
      <Flex justify="center" align="center" p={2}>
        <Avatar name={postedBy.username} />
        <VStack ml={2} flex="1" align="flex-start">
          <Text>{postedBy.username}</Text>
          <Text opacity="0.6">
            {moment(timePosted).fromNow()} {edited && " - Edited"}
          </Text>
        </VStack>
        {postedBy._id === user?.id && (
          <IconButton
            aria-label="Edit post"
            icon={<EditIcon />}
            onClick={() => setEditPostId(id)}
          />
        )}
      </Flex>
      <Divider />
      {/* Content */}
      <VStack p={2} align="flex-start">
        <Text fontWeight="bold" letterSpacing="0.5px">
          {title}
        </Text>
        <Text opacity="0.9" textAlign="start">
          {text}
        </Text>
        <Text fontWeight="bold">#{hashTag}</Text>
      </VStack>
      {/* Post action buttons */}
      {/* !. is not null assertion operator; indicate that user cannot be null at this point in code */}
      <HStack p={2}>
        <Button
          leftIcon={<FaThumbsUp />}
          bg="blue.600"
          _hover={{ bg: "blue.500" }}
          variant="solid"
          size="sm"
          style={{ color: likes.includes(user!.id) ? "black" : "white" }}
          onClick={() => dispatch(likePost(id))}
        >
          {likes.length === 0 && `Like`}
          {likes.length === 1 && `${likes.length} Like`}
          {likes.length > 1 && `${likes.length} Likes`}
        </Button>
        {postedBy._id === user?.id && (
          <Button
            leftIcon={<DeleteIcon />}
            bg="red.600"
            _hover={{ bg: "red.500" }}
            variant="solid"
            size="sm"
            onClick={() => dispatch(deletePost(id))}
          >
            Delete
          </Button>
        )}
      </HStack>
      <Divider />
      {/* Post comments */}
      <Flex direction="column" justify="center" align="flex-start" p={2} ml={6}>
        {comments.map((comment) => (
          <Box mb={2} key={comment.id}>
            <Box>
              <Flex>
                <Avatar size="sm" name={comment?.userId.username} />
                <HStack ml={2} align="center">
                  <Text fontSize="sm">{comment?.userId.username}</Text>
                  <Text fontSize="sm" opacity="0.6">
                    {moment(comment?.timeCommented).fromNow()}
                  </Text>
                </HStack>
              </Flex>
              <Flex>
                <Text
                  ml={1}
                  mt={1}
                  textAlign="left"
                  opacity="0.9"
                  fontSize="md"
                >
                  {comment?.text}
                </Text>
              </Flex>
            </Box>
            <Box>
              <HStack p={2}>
                <Button
                  leftIcon={<FaThumbsUp />}
                  bg="blue.600"
                  _hover={{ bg: "blue.500" }}
                  variant="solid"
                  size="sm"
                  style={{
                    color: comment.likes.includes(user!.id) ? "black" : "white",
                  }}
                  onClick={() => dispatch(likeComment(comment.id))}
                >
                  {comment.likes.length === 0 && `Like`}
                  {comment.likes.length === 1 && `${comment.likes.length} Like`}
                  {comment.likes.length > 1 && `${comment.likes.length} Likes`}
                </Button>
                {comment.userId._id === user?.id && (
                  <IconButton
                    aria-label="Delete comment"
                    icon={<DeleteIcon />}
                    bg="red.600"
                    _hover={{ bg: "red.500" }}
                    variant="solid"
                    size="sm"
                    onClick={() =>
                      dispatch(
                        deleteComment({ postId: id, commentId: comment.id })
                      )
                    }
                  />
                )}
              </HStack>
            </Box>
          </Box>
        ))}
      </Flex>
      <Divider />
      {/* Comment input */}
      <InputGroup>
        <Input
          pl={2}
          pr={20}
          name="commentText"
          value={commentText.text}
          type="text"
          variant="flushed"
          placeholder="Comment..."
          onChange={handleChange}
        />
        <InputRightElement w={20}>
          <Button
            size="sm"
            bg="cyan.700"
            _hover={{ bg: "cyan.600" }}
            onClick={addNewComment}
          >
            Send
          </Button>
        </InputRightElement>
      </InputGroup>
    </Box>
  );
};

export default Post;
