import React from "react";
// import Main from "../components/Main/Main";
import SplashContainer from "../components/SplashContainer/SplashContainer";
import { Flex } from "@chakra-ui/react";

const Home = () => {
  return (
    <Flex align="center" justify="center" minH="87.5vh">
      <SplashContainer />
      {/* <Main /> */}
    </Flex>
  );
};

export default Home;
