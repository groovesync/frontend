import React from "react";
import { Box, Grid, Heading, Image } from "@chakra-ui/react";

type ImageGridProps = {
  mainImage: string
  secondaryImages: string[]
};

const YourObssessions: React.FC<ImageGridProps> = ({ mainImage, secondaryImages }) => {
  return (
    <Box
     w="fit-content">

        <Heading color={"brand.500"} fontSize="32px" fontWeight="bold" fontStyle="italic" mb="15px">
            Your obssessions
        </Heading>

        <Grid
        templateColumns="300px 150px"
        alignItems="center"
        w="max-content"
        >
        <Box>
            <Image
            src={mainImage}
            alt="Main Image"
            objectFit="cover"
            w="300px"
            h="300px"
            />
        </Box>

        <Grid templateRows="repeat(2, 150px)" templateColumns="repeat(2, 150px)" gap={0}>
            {secondaryImages.map((src, index) => (
            <Image
                key={index}
                src={src}
                alt={`Secondary Image ${index + 1}`}
                objectFit="cover"
                w="150px"
                h="150px"
            />
            ))}
        </Grid>
        </Grid>
    </Box>
  );
};

export default YourObssessions;
