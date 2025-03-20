import { HStack, Image, Link, Text, VStack } from "@chakra-ui/react"

interface AlbumCoverReviewPageProps {
    coverURL: string,
    artists: {
        name: string,
        id: string
    }[]
}

const AlbumCoverReviewPage: React.FC<AlbumCoverReviewPageProps> = ({coverURL, artists}) => {
    return (
        <>
        <VStack alignItems={"start"}>
            <Image alt={"Album Cover"} src={coverURL ? coverURL : "/assets/DefaultAlbumCover.png"} minW="300px" h="300px" borderRadius={"5px"}/>

            {/*Artists*/}
            <VStack>
                {artists.map((artist) => (
                    <HStack
                    key={artist.id}>
                        <Text
                            as={Link}
                            href={"/artist/"+artist.id}>
                            {artist.name ? artist.name : ""}
                        </Text>
                    </HStack>
                ))}
            </VStack>
        </VStack>
        </>
    )
}

export default AlbumCoverReviewPage