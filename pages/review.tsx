import React, { ReactHTMLElement, useEffect, useState } from "react";
import { Box, Text, VStack, Input, Image, Textarea, Button, HStack, border, Spinner } from "@chakra-ui/react";
import { Rating } from "../components/Rating/Rating";
import { SearchIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar/Navbar";
import AlbumCoverReviewPage from "../components/AlbumCoverReviewPage/AlbumCoverReviewPage";
import { useSearchParams } from "next/navigation";
import Head from "next/head";

interface SpotifyAlbumResponse {
    data: {
        albums: {
            items: {
                id: string,
                    images: {
                        url: string
                    }[],
                name: string,
                release_date: string,
                artists: {
                    name: string,
                    id: string
                }[]
            }[]
        }
    }
}

interface Album {
    id: string,
    images: {
        url: string
        }[],
    name: string,
    release_date: string,
    artists: {
        name: string,
        id: string
    }[]
}

const ReviewPage = () => {
    const [selectedAlbum, setSelectedAlbum] = useState<Album>();
    const [searchQuery, setSerchQuery] = useState("");
    const [didSearch, setDidSearch] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [searchResults, setSearchResults] = useState<SpotifyAlbumResponse>();
    const [reviewText, setReviewText] = useState("");
    const [rating, setRating] = useState(0);
    const router = useRouter()
    const params = useSearchParams()

    useEffect(() => {
        if (params.get('albumId')) {
            fetch(`http://150.165.85.37:5000/spotify/albums/${params.get('albumId')}?user_id=${localStorage.getItem('@groovesync-spotify-id')}`, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("@groovesync-backend-token"),
                    "Spotify-Token": localStorage.getItem("@groovesync-spotify-access-token") || "",
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    const transformedData: SpotifyAlbumResponse = {
                        data: {
                            albums: {
                                items: [
                                    {
                                        id: data.album_info.id,
                                        images: [{ url: data.album_info.image }],
                                        name: data.album_info.name,
                                        release_date: data.album_info.release_year, // Pode precisar formatar para AAAA-MM-DD
                                        artists: data.album_info.artists.map((artist: {name: string, id: string}) => ({
                                            name: artist.name,
                                            id: artist.id
                                        }))
                                    }
                                ]
                            }
                        }
                    };
                    
                    setSelectedAlbum(transformedData.data.albums.items[0]);
                    
                });
        }
    }, [params]);

    const searchAlbum = () => {
        setDidSearch(true)
        setIsLoading(true)
        fetch("http://150.165.85.37:5000/spotify/search/albums?q="+encodeURIComponent(searchQuery), {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("@groovesync-backend-token"),
                "Spotify-Token": localStorage.getItem("@groovesync-spotify-access-token") || ""
            }
        })
        .then((res) => res.json())
        .then((data) => {
            setSearchResults(data)
        })
        .then(() => setIsLoading(false))
        setIsLoading(false)
    };

    const postReview = () => {
        fetch("http://150.165.85.37:5000/review/save", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("@groovesync-backend-token"),
                "Spotify-Token": localStorage.getItem("@groovesync-spotify-access-token") || "",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {
                    "userId": localStorage.getItem("@groovesync-spotify-id") || "",
                    "rate": rating,
                    "albumId": selectedAlbum?.id,
                    "text": reviewText
                }
            )
        })
        router.push("/album/"+selectedAlbum?.id)
    }

    const formatArtistsString = (artists: { name: string; id: string }[]): string => {
        const names = artists.map(artist => artist.name).join(", ");
        return names.length > 50 ? names.slice(0, 47) + "..." : names;
    }

    return (
        <Box px={"180px"} py={"40px"} mx="auto" position="relative">
        <Head>
            <title>
                Review
            </title>
        </Head>
        <Navbar />

        <Box maxW="1200px" mx="auto" mt={10}>
            <Text fontSize="32px" fontWeight="bold" fontStyle="italic">
                We wanna hear your review!
            </Text>

            {!selectedAlbum ? (
                // Tela inicial de busca do álbum
                <HStack spacing={4} mt={5} justifyContent="start" alignItems={"start"}>
                    <AlbumCoverReviewPage coverURL="" artists={[{name: "", id: ""}]}/>
                    <VStack w="100%">
                            <HStack w="100%">
                            <Input
                                placeholder="Search for the album"
                                size="lg"
                                w="100%"
                                borderRadius="full"
                                onChange={(e) => setSerchQuery(e.target.value)}
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
                        {didSearch && isLoading ? <Spinner /> : (
                            <Box width={"100%"}>
                            {searchResults?.data?.albums?.items.map((album) => (
                                <HStack p="0.25rem"
                                border={"1px solid white"}
                                _hover={{
                                    border: "1px solid #153243",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                    transform: "scale(1.025)",
                                    transition: "all 0.2s ease-in-out"
                                }}
                                onClick={() => setSelectedAlbum(album)}>
                                    <Image src={album.images ? album.images[0].url : "/assets/DefaultAlbumCover.png"} w="50px" h="50px" borderRadius={"5px"}/>
                                    <Text>{album.name},</Text>
                                    <Text>{formatArtistsString(album.artists)}</Text>
                                </HStack>
                            ))}
                        </Box>
                        )}
                    </VStack>
                </HStack>
            ) : (
                // Tela após selecionar um álbum
                <VStack spacing={4} align="start" mt={5} maxW="1200px">
                    <HStack spacing={4} align="start">
                    <AlbumCoverReviewPage coverURL={selectedAlbum.images ? selectedAlbum.images[0].url : "/assets/DefaultAlbumCover.png"} 
                                        artists={selectedAlbum.artists}/>
                        <VStack align="start" w="700px">
                            <Text fontSize="xl" fontWeight="bold">
                                {selectedAlbum.name} • {selectedAlbum.release_date.split("-")[0]}
                            </Text>
                            <Rating value={rating} onChange={setRating} />

                            <Text fontSize="md" mt={3}>
                                Write what you think
                            </Text>
                            <Textarea
                                placeholder="Write your review..."
                                size="lg"
                                w="100%"
                                h="200px"
                                borderRadius="md"
                                value={reviewText}
                                onChange={(e) => {
                                    setReviewText(e.target.value)
                                }}
                            />

                            <HStack mt={4}>
                                <Button
                                    bg="brand.500"
                                    color="white"
                                    borderRadius="full"
                                    px={6}
                                    _hover={{ boxShadow: "md" }}
                                    onClick={() => postReview()}
                                    gap={"0.5rem"}
                                >
                                    <PostIcon />
                                    Post
                                </Button>
                                <Button
                                    variant="outline"
                                    borderColor="brand.500"
                                    color="brand.500"
                                    borderRadius="full"
                                    px={6}
                                    _hover={{ bg: "brand.400", color: "brand.500" }}
                                    onClick={() => setSelectedAlbum(undefined)}
                                    gap={"0.5rem"}
                                >
                                    <DiscardIcon />
                                    Discard
                                </Button>
                            </HStack>
                        </VStack>
                    </HStack>
                </VStack>
            )}
        </Box>
        </Box>
    );
};

export default ReviewPage;

const PostIcon = () => {
    return (
        <Image src={"/assets/PostIcon.png"}/>
    )
}

const DiscardIcon = () => {
    return (
        <Image src={"/assets/DiscardIcon.png"}/>
    )
}
