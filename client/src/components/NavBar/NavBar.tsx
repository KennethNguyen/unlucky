import React from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { userData, logoutUser } from "../../features/user/userSlice";
import { Button, Flex, Box, Image, Spacer } from "@chakra-ui/react";
import { Link, useHistory } from "react-router-dom";

const NavBar = () => {
  const user = useAppSelector(userData);
  const dispatch = useAppDispatch();
  const history = useHistory();

  /* log user out and return to login screen */
  const handleLogOut = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    dispatch(logoutUser());
    history.push("/login");
  };

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
      {user ? (
        <Button
          size="md"
          borderRadius="8px"
          fontSize="lg"
          bg="yellow.700"
          _hover={{ bg: "yellow.600" }}
          onClick={handleLogOut}
        >
          Log Out
        </Button>
      ) : (
        <Link to="/login">
          <Button
            size="md"
            borderRadius="8px"
            fontSize="lg"
            bg="teal.500"
            _hover={{ bg: "teal.400" }}
          >
            Login
          </Button>
        </Link>
      )}
    </Flex>
  );
};

export default NavBar;
