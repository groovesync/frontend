import React from "react";
import Slider from "react-slick";
import { Box, Text, Image } from "@chakra-ui/react";
import Link from "next/link";
import mockData from "../../mockData/discoverNewAlbums.json";

const DiscoverNewAlbums: React.FC = () => {
  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Box mt={8} width="70%" maxW="40em" textAlign="left">
      <Text fontSize="2xl" fontWeight="bold" fontStyle="italic" mb={4}>
        Discover new albums
      </Text>
      <Box
        overflow="hidden"
        position="relative"
        borderRadius="lg"
        boxShadow="sm"
        py={6}
        css={{
          ".slick-dots": {
            bottom: "-1.6em",
          },
          ".slick-dots li button:before": {
            color: "#4A90E2",
          },
          ".slick-dots li.slick-active button:before": {
            color: "#1C4E80",
          },
          ".slick-slide": {
            padding: "0 10px", 
          },
        }}
      >
        <Slider {...settings}>
          {mockData.map((item, index) => (
            <Box
              as={Link}
              href={`/album/${item.id}`}
              key={index}
              bg="brand.400"
              p={4}
              borderRadius="md"
              boxShadow="sm"
              textAlign="center"
              _hover={{
                boxShadow: "lg",
                transform: "scale(1.05)",
                transition: "0.2s ease-in-out",
              }}
              height="13em" // Define altura fixa para todos os cards
              display="flex"
              flexDirection="column"
              justifyContent="space-between" // Alinha conteúdo internamente
            >
              <Image
                src={item.coverURL}
                alt={item.title}
                boxSize="100px"
                borderRadius="12px"
                objectFit="cover"
                mb={2}
                mx="auto" 
              />
              <Box>
                <Text fontWeight="medium" fontSize="lg" color="brand.500">
                  {truncateText(item.title, 10)}
                </Text>
                <Text fontSize="sm" fontStyle="italic" color="brand.500">
                  {truncateText(item.artist, 10)}
                </Text>
              </Box>
            </Box>
          ))}
        </Slider>
      </Box>
    </Box>
  );
};

export default DiscoverNewAlbums;
