import { Box, Flex, Image, Spinner, Text } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AlbumCover from "../../components/AlbumCover/AlbumCover";
import LoadContentButton from "../../components/LoadContentButton/LoadContentButton";
import Navbar from "../../components/Navbar/Navbar";
import useAuth from "../../hooks/useAuth";

interface SpotifyArtistResponse {
    data: {
        external_urls: {
            spotify: string
        },
        images: {
            url: string
        }[],
        name: string
    }
}

interface SpotifyAlbumResponse {
    data: {
        items: {
            id: string,
            images: {
                url: string
            }[],
            name: string,
            release_date: string
        }[]
    }
}


export default function ArtistPage() {

    const router = useRouter();
  const { id } = router.query;
  
  const [artist, setArtist] = useState<SpotifyArtistResponse>();
  const [isLoading, setIsLoading] = useState(true);
  const [albums, setAlbums] = useState<SpotifyAlbumResponse>()

  useEffect(() => {
    if (!id) return

    const fetchArtist = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`http://150.165.85.37:5000/spotify/artist/${id}`, {
          headers: {
            "Authorization": "Bearer " + localStorage.getItem("@groovesync-backend-token"),
            "Spotify-Token": localStorage.getItem("@groovesync-spotify-access-token") || "",
          },
        });

        const data = await res.json();
        setArtist(data);
      } catch {
        router.reload()
      }  finally {
        setIsLoading(false);
      }
    };

    fetchArtist();

    const fetchAlbums = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`http://150.165.85.37:5000/spotify/artist/${id}/albums`, {
              headers: {
                "Authorization": "Bearer " + localStorage.getItem("@groovesync-backend-token"),
                "Spotify-Token": localStorage.getItem("@groovesync-spotify-access-token") || "",
              },
            });
    
            const data = await res.json();
            setAlbums(data)
          } catch {
            router.reload()
          } finally {
            setIsLoading(false);
          }
    }

    fetchAlbums();
  }, [id, router]);

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

    if (isLoading) return <Box w="100vw" h="100vh" display={"flex"} alignItems="center" justifyContent={"center"}><Spinner></Spinner></Box>


    return (
        <>
        <Head>
            <title>{"Name"}</title>
        </Head>
        <Box 
            px={"180px"} 
            py={"40px"} 
            mx="auto">

            <Navbar />

            <Image 
                w={"100%"} 
                h={"275px"} 
                src={artist?.data ? artist.data.images[0].url : ""} 
                alt={artist?.data ? artist.data.name : "Artist Image"} 
                objectFit={"cover"} 
                borderRadius={"5px"}/>

            <Text 
                fontWeight={"bold"} 
                fontStyle={"italic"} 
                fontSize={"64px"} 
                pb="35px">
                    {artist?.data ? artist.data.name : ""}
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
                    {albums?.data && albums?.data.items.slice(0, visibleAlbums).map((album, index) =>  
                        <AlbumCover 
                            key={index} 
                            coverURL={album.images[0].url} 
                            pageURL={"/album/"+album.id} 
                            title={album.name} 
                            year={parseInt(album.release_date.split("-")[0], 10)}/>)}
            </Flex>

            {visibleAlbums < (albums?.data.items.length || 0) && (
                <LoadContentButton loadMore={true} callback={showMoreAlbums} />
            )}

            {visibleAlbums >= (albums?.data.items.length || 0) && seeMoreAlbumsUsed && (
                <LoadContentButton loadMore={false} callback={showLessAlbums} />
            )}
        </Box>
        </>
    )
}

