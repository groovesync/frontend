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

/**
 * ProfileHeading Component
 * 
 * This component displays the profile heading section of a user's profile page.
 * It includes the user's display name, avatar, Spotify profile link, follow/unfollow buttons,
 * and clickable links to view their followers and following lists in a modal.
 * 
 * @component
 * @param {ProfileHeadingProps} props - The props for the ProfileHeading component.
 * @param {boolean} props.isMyProfile - Indicates if the profile being viewed is the logged-in user's own profile.
 * @param {UserResponse} props.user - The user data containing display name, Spotify ID, profile image, Spotify link, and number of reviews.
 * 
 * @returns {JSX.Element} The rendered profile heading with user details and follow/follower controls.
 * 
 * @example
 * ```tsx
 * <ProfileHeading
 *   isMyProfile={true}
 *   user={{
 *     display_name: "John Doe",
 *     id: "spotify-user-id",
 *     images: [{ url: "https://..." }],
 *     external_urls: { spotify: "https://open.spotify.com/user/spotify-user-id" },
 *     reviews: 5
 *   }}
 * />
 * ```
 * 
 * @description
 * Features:
 * - Shows user's avatar and display name
 * - Links to open Spotify profile
 * - Shows number of followers and following with clickable links (open a modal)
 * - Displays follow/unfollow button if viewing another user's profile
 * - Loads followers and following info via API on mount
 * - Modal to list followers and following users
 * 
 * Backend Endpoints Used:
 * - `GET /follow/followers/:userId` - Get user's followers
 * - `GET /follow/following/:userId` - Get users the user is following
 * - `POST /follow/add` - Follow a user
 * - `DELETE /follow/remove` - Unfollow a user
 */
export default function ProfileHeading({ isMyProfile, user }: ProfileHeadingProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalType, setModalType] = useState<"followers" | "following">("followers");
  const [followers, setFollowers] = useState<Follower[]>([]);
  const [following, setFollowing] = useState<Following[]>([]);

  const localSpotifyId = localStorage.getItem("@groovesync-spotify-id");

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
    if (user.id) {
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
    }
  }, [user.id]);


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
      <FollowersLink /> • <FollowingLink />
    </Text>
  );


  return (
    <>
      <Flex align="center" justify="space-between" bg="white" w="100%">
        <Flex align="center">
          <Avatar src={user.images[0]?.url || "/assets/UserIcon.svg"} w="200px" h="200px" mr={4} />
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
