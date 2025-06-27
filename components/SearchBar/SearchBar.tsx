import { HStack, Image, Input } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";

/**
 * Searchbar component renders a search input with an icon.
 * On Enter key press, it saves the query to sessionStorage and
 * navigates to the search results page with the query parameter.
 *
 * @component
 * @returns {JSX.Element} The styled search bar element.
 */
const Searchbar: React.FC = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  /**
   * Handles Enter key press: stores the trimmed query and navigates.
   *
   * @param {React.KeyboardEvent<HTMLInputElement>} e - The keyboard event.
   */
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      const term = searchQuery.trim();
      sessionStorage.setItem(
        "@groovesync-latest-search-query-value",
        term
      );
      router.push(`/searchResults?query=${encodeURIComponent(term)}`);
    }
  };

  return (
    <HStack
      bg="white"
      border="1px solid"
      borderColor="brand.500"
      borderRadius="full"
      px={4}
      py={2}
      w="90%"
      h="45px"
    >
      <Image src="/assets/SearchIcon.svg" alt="Search Icon" />
      <Input
        variant="unstyled"
        placeholder="Search here for the new..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyPress={handleKeyPress}
        color="brand.500"
        _placeholder={{ color: "gray.400" }}
      />
    </HStack>
  );
};

export default Searchbar;
