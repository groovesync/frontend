import { Box, Flex, Text, Avatar, Button, Link } from "@chakra-ui/react";
import OpenSpotifyButton from "../OpenSpotifyButton/OpenSpotifyButton";

export default function ProfileHeading() {

  const user = {
    name: "Abed Nadir",
    avatarURL:
      "https://upload.wikimedia.org/wikipedia/en/thumb/a/a1/Abed_Nadir_%28Community%29.jpg/220px-Abed_Nadir_%28Community%29.jpg",
    spotifyProfile: "https://open.spotify.com/user/abednadir",
    reviews: 15,
    followers: 33,
    following: 56,
  };

  return (
    <Flex
      align="center"
      justify="space-between"
      bg="white"
      w="100%"
    >
      <Flex align="center">
        
        <Avatar src={user.avatarURL} w="200px" h="200px" mr={4} />

        <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"end"}
            alignItems={"start"}
            h="200px">
        <OpenSpotifyButton link={user.spotifyProfile} text="Open Spotify Profile"/>

          <Text fontSize="64px" fontWeight="bold" fontStyle="italic" color="brand.500">
            {user.name}
          </Text>

          <Text fontSize="16px" color="brand.500">
            <Link href="#" fontWeight="reguçar" mr={2}>
              {user.reviews} reviews
            </Link>
            •
            <Link href="/followers" fontWeight="regular" mx={2}>
              {user.followers} followers
            </Link>
            •
            <Link href="/following" fontWeight="regular" ml={2}>
              {user.following} following
            </Link>
          </Text>
        </Box>
      </Flex>

    </Flex>
  );
}
