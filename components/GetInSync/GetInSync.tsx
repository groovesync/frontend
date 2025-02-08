import React from "react";
import { Box, Text, VStack, Image, SimpleGrid, HStack } from "@chakra-ui/react";
import mockData from "../../mockData/getInSync.json";
import Link from "next/link";


interface Artist {
  name: string,
  id: string
}

const GetInSync: React.FC = () => {
  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  const getArtists = (artists: Artist[]) => {
    let result = ""
    for (let i = 0; i < artists.length; i++) {
      if (i == artists.length - 1) {
        result += artists[i].name
      } else {
        result += artists[i].name + ", "
      }
    }
    return result
  }

  return (
    <Box mt={8} textAlign="left" px={4}>
      <Text fontSize="32px" fontWeight="bold" fontStyle="italic" mb={4}>
        Get in sync with these releases
      </Text>
      <HStack
        spacing={6}
        justify="space-between"
        wrap="wrap"
        alignItems="flex-start"
      >
        {mockData.map((release, index) => (
          <Box
            as={Link}
            href={"/album/"+release.id}
            key={index}
            bg="brand.400"
            pt={5}
            pl={5}
            pr={5}
            pb={1}
            borderRadius="5px"
            boxShadow="sm"
            width="200px"
            height="fit-content"
            justifyItems="center"
            alignItems={"space-between"}
          >
            <Image
              src={release.coverURL}
              alt={release.title}
              width="100%"
              height="auto"
              borderRadius="md"
              objectFit="cover"
              mb={0.25}
            />

            <Box w="100%" p={2}>
              <Text fontWeight="semibold" fontSize="16px" isTruncated color={"brand.500"}>
                {truncateText(release.title, 15)}
              </Text>
              <Text fontSize="16px" fontStyle={"italic"} fontWeight={"regular"} color={"brand.500"}>
                {truncateText(getArtists(release.artist), 10)}
              </Text>
            </Box>
          </Box>
        ))}
      </HStack>
    </Box>
  );
};

export default GetInSync;
