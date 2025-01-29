import React from "react";
import { Box, Text, VStack, Image, HStack } from "@chakra-ui/react";
import mockData from "../../mockData/getInSync.json";

const GetInSync: React.FC = () => {
  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  return (
    <Box mt={8} textAlign="left" px={4}>
      <Text fontSize="2xl" fontWeight="bold" fontStyle="italic" mb={4}>
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
            key={index}
            bg="brand.400"
            p={4}
            borderRadius="lg"
            boxShadow="sm"
            width="180px"
            textAlign="center"
            justifyItems="center"
          >
            <Image
              src={release.coverURL}
              alt={release.title}
              boxSize="120px"
              borderRadius="md"
              objectFit="cover"
              mb={2}
            />
            <Text fontWeight="medium" fontSize="md" isTruncated>
              {truncateText(release.title, 15)}
            </Text>
            <Text fontSize="sm" color="gray.500">
              {release.artist}
            </Text>
          </Box>
        ))}
      </HStack>
    </Box>
  );
};

export default GetInSync;
