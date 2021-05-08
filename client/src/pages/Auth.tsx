import React from "react";
import { Flex } from "@chakra-ui/react";
import AuthForm from "../components/Auth/AuthForm";

const Auth = () => {
  return (
    <Flex align="center" justify="center" minH="87.5vh">
      <AuthForm />
    </Flex>
  );
};

export default Auth;
