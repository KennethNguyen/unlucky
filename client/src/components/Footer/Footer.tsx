import React from "react";
import { Flex, Text, Link, IconButton } from "@chakra-ui/react";
import { FaLinkedin, FaGithub, FaGlobe } from "react-icons/fa";

const Footer = () => {
  return (
    <Flex align="center" justify="center" minH="5.5vh" bg="teal.400">
      <Text fontSize="lg">Created by Kenneth Nguyen ―</Text>
      <Link href="https://www.linkedin.com/in/kenneth-nguyenn/" isExternal>
        <IconButton
          _hover={{ bg: "teal.300" }}
          _focus={{ boxShadow: "none" }}
          variant="ghost"
          aria-label="Kenneth's LinkedIn"
          fontSize={24}
          icon={<FaLinkedin />}
        />
      </Link>
      <Link href="https://github.com/KennethNguyen" isExternal>
        <IconButton
          _hover={{ bg: "teal.300" }}
          _focus={{ boxShadow: "none" }}
          variant="ghost"
          aria-label="Kenneth's Github"
          fontSize={24}
          icon={<FaGithub />}
        />
      </Link>
      <Link href="https://kenneth.engineer">
        <IconButton
          _hover={{ bg: "teal.300" }}
          _focus={{ boxShadow: "none" }}
          variant="ghost"
          aria-label="Kenneth's Website"
          fontSize={24}
          icon={<FaGlobe />}
        />
      </Link>
    </Flex>
  );
};

export default Footer;
