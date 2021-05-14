import React, { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { createNewPost, postFormStatus } from "../../features/post/postSlice";
import { IPostForm } from "../../types/FormTypes";
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
  Spinner,
} from "@chakra-ui/react";

const initialFormState: IPostForm = {
  title: "",
  text: "",
  hashTag: "",
};

const PostForm = ({
  editPostId,
  setEditPostId,
}: {
  editPostId: string | undefined;
  setEditPostId: React.Dispatch<React.SetStateAction<string | undefined>>;
}) => {
  const [formData, setFormData] = useState<IPostForm>(initialFormState);

  const editingPost = useAppSelector((state) =>
    editPostId ? state.post.posts?.find((post) => post.id === editPostId) : null
  );
  const formStatus = useAppSelector(postFormStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (editingPost) {
      setFormData(editingPost);
    }
  }, [editingPost]);

  /* submit the form and dispatch action based on whether we are creating a new post or editing one */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (editPostId) {
      // dispatch(loginUser(formData));
      console.log("Dispatch edit post");
      setEditPostId(undefined);
      setFormData(initialFormState);
    } else {
      dispatch(createNewPost(formData));
      setFormData(initialFormState);
      console.log("Dispatch create new post");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = (): void => {
    setEditPostId(undefined);
    setFormData(initialFormState);
  };

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
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Title</FormLabel>
            <Input
              name="title"
              type="text"
              placeholder="Ice cream? I scream."
              value={formData.title}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Text</FormLabel>
            <Textarea
              name="text"
              type="text"
              placeholder="I dropped the ice cream two seconds after I bought it :("
              value={formData.text}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>HashTag</FormLabel>
            <InputGroup>
              <InputLeftAddon children="#" />
              <Input
                name="hashTag"
                type="text"
                placeholder="Melted"
                value={formData.hashTag}
                onChange={handleChange}
              />
            </InputGroup>
          </FormControl>
          <Button
            width="100%"
            bg="blue.600"
            _hover={{ bg: "blue.500" }}
            variant="solid"
            type="submit"
          >
            {formStatus === "loading" && (
              <React.Fragment>
                <Spinner mr={4} />
                {editingPost ? "Updating post..." : "Creating post..."}
              </React.Fragment>
            )}

            {formStatus !== "loading" && (editingPost ? "Update" : "Post")}
          </Button>
          <Button
            width="100%"
            bg="red.600"
            _hover={{ bg: "red.500" }}
            variant="solid"
            onClick={resetForm}
          >
            Reset
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default PostForm;
