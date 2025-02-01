import React from "react";
import Slider from "react-slick";
import { Box, Text, Image, Flex, Avatar } from "@chakra-ui/react";
import mockData from "../../mockData/popularWithFriends.json";
import { Rating } from "../Rating/Rating";
import Link from "next/link";

const PopularWithFriends: React.FC = () => {

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
        Popular with friends
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
            margin: "0 1rem 1rem 0",
          }
        }}
      >
        <Slider {...settings}>
          {data.map((item, index) => (
            <Flex
              as={Link}
              href={"/album/"+item.id}
              key={index}
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexDirection="column" 
              bg="white"
              p={4}
              borderRadius="md"
              textAlign="center"
              _hover={{ boxShadow: "sm", transform: "scale(1.05)" }}
              transition="all 0.2s ease-in-out"
            >
             <Image
                src={item.coverURL}
                alt={item.title}
                boxSize="100%"
                w="115px"
                h="115px"
                style={{ borderRadius: "5px" }}
                objectFit="cover"
                mb={2}
              />

              <Flex
                alignItems={"center"}
                justifyContent={"center"}
                gap={2}>
                <Avatar w="25px" h="25px" src={item.user.profilePictureURL}/> <Rating readOnly value={item.user.rating}/>
              </Flex>
            </Flex>
          ))}
        </Slider>
      </Box>
    </Box>
  );
};

export default PopularWithFriends;
