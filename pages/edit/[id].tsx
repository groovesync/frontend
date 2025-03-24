import { Box, Button, HStack, Image, Spinner, Text, Textarea, VStack } from "@chakra-ui/react"
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AlbumCoverReviewPage from "../../components/AlbumCoverReviewPage/AlbumCoverReviewPage"
import Navbar from "../../components/Navbar/Navbar";
import { Rating } from "../../components/Rating/Rating"

interface EditReviewResponse {
    review: {
        user_id: string,
        rate: number,
        text: string,
        _id: string
    },
    album_info: {
        name: string,
        id: string,
        artists: {
            name: string,
            id: string
        }[],
        image: string,
        release_year: string
    }
}

const EditReviewPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const [reviewText, setReviewText] = useState("");
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState<EditReviewResponse>()
    const [isLoading, setIsLoading] = useState(true)

    const updateReview = () => {
        if (id) {
        fetch("http://150.165.85.37:5000/review/update/"+review?.review._id, {
            method: "PUT",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("@groovesync-backend-token"),
                "Spotify-Token": localStorage.getItem("@groovesync-spotify-access-token") || "",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {
                    "rate": rating,
                    "text": reviewText
                }
            )
        })
        router.push("/album/"+review?.album_info.id)
        }
    }

    useEffect(() => {
        if (id) {
            fetch(`http://150.165.85.37:5000/review/get-by-review-id/${id}`, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("@groovesync-backend-token"),
                    "Spotify-Token": localStorage.getItem("@groovesync-spotify-access-token") || "",
                  },
            })
            .then((res) => res.json())
            .then((data) => {
                setReview(data)
                setRating(data["review"]["rate"])
                setReviewText(data["review"]["text"])
                setIsLoading(false)
            })
        }
    }, [router, id])
    return (
        <>
        {!isLoading ?
        <Box px={"180px"} py={"40px"} mx="auto" position="relative">

        <Head>
            <title>
                Edit review
            </title>
        </Head>
        <Navbar />
        <Box maxW="1200px" mx="auto" mt={10}>
            <Text fontSize="32px" fontWeight="bold" fontStyle="italic">
                You are now editing your review!
            </Text>
            <VStack spacing={4} align="start" mt={5} maxW="1200px">
                    <HStack spacing={4} align="start">
                    <AlbumCoverReviewPage coverURL={review?.album_info ? review?.album_info.image : "/assets/DefaultAlbumCover.png"} 
                                        artists={review?.album_info ? review?.album_info.artists : []}/>
                        <VStack align="start" w="700px">
                            <Text fontSize="xl" fontWeight="bold">
                                {review?.album_info ? review?.album_info.name : ""} • {review?.album_info ? review?.album_info.release_year : ""}
                            </Text>
                            <Rating value={review?.review ? review?.review.rate : 0} onChange={setRating} />

                            <Text fontSize="md" mt={3}>
                                Write what you think
                            </Text>
                            <Textarea
                                placeholder={review?.review ? review?.review.text : ""}
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
                                    onClick={() => updateReview()}
                                    gap={"0.5rem"}
                                >
                                    <PostIcon />
                                    Update
                                </Button>
                                <Button
                                    variant="outline"
                                    borderColor="brand.500"
                                    color="brand.500"
                                    borderRadius="full"
                                    px={6}
                                    _hover={{ bg: "brand.400", color: "brand.500" }}
                                    onClick={() => router.back()}
                                    gap={"0.5rem"}
                                >
                                    <DiscardIcon />
                                    Cancel
                                </Button>
                            </HStack>
                        </VStack>
                    </HStack>
                </VStack>
            </Box>
            </Box> : 
            <Box
            w="100vw"
            h="100vh"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Spinner size="xl" />
          </Box>}
        </>
    )
}

export default EditReviewPage

const PostIcon = () => {
    return (
        <Image alt={"Confirmation icon"} src={"/assets/PostIcon.png"}/>
    )
}

const DiscardIcon = () => {
    return (
        <Image alt={"Deletion icon"} src={"/assets/DiscardIcon.png"}/>
    )
}
