import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Circle,
  Heading,
  VStack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Tooltip,
  IconButton,
  Button,
  Text,
  Link,
} from "@chakra-ui/react";
import { LockIcon, ViewOffIcon, ViewIcon } from "@chakra-ui/icons";

const AuthForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <Box
      w={{ base: "90%", sm: "60%", md: "40%" }}
      borderWidth={2}
      mx="auto"
      p={6}
      boxShadow="lg"
      rounded="md"
    >
      <Circle mx="auto" mb={3} size={14} bg="red.500">
        <LockIcon w={8} h={8} color="white" />
      </Circle>
      <Heading textAlign="center">Login</Heading>
      <form>
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Username</FormLabel>
            <Input
              name="username"
              type="text"
              autoFocus
              placeholder="NarutoFan22"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                name="password"
                type={showPassword === true ? "text" : "password"}
                placeholder="******"
              />
              <InputRightElement>
                <Tooltip
                  hasArrow
                  label={
                    showPassword === true ? "Hide password" : "Show password"
                  }
                  placement="left"
                >
                  <IconButton
                    icon={
                      showPassword === true ? <ViewOffIcon /> : <ViewIcon />
                    }
                    variant="ghost"
                    aria-label={
                      showPassword === true ? "Hide password" : "Show password"
                    }
                    // onClick={togglePassword}
                  />
                </Tooltip>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Button width="100%" bg="teal.500" _hover={{ bg: "teal.400" }} variant="solid" type="submit">
            Login
          </Button>
          <Text>
            Don't have an account yet?{" "}
            <Link as={RouterLink} to="/signup" color="teal.400">
              Sign up!
            </Link>
          </Text>
        </VStack>
      </form>
    </Box>
  );
};

export default AuthForm;
