import { HStack, Image, Input } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";

const Searchbar = () => {
    const router = useRouter()
    const [searchQuery, setSearchQuery] = useState("")

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && searchQuery.trim() !== "") {
          sessionStorage.setItem("@groovesync-latest-search-query-value", searchQuery.trim())
          router.push(`/searchResults?query=${encodeURIComponent(searchQuery)}`);
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
    )
}

export default Searchbar;