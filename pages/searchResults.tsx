import { Box, Button, Flex, Image, Spinner, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Head from "next/head";
import AlbumCover from "../components/AlbumCover/AlbumCover";
import Navbar from "../components/Navbar/Navbar";
import LoadContentButton from "../components/LoadContentButton/LoadContentButton";
import artistJson from "../mockData/artist.json"
import ArtistProfilePicture from "../components/ArtistProfilePicture/ArtistProfilePicture";
import userProfileData from "../mockData/userProfileData.json"
import useAuth from "../hooks/useAuth";
import { useRouter } from "next/router";
import { headers } from "next/headers";


interface SpotifyArtistResponse {
  items: {
      external_urls: {
          spotify: string
      },
      images: {
          url: string
      }[],
      name: string,
      id: string
  }[]
}

interface SpotifyAlbumResponse {
  items: {
      id: string,
          images: {
              url: string
          }[],
          name: string,
          release_date: string
  }[]
}

export default function SearchResults() {

    const router = useRouter();
    const { query } = router
    const searchQuery = query.query || "";
    const [albums, setAlbums] = useState<SpotifyAlbumResponse>()
    const [artists, setArtists] = useState<SpotifyArtistResponse>()
    const [isLoadingAlbums, setIsLoadingAlbums] = useState(true)
    const [isLoadingArtists, setIsLoadingArtists] = useState(true)

    useEffect(() => {
      setIsLoadingAlbums(true)
      setIsLoadingArtists(true)
      fetch(`http://150.165.85.37:5000/spotify/search?q=${encodeURIComponent(typeof searchQuery === "string" ? searchQuery : searchQuery[0])}`,{
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("@groovesync-backend-token"),
        "Spotify-Token": localStorage.getItem("@groovesync-spotify-access-token") || ""
      }})
      .then((res) => res.json())
      .then((data) => {
        setAlbums(data["albums"])
        setArtists(data["artists"])
      })
      .then(() => {
        setIsLoadingAlbums(false)
        setIsLoadingArtists(false) }
      )
    }, [searchQuery]);

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
        Search results for “{searchQuery}”
        </Text>

        <Text fontSize={"32px"} fontWeight={"bold"} color={"brand.500"} pb={"10px"} pt={"20px"}>
            Artists
        </Text>


        {isLoadingArtists || !artists?.items ? 
        <Box w="100%" h="200px" display={"flex"} alignItems="center" justifyContent={"center"}>
          <Spinner />
        </Box> :

         <Flex gap="40px" flexFlow={"wrap"}>
         {artists.items ? artists?.items.slice(0, 5).map((artist) => <ArtistProfilePicture key={artist.id} name={artist.name} pictureURL={artist.images.length > 0 ? artist.images[0].url : ""} pageURL={"artist/"+artist.id}/>) : ""}
        </Flex>}
       

        <Text fontSize={"32px"} fontWeight={"bold"} color={"brand.500"} pb={"10px"} pt={"20px"}>
            Albums
        </Text>

        {isLoadingAlbums || !albums?.items ? 
        <Box w="100%" h="200px" display={"flex"} alignItems="center" justifyContent={"center"}>
          <Spinner />
        </Box> :
        <>
          <Flex gap="40px" flexFlow={"wrap"}>
          {albums.items ? albums?.items.slice(0, visibleAlbums).map((album) => (
            <AlbumCover
              key={album.id}
              coverURL={album.images[0]["url"]}
              pageURL={"/album/" + album.id}
              title={album.name}
              year={parseInt(album.release_date, 10)}
            />
          )): ""}
        </Flex>

          {visibleAlbums < (albums?.items ? albums?.items.length : 0) && (
              <LoadContentButton loadMore={true} callback={showMoreAlbums}/>
          )}

          {visibleAlbums >= (albums?.items ? albums?.items.length : 0) && seeMoreAlbumsUsed && (
              <LoadContentButton loadMore={false} callback={showLessAlbums}/>
          )}
        </>
        }

        

        {/*
        <Text fontSize={"32px"} fontWeight={"bold"} color={"brand.500"} pb={"10px"} pt={"40px"}>
            Profiles
        </Text>

        <Flex gap="40px" flexFlow={"wrap"}>
            <ArtistProfilePicture name={profiles.name} pictureURL={profiles.profilePictureURL} pageURL={"/profile"}/>
            <ArtistProfilePicture name={profiles.name} pictureURL={profiles.profilePictureURL} pageURL={"/profile"}/>
            <ArtistProfilePicture name={profiles.name} pictureURL={profiles.profilePictureURL} pageURL={"/profile"}/>
        </Flex>*/}
      </Box>
    );
  }
  

