import { Box, Flex, Text, Avatar, Link, useDisclosure, Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import FollowersModal from "../FollowersModal/FollowersModal";
import OpenSpotifyButton from "../OpenSpotifyButton/OpenSpotifyButton";
import userProfileData from "../../mockData/userProfileData.json"

interface FollowersResponse {
  followers: {
      user_id: string,
      user_display_name: string,
      user_image: string
  }[]
}

interface FollowingResponse {
  following: {
      user_id: string,
      user_display_name: string,
      user_image: string
  }[]
}

export default function ProfileHeading() {

  const {isOpen, onOpen, onClose} = useDisclosure()
  const [modalType, setModalType] = useState<"followers"|"following">("followers")
  const [username, setUsername] = useState("")
  const [userProfilePictureURL, setUserProfilePictureURL] = useState("")
  const [spotifyId, setSpotifyId] = useState("")
  const [followers, setFollowers] = useState<FollowersResponse>()
  const [following, setFollowing] = useState<FollowingResponse>()

    useEffect(() => {
        if (typeof window !== "undefined") {
          setUserProfilePictureURL(localStorage.getItem("@groovesync-profile-picture-url") || "")
          setUsername(localStorage.getItem("@groovesync-username") || "")
          setSpotifyId(localStorage.getItem("@groovesync-spotify-id") || "")
        }

        fetch(`http://150.165.85.37:5000/follow/followers/${localStorage.getItem("@groovesync-spotify-id") || ""}`,{
          headers: {
              "Authorization": "Bearer " + localStorage.getItem("@groovesync-backend-token"),
              "Spotify-Token": localStorage.getItem("@groovesync-spotify-access-token") || "",
              "Content-Type": "application/json"
          }})
        .then((res) => res.json())
        .then((data) => setFollowers(data))

        fetch(`http://150.165.85.37:5000/follow/following/${localStorage.getItem("@groovesync-spotify-id") || ""}`,{
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("@groovesync-backend-token"),
                "Spotify-Token": localStorage.getItem("@groovesync-spotify-access-token") || "",
                "Content-Type": "application/json"
            }})
        .then((res) => res.json())
        .then((data) => setFollowing(data))
    }, [])

  const openModal = (type: "followers" | "following") => {
    setModalType(type)
    onOpen()
  }

  const user = userProfileData

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
        <OpenSpotifyButton link={"https://open.spotify.com/user/"+spotifyId} text="Open Spotify Profile"/>

          <Text fontSize="64px" fontWeight="bold" fontStyle="italic" color="brand.500">
            {username}
          </Text>

          <Text fontSize="16px" color="brand.500">
              <Link href="#" fontWeight="regular" mx={2} onClick={() => openModal("followers")}>
                {followers?.followers ? followers?.followers.length : 0} followers
              </Link>
              •
              <Link href="#" fontWeight="regular" ml={2} onClick={() => openModal("following")}>
                {following?.following ? following?.following.length : 0} following
              </Link>
          </Text>
        </Box>
      </Flex>
    </Flex>

    <FollowersModal isOpen={isOpen} onClose={onClose} onOpen={onOpen} modalType={modalType} userFollowers={followers ? followers : {followers: [{user_display_name: "", user_id: "", user_image: ""}]}} userFollowing={following ? following : {following: [{user_display_name: "", user_id: "", user_image: ""}]}}/>
    </>
  );
}


