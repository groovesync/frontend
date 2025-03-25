// components/ProfileHeading/ProfileHeading.tsx
import { Box, Flex, Text, Avatar, Link, useDisclosure, HStack } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import FollowersModal from "../FollowersModal/FollowersModal";
import OpenSpotifyButton from "../OpenSpotifyButton/OpenSpotifyButton";
import FollowButton from "../FollowButton/FollowButton";

export interface UserResponse {
  display_name: string;
  id: string;
  images: { url: string }[];
  external_urls: {
    spotify: string;
  };
  reviews: number;
}

interface Follower {
  user_id: string;
  user_display_name: string;
  user_image: string;
}

interface Following {
  user_id: string;
  user_display_name: string;
  user_image: string;
}

interface ProfileHeadingProps {
  isMyProfile: boolean;
  user: UserResponse;
}

export default function ProfileHeading({ isMyProfile, user }: ProfileHeadingProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalType, setModalType] = useState<"followers" | "following">("followers");
  const [followers, setFollowers] = useState<Follower[]>([]);
  const [following, setFollowing] = useState<Following[]>([]);

  // Obtém o ID do usuário logado
  const localSpotifyId = localStorage.getItem("@groovesync-spotify-id");

  // Verifica se o usuário logado já está seguindo o perfil exibido
  const isAlreadyFollowing = localSpotifyId 
    ? followers.some(follower => follower.user_id === localSpotifyId)
    : false;

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
    if (localSpotifyId) {
      seguir(localSpotifyId, user.id);
    }
  };

  const handleUnfollow = () => {
    if (localSpotifyId) {
      pararSeguir(localSpotifyId, user.id);
    }
  };

  useEffect(() => {
    fetch(`http://150.165.85.37:5000/follow/followers/${user.id}`, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("@groovesync-backend-token"),
        "Spotify-Token": localStorage.getItem("@groovesync-spotify-access-token") || "",
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => {
        // Se a API retorna { followers: [...] }
        setFollowers(data.followers || []);
      });

    fetch(`http://150.165.85.37:5000/follow/following/${user.id}`, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("@groovesync-backend-token"),
        "Spotify-Token": localStorage.getItem("@groovesync-spotify-access-token") || "",
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => {
        // Se a API retorna { following: [...] }
        setFollowing(data.following || []);
      });
  }, [user.id]);

  const ReviewsLink = () => (
    <Link href="#" fontWeight="regular" mr={2}>
      {user.reviews} reviews
    </Link>
  );

  const FollowersLink = () => (
    <Link href="#" fontWeight="regular" mx={2} onClick={() => openModal("followers")}>
      {followers.length} followers
    </Link>
  );

  const FollowingLink = () => (
    <Link href="#" fontWeight="regular" ml={2} onClick={() => openModal("following")}>
      {following.length} following
    </Link>
  );

  const statsLinks: React.ReactNode = (
    <Text fontSize="16px" color="brand.500">
      <ReviewsLink /> • <FollowersLink /> • <FollowingLink />
    </Text>
  );

  const user = userProfileData

  return (
    <>
      <Flex align="center" justify="space-between" bg="white" w="100%">
        <Flex align="center">
          <Avatar src={user.images[0]?.url || "https://via.placeholder.com/200"} w="200px" h="200px" mr={4} />
          <Box display="flex" flexDirection="column" justifyContent="end" alignItems="start" h="200px">
            <HStack>
              <OpenSpotifyButton link={user.external_urls.spotify} text="Open Spotify Profile" />
              {!isMyProfile && (
                <FollowButton
                  onFollow={handleFollow}
                  onUnfollow={handleUnfollow}
                  initialFollowing={isAlreadyFollowing}
                />
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
        modalType={modalType} 
        userFollowers={followers} 
        userFollowing={following} 
      />
    </>
  );
}
