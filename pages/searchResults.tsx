import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import { useState } from "react";
import Head from "next/head";
import AlbumCover from "../components/AlbumCover/AlbumCover";
import Navbar from "../components/Navbar/Navbar";
import LoadContentButton from "../components/LoadContentButton/LoadContentButton";
import artistJson from "../mockData/artist.json"
import ArtistProfilePicture from "../components/ArtistProfilePicture/ArtistProfilePicture";
import userProfileData from "../mockData/userProfileData.json"
import useAuth from "../hooks/useAuth";

export default function SearchResults() {

    const ALBUMS_COUNTS = 5
    const [visibleAlbums, setVisibleAlbums] = useState(ALBUMS_COUNTS)
    const [seeMoreAlbumsUsed, setSeeMoreAlbumsUsed] = useState(false)
    

    const showMoreAlbums = () => {
        setSeeMoreAlbumsUsed(true)
        setVisibleAlbums((prev) => prev + ALBUMS_COUNTS)
    }

    const showLessAlbums = () => {
        setVisibleAlbums(ALBUMS_COUNTS)

        if (visibleAlbums <= ALBUMS_COUNTS) {
            setSeeMoreAlbumsUsed(false)
        }
    }

    const artists = artistJson
    const albums = artistJson.albums
    const sortedAlbums = [...albums].sort((a, b) => a.year - b.year);
    const profiles = userProfileData

    const isAuthenticated = useAuth()

    if (!isAuthenticated) return null

    return (
      <Box px={"180px"} py={"40px"} mx="auto">
        <Head>
          <title>
            Search Results
          </title>
          
        </Head>
        <Navbar />

        <Text fontSize={"32px"} fontWeight={"bold"} fontStyle={"italic"} color={"brand.500"}>
        Search results for “The Smiths”
        </Text>

        <Text fontSize={"30px"} fontWeight={"medium"} color={"brand.500"} pb={"10px"} pt={"20px"}>
            Artists
        </Text>

        <Flex gap="40px" flexFlow={"wrap"}>
            <ArtistProfilePicture name={artists.name} pictureURL={artists.pictureURL} pageURL={""}/>
        </Flex>

        <Text fontSize={"32px"} fontWeight={"bold"} color={"brand.500"} pb={"10px"} pt={"20px"}>
            Albums
        </Text>

        <Flex gap="40px" flexFlow={"wrap"}>
        {sortedAlbums.slice(0, visibleAlbums).map((album) => (
          <AlbumCover
            key={album.id}
            coverURL={album.coverURL}
            pageURL={"/album/" + album.id}
            title={album.title}
            year={album.year}
          />
        ))}
      </Flex>

        {visibleAlbums < albums.length && (
            <LoadContentButton loadMore={true} callback={showMoreAlbums}/>
        )}

        {visibleAlbums >= albums.length && seeMoreAlbumsUsed && (
            <LoadContentButton loadMore={false} callback={showLessAlbums}/>
        )}

        <Text fontSize={"32px"} fontWeight={"bold"} color={"brand.500"} pb={"10px"} pt={"40px"}>
            Profiles
        </Text>

        <Flex gap="40px" flexFlow={"wrap"}>
            <ArtistProfilePicture name={profiles.name} pictureURL={profiles.profilePictureURL} pageURL={"/profile"}/>
            <ArtistProfilePicture name={profiles.name} pictureURL={profiles.profilePictureURL} pageURL={"/profile"}/>
            <ArtistProfilePicture name={profiles.name} pictureURL={profiles.profilePictureURL} pageURL={"/profile"}/>
        </Flex>
      </Box>
    );
  }
  

