import { HStack, Image, Input } from "@chakra-ui/react";

const Searchbar = () => {
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
          console.log("Searching:", e.currentTarget.value);
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
        onKeyPress={handleKeyPress}
        color="brand.500"
        _placeholder={{ color: "gray.400" }}
      />
    </HStack>
    )
}

export default Searchbar;