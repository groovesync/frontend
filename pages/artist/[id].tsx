import { Box, Flex, Image, Text } from "@chakra-ui/react";
import Head from "next/head";
import { useState } from "react";
import AlbumCover from "../../components/AlbumCover/AlbumCover";
import LoadContentButton from "../../components/LoadContentButton/LoadContentButton";
import Navbar from "../../components/Navbar/Navbar";
import useAuth from "../../hooks/useAuth";
import artistJson from "../../mockData/artist.json"

export default function AlbumPage() {

    const artist = artistJson
    const albums = artist.albums

    const ALBUMS_COUNT = 6
    const [visibleAlbums, setVisibleAlbums] = useState(ALBUMS_COUNT)
    const [seeMoreAlbumsUsed, setSeeMoreAlbumsUsed] = useState(false)

    const showMoreAlbums = () => {
        setSeeMoreAlbumsUsed(true)
        setVisibleAlbums((prev) => prev + ALBUMS_COUNT)        
    }

    const showLessAlbums = () => {
        setVisibleAlbums(ALBUMS_COUNT)

        if (visibleAlbums <= ALBUMS_COUNT) {
            setSeeMoreAlbumsUsed(false)
        }
    }

    const isAuthenticated = useAuth()

    if (!isAuthenticated) return null


    return (
        <>
        <Head>
            <title>{artist.name}</title>
        </Head>
        <Box 
            px={"180px"} 
            py={"40px"} 
            mx="auto">

            <Navbar />

            <Image 
                w={"100%"} 
                h={"275px"} 
                src={artist.coverURL} 
                alt={artist.name} 
                objectFit={"cover"} 
                borderRadius={"5px"}/>

            <Text 
                fontWeight={"bold"} 
                fontStyle={"italic"} 
                fontSize={"64px"} 
                pb="35px">
                    {artist.name}
            </Text>

            <Text 
                fontWeight={"medium"}  
                fontSize={"24px"} 
                pb="20px">
                    Albums
            </Text>

            <Flex 
                gap={"40px"} 
                flexFlow={"wrap"}>
                    {albums.slice(0, visibleAlbums).map((album, index) =>  
                        <AlbumCover 
                            key={index} 
                            coverURL={album.coverURL} 
                            pageURL={"/album/"+album.pageURL} 
                            title={album.title} 
                            year={album.year}/>)}
            </Flex>

            {visibleAlbums < albums.length && (
                <LoadContentButton loadMore={true} callback={showMoreAlbums} />
            )}

            {visibleAlbums >= albums.length && seeMoreAlbumsUsed && (
                <LoadContentButton loadMore={false} callback={showLessAlbums} />
            )}
        </Box>
        </>
    )
}