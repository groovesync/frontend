import { Avatar, Box, Text } from "@chakra-ui/react";
import Link from "next/link";
import userProfileData from "../../mockData/userProfileData.json";

interface ArtistProfilePictureProps {
  /**
   * The display name of the artist.
   */
  name: string;
  /**
   * URL of the artist's profile picture.
   */
  pictureURL: string;
  /**
   * Link to navigate to the artist's dedicated page.
   */
  pageURL: string;
}

/**
 * ArtistProfilePicture Component
 *
 * Renders an interactive artist avatar with the artist's name.
 * The component is wrapped in a clickable box that navigates
 * to the artist's page when clicked.
 *
 * Props:
 * - `name`: The artist's name, displayed below the avatar.
 * - `pictureURL`: Source URL for the avatar image.
 * - `pageURL`: URL or route to navigate on click.
 */
const ArtistProfilePicture: React.FC<ArtistProfilePictureProps> = ({
  name,
  pictureURL,
  pageURL,
}) => {
  return (
    <Box
      width="160px"
      cursor="pointer"
      as={Link}
      href={pageURL}
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Avatar
        src={pictureURL}
        w="160px"
        h="160px"
        _hover={{ boxShadow: "md", transform: "scale(1.05)" }}
        transition="all 0.2s ease-in-out"
      />

      <Box p={2} w="100%" textAlign="left">
        <Text fontSize="16px" fontWeight="medium" color="brand.500" isTruncated>
          {name}
        </Text>
      </Box>
    </Box>
  );
};

export default ArtistProfilePicture;
