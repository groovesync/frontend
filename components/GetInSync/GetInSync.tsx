import React from "react";
import { Box, Text, VStack, Image, SimpleGrid } from "@chakra-ui/react";
import mockData from "../../mockData/getInSync.json";
import Link from "next/link";

const GetInSync: React.FC = () => {
  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  return (
    <Box mt={8} textAlign="left" px={4}>
      <Text fontSize="32px" fontWeight="bold" fontStyle="italic" mb={4}>
        Get in sync with these releases
      </Text>
      <SimpleGrid columns={[1, 2, 3]} spacing={6}>
        {mockData.map((release) => (
          <Box
            as={Link}
            href={`/album/${release.id}`}
            key={release.id}
            bg="brand.400"
            pt={5}
            px={4}
            pb={2}
            borderRadius="10px"
            boxShadow="sm"
            _hover={{ boxShadow: "md" }}
            textAlign="center"
          >
            <Image
              src={release.coverURL}
              alt={release.title}
              boxSize="150px"
              borderRadius="md"
              objectFit="cover"
              mx="auto"
              mb={4}
            />
            <VStack spacing={1}>
              <Text fontWeight="semibold" fontSize="16px" color={"brand.500"}>
                {truncateText(release.title, 20)}
              </Text>
              <Text fontSize="14px" fontStyle="italic" color={"brand.500"}>
                {release.artist}
              </Text>
            </VStack>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default GetInSync;
