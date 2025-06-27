import React from "react";
import { HStack, Input, Button, Image } from "@chakra-ui/react";
import Searchbar from "../SearchBar/SearchBar";
import UserProfileIcon from "../UserProfileIcon/UserProfileIcon";
import WriteReviewActionButton from "../WriteReviewActionButton/WriteReviewActionButton";
import HomeButton from "../HomeButton/HomeButton";
import { useRouter } from "next/router";

/**
 * Navbar component renders the main navigation bar, including:
 * - Home button
 * - Search bar and write review button group
 * - User profile icon and logout button
 *
 * @component
 * @returns {JSX.Element} The navigation bar layout.
 */
const Navbar: React.FC = () => {
  return (
    <HStack
      w="100%"
      bg="white"
      justify="space-between"
      align="center"
      pb="50px"
    >
      <HomeButton />

      <HStack w="65%" gap={8}>
        <Searchbar />
        <WriteReviewActionButton albumId={undefined} />
      </HStack>

      <HStack gap={5}>
        <UserProfileIcon />
        <LogoutButton />
      </HStack>
    </HStack>
  );
};

/**
 * LogoutButton component clears user session data from localStorage
 * and redirects to the home page when clicked.
 *
 * @component
 * @returns {JSX.Element} The logout icon button.
 */
const LogoutButton: React.FC = () => {
  const router = useRouter();

  /**
   * Clears stored tokens and user info, then navigates home.
   *
   * @returns {void}
   */
  const logout = (): void => {
    localStorage.removeItem("@groovesync-backend-token");
    localStorage.removeItem("@groovesync-spotify-access-token");
    localStorage.removeItem("@groovesync-profile-picture-url");
    localStorage.removeItem("@groovesync-spotify-id");
    localStorage.removeItem("@groovesync-username");
    router.push("/");
  };

  return (
    <Image
      onClick={logout}
      cursor="pointer"
      src="/assets/LogoutIcon.svg"
      h="30px"
      w="30px"
      alt="Logout Icon"
    />
  );
};

export default Navbar;
