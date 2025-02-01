import { Avatar, Box, Flex, Image, Text } from "@chakra-ui/react";
import Slider from "react-slick";
import { Rating } from "../Rating/Rating";
import mockData from "../../mockData/discoverNewAlbums.json"
import Link from "next/link";

const DiscoverNewAlbums = () => {

    const truncateText = (text: string, maxLength: number) => {
        return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
    };

    const data = mockData

    const settings = {
        dots: true,
        speed: 500,
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
        variableWidth: true,
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
        <Box mt={8}  maxW="40em" textAlign="left">
      <Text fontSize="32px" fontWeight="bold" fontStyle="italic" mb={4}>
        Discover new albums
      </Text>
      <Box
        overflow="hidden"
        position="relative"
        pt={0}
        pb={4}
        className={"slide-container"}
        css={{
          ".slick-dots": {
            bottom: "-1.2em", 
          },
          ".slick-dots li button:before": {
            color: "#4A90E2", 
          },
          ".slick-dots li.slick-active button:before": {
            color: "#1C4E80", 
          },
          ".slick-slide": {
            margin: "0 1rem",
            paddingBottom: "1rem"
          }
        }}
      >
        <Slider {...settings}>
          {data.map((item, index) => (
            <Box
                as={Link}
                href={item.id}
                key={index}
                bg="brand.400"
                pt={4}
                pl={4}
                pr={4}
                pb={1}
                borderRadius="5px"
                boxShadow="sm"
                width="200px"
                height="fit-content"
                justifyItems="center"
                alignItems={"space-between"}
            >
            <Image
              src={item.coverURL}
              alt={item.title}
              boxSize="100%"
              w="115px"
              h="115px"
              borderRadius="md"
              objectFit="cover"
              mb={0.25}
            />

            <Box w="100%" p={2}>
              <Text fontWeight="semibold" fontSize="16px" isTruncated color={"brand.500"}>
                {truncateText(item.title, 10)}
              </Text>
              <Text fontSize="16px" fontStyle={"italic"} fontWeight={"regular"} color={"brand.500"}>
                {truncateText(item.artist, 10)}
              </Text>
            </Box>
          </Box>
          ))}
        </Slider>
      </Box>
    </Box>
    )
}

export default DiscoverNewAlbums

