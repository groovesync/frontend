import React, { useState } from "react";
import { Box, Text, VStack, Input, Image, Textarea, Button, HStack } from "@chakra-ui/react";
import { Rating } from "../components/Rating/Rating";
import { SearchIcon } from "@chakra-ui/icons";

const ReviewPage = () => {
    const [selectedAlbum, setSelectedAlbum] = useState<any>(null);
    const [reviewText, setReviewText] = useState("");
    const [rating, setRating] = useState(0);

    // Simulação da busca de álbum (depois pode ser integrada com a API)
    const searchAlbum = () => {
        setSelectedAlbum({
            title: "Clube da Esquina",
            year: 1972,
            coverURL: "/assets/album-placeholder.jpg",
            artists: ["Milton Nascimento", "Lô Borges"],
        });
    };

    return (
        <Box maxW="800px" mx="auto" mt={10}>
            <Text fontSize="2xl" fontWeight="bold" fontStyle="italic">
                We wanna hear your review!
            </Text>

            {!selectedAlbum ? (
                // Tela inicial de busca do álbum
                <VStack spacing={4} mt={5}>
                    <HStack w="100%">
                        <Input
                            placeholder="Search for the album"
                            size="lg"
                            w="100%"
                            borderRadius="full"
                        />
                        <Button
                            bg="brand.500"
                            color="white"
                            borderRadius="full"
                            px={6}
                            _hover={{ boxShadow: "md" }}
                            leftIcon={<SearchIcon />}
                            onClick={searchAlbum}
                        >
                            Search
                        </Button>
                    </HStack>
                </VStack>
            ) : (
                // Tela após selecionar um álbum
                <VStack spacing={4} align="start" mt={5}>
                    <HStack spacing={4} align="start">
                        <Image src={selectedAlbum.coverURL} boxSize="150px" borderRadius="md" />
                        <VStack align="start">
                            <Text fontSize="xl" fontWeight="bold">
                                {selectedAlbum.title} • {selectedAlbum.year}
                            </Text>
                            <Rating value={rating} onChange={setRating} />
                        </VStack>
                    </HStack>

                    <Text fontSize="md" mt={3}>
                        Write what you think
                    </Text>
                    <Textarea
                        placeholder="Write your review..."
                        size="lg"
                        w="100%"
                        borderRadius="md"
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                    />

                    <HStack mt={4}>
                        <Button
                            bg="brand.500"
                            color="white"
                            borderRadius="full"
                            px={6}
                            _hover={{ boxShadow: "md" }}
                        >
                            Post
                        </Button>
                        <Button
                            variant="outline"
                            borderColor="brand.500"
                            color="brand.500"
                            borderRadius="full"
                            px={6}
                            _hover={{ bg: "brand.400", color: "white" }}
                            onClick={() => setSelectedAlbum(null)}
                        >
                            Discard
                        </Button>
                    </HStack>
                </VStack>
            )}
        </Box>
    );
};

export default ReviewPage;
