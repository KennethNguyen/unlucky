import React from "react";
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

const Post = () => {
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
        <Avatar name="Sasuke Uchiha" />
        <VStack ml={2} flex="1" align="flex-start">
          <Text>Username</Text>
          <Text opacity="0.6">3 hours ago</Text>
        </VStack>
        <IconButton aria-label="Edit post" icon={<EditIcon />} />
      </Flex>
      <Divider />

      {/* Content */}
      <VStack p={2} align="flex-start">
        <Text fontWeight="bold" letterSpacing="0.5px">
          Title
        </Text>
        <Text opacity="0.9" textAlign="start">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </Text>
        <Text fontWeight="bold">#Hashtag</Text>
      </VStack>

      {/* Post action buttons */}
      <HStack p={2}>
        <Button
          leftIcon={<FaThumbsUp />}
          bg="blue.600"
          _hover={{ bg: "blue.500" }}
          variant="solid"
          size="sm"
        >
          Like
        </Button>
        <Button
          leftIcon={<DeleteIcon />}
          bg="red.600"
          _hover={{ bg: "red.500" }}
          variant="solid"
          size="sm"
        >
          Delete
        </Button>
      </HStack>
      <Divider />

      {/* Post comments */}
      <Flex direction="column" justify="center" align="flex-start" p={2} ml={6}>
        <Box>
          <Flex>
            <Avatar size="sm" name="Sasuke Uchiha" />
            <HStack ml={2} align="center">
              <Text fontSize="sm">Username</Text>
              <Text fontSize="sm" opacity="0.6">
                3 hours ago
              </Text>
            </HStack>
          </Flex>
          <Flex>
            <Text ml={1} mt={1} textAlign="left" opacity="0.9" fontSize="md">
              This is the text of the comment. This is the text of the comment.
              This is the text of the comment.
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
            >
              Like
            </Button>
            <IconButton
              aria-label="Delete comment"
              icon={<DeleteIcon />}
              bg="red.600"
              _hover={{ bg: "red.500" }}
              variant="solid"
              size="sm"
            />
          </HStack>
        </Box>
      </Flex>
      <Divider />

      {/* Comment input */}
      <InputGroup>
        <Input
          pl={2}
          pr={20}
          type="text"
          variant="flushed"
          placeholder="Comment..."
        />
        <InputRightElement w={20}>
          <Button size="sm" bg="cyan.700" _hover={{ bg: "cyan.600" }}>
            Send
          </Button>
        </InputRightElement>
      </InputGroup>
    </Box>
  );
};

export default Post;
