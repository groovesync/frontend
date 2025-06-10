import React from "react";
import { HStack, Input, Button, Image } from "@chakra-ui/react";
import Searchbar from "../SearchBar/SearchBar";
import UserProfileIcon from "../UserProfileIcon/UserProfileIcon";
import WriteReviewActionButton from "../WriteReviewActionButton/WriteReviewActionButton";
import HomeButton from "../HomeButton/HomeButton";
import { useRouter } from "next/router";

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
      <WriteReviewActionButton albumId={undefined}/>
    </HStack>

    <HStack
      gap={5}>
      <UserProfileIcon />
      <LogoutButton />
    </HStack>
    </HStack>
  );
};

export default Navbar;

const LogoutButton = () => {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("@groovesync-backend-token");
    localStorage.removeItem("@groovesync-spotify-access-token");
    localStorage.removeItem("@groovesync-profile-picture-url");
    localStorage.removeItem("@groovesync-spotify-id");
    localStorage.removeItem("@groovesync-username");
    router.push("/");
  }

  return (
    <Image
      onClick={logout}
      cursor={"pointer"}
      src={"/assets/LogoutIcon.svg"} h="30px" w="30px"/>
  )
}