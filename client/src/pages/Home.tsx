import React from "react";
import { useAppSelector } from "../app/hooks";
import { userData } from "../features/user/userSlice";
import Main from "../components/Main/Main";
import SplashContainer from "../components/SplashContainer/SplashContainer";
import { Flex } from "@chakra-ui/react";

const Home = () => {
  const user = useAppSelector(userData);

  // if user is logged in, then show the main page, otherwise show the splash screen
  return (
    <Flex align="center" justify="center" minH="87.5vh">
      {user ? <Main /> : <SplashContainer />}
    </Flex>
  );
};

export default Home;
