// components/ProfileHeading/ProfileHeading.tsx
import { Box, Flex, Text, Avatar, Link, useDisclosure, HStack } from "@chakra-ui/react";
import { useState } from "react";
import FollowersModal from "../FollowersModal/FollowersModal";
import OpenSpotifyButton from "../OpenSpotifyButton/OpenSpotifyButton";
import FollowButton from "../FollowButton/FollowButton";

export interface UserResponse {
  display_name: string;
  id: string;
  images: { url: string }[];  // Lista de imagens com URL
  external_urls: {
    spotify: string;
  };  // Link para o perfil do Spotify
  reviews: number;
  followers: any[];
  following: any[];
}

interface ProfileHeadingProps {
  isMyProfile: boolean;
  user: UserResponse;
}

export default function ProfileHeading({ isMyProfile, user }: ProfileHeadingProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalType, setModalType] = useState<"followers" | "following">("followers");

  const openModal = (type: "followers" | "following") => {
    setModalType(type);
    onOpen();
  };

  const seguir = (spotifyId1: string, spotifyId2: string) => {
    fetch("http://150.165.85.37:5000/follow/add", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("@groovesync-backend-token"),
        "Spotify-Token": localStorage.getItem("@groovesync-spotify-access-token") || "",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ spotifyId1, spotifyId2 })
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  const pararSeguir = (spotifyId1: string, spotifyId2: string) => {
    fetch(`http://150.165.85.37:5000/follow/remove?spotifyId1=${spotifyId1}&spotifyId2=${spotifyId2}`, {
      method: "DELETE",
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("@groovesync-backend-token"),
        "Spotify-Token": localStorage.getItem("@groovesync-spotify-access-token") || "",
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  const handleFollow = () => {
    const localSpotifyId = localStorage.getItem("@groovesync-spotify-id");
    if (localSpotifyId) {
      seguir(localSpotifyId, user.id);
    }
  };

  const handleUnfollow = () => {
    const localSpotifyId = localStorage.getItem("@groovesync-spotify-id");
    if (localSpotifyId) {
      pararSeguir(localSpotifyId, user.id);
    }
  };

  const ReviewsLink = () => (
    <Link href="#" fontWeight="regular" mr={2}>
      {user.reviews} reviews
    </Link>
  );

  // Exibe o número de seguidores conforme os dados do usuário
  const FollowersLink = () => (
    <Link href="#" fontWeight="regular" mx={2} onClick={() => openModal("followers")}>
      {user.followers?.length || 0} followers
    </Link>
  );

  // Exibe o número de usuários que o usuário está seguindo
  const FollowingLink = () => (
    <Link href="#" fontWeight="regular" ml={2} onClick={() => openModal("following")}>
      {user.following?.length || 0} following
    </Link>
  );

  const statsLinks: React.ReactNode = (
    <Text fontSize="16px" color="brand.500">
      <ReviewsLink />
      •
      <FollowersLink />
      •
      <FollowingLink />
    </Text>
  );

  return (
    <>
      <Flex align="center" justify="space-between" bg="white" w="100%">
        <Flex align="center">
          <Avatar src={user.images[0]?.url || "https://via.placeholder.com/200"} w="200px" h="200px" mr={4} />
          <Box display="flex" flexDirection="column" justifyContent="end" alignItems="start" h="200px">
            <HStack>
              <OpenSpotifyButton link={user.external_urls.spotify} text="Open Spotify Profile" />
              {!isMyProfile && (
                <FollowButton onFollow={handleFollow} onUnfollow={handleUnfollow} ml={4} />
              )}
            </HStack>
            <Text fontSize="64px" fontWeight="bold" fontStyle="italic" color="brand.500">
              {user.display_name}
            </Text>
            {statsLinks}
          </Box>
        </Flex>
      </Flex>

      <FollowersModal 
        isOpen={isOpen} 
        onClose={onClose} 
        onOpen={onOpen} 
        modalType={modalType} 
        userFollowers={user.followers} 
        userFollowing={user.following}
      />
    </>
  );
}