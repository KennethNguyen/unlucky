import React, { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  loginUser,
  signUpUser,
  formStatus,
  resetState,
  formError,
  userData,
} from "../../features/user/userSlice";
import { Link as RouterLink, useLocation, useHistory } from "react-router-dom";
import { IAuthForm } from "../../types/FormTypes";
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
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { LockIcon, ViewOffIcon, ViewIcon } from "@chakra-ui/icons";

const initialFormState: IAuthForm = {
  username: "",
  password: "",
};

const AuthForm = () => {
  const status = useAppSelector(formStatus);
  const errorMessage = useAppSelector(formError);
  const user = useAppSelector(userData);
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<IAuthForm>(initialFormState);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const history = useHistory();
  const location = useLocation();
  const formType: string = location.pathname;
  const toast = useToast();

  /* redirect user if they are already logged in */
  useEffect(() => {
    if (user) {
      history.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  /* action done after submitting form */
  useEffect(() => {
    if (status === "failed") {
      toast({
        title: errorMessage,
        status: "error",
        position: "bottom",
        isClosable: true,
      });
      setFormData({ ...initialFormState });
      dispatch(resetState());
    }

    if (status === "success") {
      setFormData({ ...initialFormState });
      dispatch(resetState());
      history.push("/");
      toast({
        title: `Welcome back, ${user?.username}`,
        status: "success",
        position: "top",
        isClosable: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  /* reset the form state if user switches between sign up and log in since shared component */
  useEffect(() => {
    dispatch(resetState());
    setFormData({ ...initialFormState });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formType]);

  /* submit the form and dispatch action based on login or sign up route */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (formType === "/login") {
      dispatch(loginUser(formData));
    } else {
      dispatch(signUpUser(formData));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePassword = (): void => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

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
      <Heading textAlign="center" mb={4}>
        {formType === "/login" ? "Login" : "Create a New Account"}
      </Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Username</FormLabel>
            <Input
              name="username"
              type="text"
              autoFocus
              placeholder="NarutoFan22"
              value={formData.username}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                name="password"
                type={showPassword === true ? "text" : "password"}
                placeholder="******"
                value={formData.password}
                onChange={handleChange}
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
                    onClick={togglePassword}
                  />
                </Tooltip>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Button
            width="100%"
            bg="teal.500"
            _hover={{ bg: "teal.400" }}
            variant="solid"
            type="submit"
          >
            {status === "loading" ? (
              <React.Fragment>
                <Spinner mr={4} />
                {formType === "/login" ? "Logging in..." : "Creating user..."}
              </React.Fragment>
            ) : formType === "/login" ? (
              "Login"
            ) : (
              "Sign Up"
            )}
          </Button>
          {formType === "/login" ? (
            <Text>
              Don't have an account yet?{" "}
              <Link as={RouterLink} to="/signup" color="teal.400">
                Sign up!
              </Link>
            </Text>
          ) : (
            <Text>
              Already have an account?{" "}
              <Link as={RouterLink} to="/login" color="teal.400">
                Log in!
              </Link>
            </Text>
          )}
        </VStack>
      </form>
    </Box>
  );
};

export default AuthForm;
