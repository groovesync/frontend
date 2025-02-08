import { Box, Flex, Text, Avatar, Link, useDisclosure, Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import FollowersModal from "../FollowersModal/FollowersModal";
import OpenSpotifyButton from "../OpenSpotifyButton/OpenSpotifyButton";
import userProfileData from "../../mockData/userProfileData.json"

export default function ProfileHeading() {

  const {isOpen, onOpen, onClose} = useDisclosure()
  const [modalType, setModalType] = useState<"followers"|"following">("followers")
  const username = localStorage.getItem("username") || ""
  const [userProfilePictureURL, setUserProfilePictureURL] = useState("")

    useEffect(() => {
        if (typeof window !== "undefined") {
          setUserProfilePictureURL(localStorage.getItem("profilePictureURL") || "")
        }
    }, [])

  const user = userProfileData

  const openModal = (type: "followers" | "following") => {
    setModalType(type)
    onOpen()
  }

  return (
    <>
    <Flex
      align="center"
      justify="space-between"
      bg="white"
      w="100%"
    >
      <Flex align="center">
        
        <Avatar src={userProfilePictureURL} w="200px" h="200px" mr={4} />

        <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"end"}
            alignItems={"start"}
            h="200px">
        <OpenSpotifyButton link={user.spotifyProfile} text="Open Spotify Profile"/>

          <Text fontSize="64px" fontWeight="bold" fontStyle="italic" color="brand.500">
            {username}
          </Text>

          <Text fontSize="16px" color="brand.500">
              <Link href="#" fontWeight="regular" mr={2}>
                {user.reviews} reviews
              </Link>
              •
              <Link href="#" fontWeight="regular" mx={2} onClick={() => openModal("followers")}>
                {user.followers.length} followers
              </Link>
              •
              <Link href="#" fontWeight="regular" ml={2} onClick={() => openModal("following")}>
                {user.following.length} following
              </Link>
          </Text>
        </Box>
      </Flex>
    </Flex>

    <FollowersModal isOpen={isOpen} onClose={onClose} onOpen={onOpen} modalType={modalType} userFollowers={user.followers} userFollowing={user.following}/>
    </>
  );
}


