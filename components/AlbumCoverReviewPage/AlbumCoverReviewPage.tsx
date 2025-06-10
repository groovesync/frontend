import { HStack, Image, Link, Text, VStack } from "@chakra-ui/react"

/**
 * Props for the AlbumCoverReviewPage component.
 * 
 * @typedef {Object} AlbumCoverReviewPageProps
 * @property {string} coverURL - The URL of the album cover image.
 * @property {{ name: string, id: string }[]} artists - An array of artists with name and id.
 */
interface AlbumCoverReviewPageProps {
    coverURL: string,
    artists: {
        name: string,
        id: string
    }[]
}


/**
 * AlbumCoverReviewPage component displays an album cover and its associated artists.
 * Each artist name links to a dedicated artist page.
 *
 * @component
 * @param {AlbumCoverReviewPageProps} props - Component props.
 * @returns {JSX.Element} The album cover with clickable artist names.
 */
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