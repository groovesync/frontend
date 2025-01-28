import { ExternalLinkIcon } from "@chakra-ui/icons"
import { Button, Image, Link } from "@chakra-ui/react"

const OpenSpotifyButton: React.FC<{link: string, text: string}> = ({link, text}) => {
    return (
    <Button
            as={Link}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            bg="brand.400"
            color="brand.500"
            fontWeight="regular"
            borderRadius="full"
            gap={4}
            h="35px"
            w="210px"
            _hover={{}}
        >
            <SpotifyIcon /> {text}
        </Button>
    )
}

const SpotifyIcon = () => {
    return (
        <Image alt="Spotify Icon" src={"/assets/Spotify.svg"} />
    )
}

export default OpenSpotifyButton
