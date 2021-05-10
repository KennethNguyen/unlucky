import React from "react";
import {
  Box,
  Heading,
  VStack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  Button,
  Textarea,
} from "@chakra-ui/react";

const PostForm = () => {
  return (
    <Box
      w={{ base: "90%", sm: "80%", md: "30%" }}
      borderWidth={2}
      mx="auto"
      p={6}
      boxShadow="lg"
      rounded="md"
    >
      <Heading mb={2} textAlign="center">
        Create New Post
      </Heading>
      <form>
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Title</FormLabel>
            <Input
              name="title"
              type="text"
              autoFocus
              placeholder="Ice cream? I scream."
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Text</FormLabel>
            <Textarea
              name="text"
              type="text"
              placeholder="I dropped the ice cream two seconds after I bought it :("
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>HashTag</FormLabel>
            <InputGroup>
              <InputLeftAddon children="#" />
              <Input name="hashtag" type="text" placeholder="Melted" />
            </InputGroup>
          </FormControl>
          <Button
            width="100%"
            bg="blue.600"
            _hover={{ bg: "blue.500" }}
            variant="solid"
            type="submit"
          >
            Post
          </Button>
          <Button
            width="100%"
            bg="red.600"
            _hover={{ bg: "red.500" }}
            variant="solid"
          >
            Reset
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default PostForm;
