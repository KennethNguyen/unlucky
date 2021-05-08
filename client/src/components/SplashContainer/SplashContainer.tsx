import React from "react";
import { Button, Flex, Box, Image, Stack, Heading } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

const SplashContainer = () => {
  return (
    <Flex
      align="center"
      justify="space-around"
      direction={{ base: "column-reverse", md: "row" }}
    >
      <Box>
        <Stack
          spacing={4}
          align={["center", "center", "flex-start", "flex-start"]}
        >
          <Heading
            as="h1"
            size="2xl"
            textAlign={["center", "center", "left", "left"]}
          >
            Think you're <span style={{ color: "#4FD1C5" }}>unlucky</span>?
          </Heading>
          <Heading
            as="h2"
            size="lg"
            opacity="0.8"
            fontWeight="normal"
            textAlign={["center", "center", "left", "left"]}
          >
            Share your bad experiences with others!
          </Heading>
          <Link to={"/signup"}>
            <Button
              borderRadius="8px"
              size="md"
              rightIcon={<ChevronRightIcon />}
            >
              Create an account
            </Button>
          </Link>
          <Button
            bg="yellow.700"
            borderRadius="8px"
            size="md"
            rightIcon={<ChevronRightIcon />}
          >
            Try the demo now!
          </Button>
        </Stack>
      </Box>
      <Box mb={{ base: 12, md: 0 }} w={{ base: "90%", sm: "60%", md: "45%" }}>
        <Image
          size="100%"
          rounded="1rem"
          objectFit="cover"
          src={require(`../../images/droppedIcecream.jpg`).default}
          alt="Dropped Icecream"
          shadow="2xl"
        />
      </Box>
    </Flex>
  );
};

export default SplashContainer;
