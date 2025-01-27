import React from "react";
import { HStack, Input, Button, Image } from "@chakra-ui/react";
import Searchbar from "../SearchBar/SearchBar";
import UserProfileIcon from "../UserProfileIcon/UserProfileIcon";
import WriteReviewActionButton from "../WriteReviewActionButton/WriteReviewActionButton";
import HomeButton from "../HomeButton/HomeButton";

const Navbar = () => {
  

  return (
    <HStack
      w="100%"
      bg="white"
      justify="space-between"
      align="center"
      pb="50px"
    >
      
    <HomeButton />
    <HStack
      w="65%"
      gap={8}>
      <Searchbar />
      <WriteReviewActionButton />
    </HStack>
    <UserProfileIcon />

    </HStack>
  );
};

export default Navbar;