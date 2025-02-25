// components/ProfileHeading/ProfileHeading.tsx
import {
  Box,
  Flex,
  Text,
  Avatar,
  Link,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import FollowersModal from "../FollowersModal/FollowersModal";
import OpenSpotifyButton from "../OpenSpotifyButton/OpenSpotifyButton";
import usersData from "../../mockData/userProfileDatav2.json";
import FollowButton from "../FollowButton/FollowButton";

interface ProfileHeadingProps {
  isMyProfile: boolean;
  userData?: any; // opcional, para perfis de outros usuários
}

export default function ProfileHeading({ isMyProfile, userData }: ProfileHeadingProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalType, setModalType] = useState<"followers" | "following">("followers");
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    if (userData) {
      setCurrentUser(userData);
    } else if (typeof window !== "undefined") {
      const storedSpotifyId = localStorage.getItem("@groovesync-spotify-id");
      const foundUser =
        usersData.users.find((u: any) => u.spotify_id === storedSpotifyId) ||
        usersData.users[0];
      setCurrentUser(foundUser);
    }
  }, [userData]);

  const openModal = (type: "followers" | "following") => {
    setModalType(type);
    onOpen();
  };

  //mudar isso dps nao sei como vai ficar com o back mas deixa isso por enquanto
  const handleFollow = () => {
    alert("Você começou a seguir este usuário!");
  };
  
  const handleUnfollow = () => {
    alert("Você deixou de seguir este usuário!");
  };

  const getUserDetailById = (id: string) =>
    usersData.users.find((u: any) => u.spotify_id === id);

  const detailedFollowers =
    currentUser?.followers?.map((id: string) => {
      const follower = getUserDetailById(id);
      return {
        name: follower?.name,
        profilePictureURL: follower?.profilePictureURL,
        profileURL: "/profile/" + encodeURIComponent(follower?.name || ""),
      };
    }) || [];

  const detailedFollowing =
    currentUser?.following?.map((id: string) => {
      const followingUser = getUserDetailById(id);
      return {
        name: followingUser?.name,
        profilePictureURL: followingUser?.profilePictureURL,
        profileURL: "/profile/" + encodeURIComponent(followingUser?.name || ""),
      };
    }) || [];

  return (
    <>
      <Flex align="center" justify="space-between" bg="white" w="100%">
        <Flex align="center">
          <Avatar
            src={currentUser?.profilePictureURL}
            w="200px"
            h="200px"
            mr={4}
          />

          <Box
            display="flex"
            flexDirection="column"
            justifyContent="end"
            alignItems="start"
            h="200px"
          >
            <OpenSpotifyButton
              link={currentUser?.spotifyProfile}
              text="Open Spotify Profile"
            />

            <Text
              fontSize="64px"
              fontWeight="bold"
              fontStyle="italic"
              color="brand.500"
            >
              {currentUser?.name}
            </Text>

            <Text fontSize="16px" color="brand.500">
              <Link href="#" fontWeight="regular" mr={2}>
                {currentUser?.reviews} reviews
              </Link>
              •
              <Link
                href="#"
                fontWeight="regular"
                mx={2}
                onClick={() => openModal("followers")}
              >
                {currentUser?.followers?.length || 0} followers
              </Link>
              •
              <Link
                href="#"
                fontWeight="regular"
                ml={2}
                onClick={() => openModal("following")}
              >
                {currentUser?.following?.length || 0} following
              </Link>
            </Text>

            {/* Utiliza o componente FollowButton se não for o perfil do próprio usuário */}
            {!isMyProfile && (
              <FollowButton onFollow={handleFollow} onUnfollow={handleUnfollow} />
            )}
          </Box>
        </Flex>
      </Flex>

      <FollowersModal
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
        modalType={modalType}
        userFollowers={detailedFollowers}
        userFollowing={detailedFollowing}
      />
    </>
  );
}
