import React from "react";
import { Button, Flex, Box, Image, Spacer } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <Flex
      align="center"
      justify="center"
      minH="7vh"
      m="0 16px"
      paddingTop="8px"
    >
      <Box>
        <Link to="/">
          <Button
            fontWeight="medium"
            fontSize="3xl"
            variant="ghost"
            _hover={{ bg: "teal.400", color: "gray.800" }}
            letterSpacing="0.65px"
            color="teal.300"
          >
            <Image
              boxSize="38px"
              objectFit="cover"
              src={require(`../../images/blackCat.png`).default}
              alt="Black Cat"
              mr={2}
            />
            Unlucky
          </Button>
        </Link>
      </Box>
      <Spacer />
      <Link to="/login">
        <Button size="md" borderRadius="8px" fontSize="lg">
          Login
        </Button>
      </Link>
    </Flex>
  );
};

export default NavBar;
