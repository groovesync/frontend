import { Button } from "@chakra-ui/react"

const TesteFollow = () => {

    const seguir = (spotifyId1: string, spotifyId2: string) => {
        fetch(`http://150.165.85.37:5000/follow/add`,{
            method: "POST",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("@groovesync-backend-token"),
                "Spotify-Token": localStorage.getItem("@groovesync-spotify-access-token") || "",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({"spotifyId1": spotifyId1, "spotifyId2": spotifyId2})})
        .then((res) => res.json())
        .then((data) => console.log(data))
    }

    const pararSeguir = (spotifyId1: string, spotifyId2: string) => {
        fetch(`http://150.165.85.37:5000/follow/remove?spotifyId1=${spotifyId1}&spotifyId2=${spotifyId2}`,{
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("@groovesync-backend-token"),
                "Spotify-Token": localStorage.getItem("@groovesync-spotify-access-token") || "",
                "Content-Type": "application/json"
            }})
        .then((res) => res.json())
        .then((data) => console.log(data))
    }

    const seguidores = (spotifyId: string) => {
        fetch(`http://150.165.85.37:5000/follow/followers/${spotifyId}`,{
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("@groovesync-backend-token"),
                "Spotify-Token": localStorage.getItem("@groovesync-spotify-access-token") || "",
                "Content-Type": "application/json"
            }})
        .then((res) => res.json())
        .then((data) => console.log(data))
    }

    const seguindo = (spotifyId: string) => {
        fetch(`http://150.165.85.37:5000/follow/following/${spotifyId}`,{
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("@groovesync-backend-token"),
                "Spotify-Token": localStorage.getItem("@groovesync-spotify-access-token") || "",
                "Content-Type": "application/json"
            }})
        .then((res) => res.json())
        .then((data) => console.log(data))
    }

    return (
        <>
        <Button
            onClick={() => seguir("12145593378", "lusca.lindo")}>
            Seguir Leones
        </Button>

        <Button
            onClick={() => pararSeguir("12145593378", "lusca.lindo")}>
            Parar de seguir Leones
        </Button>

        <Button
            onClick={() => seguir("lusca.lindo", "12145593378")}>
            Leones me seguir
        </Button>

        <Button
            onClick={() => pararSeguir("lusca.lindo", "12145593378")}>
            Leones parar de me seguir
        </Button>

        <Button
            onClick={() => seguidores("12145593378")}>
            Buscar os meus seguidores
        </Button>

        <Button
            onClick={() => seguindo("12145593378")}>
            Buscar os meus seguindo
        </Button>

        <Button
            onClick={() => seguidores("lusca.lindo")}>
            Buscar os seguidores de Leones
        </Button>

        <Button
            onClick={() => seguindo("lusca.lindo")}>
            Buscar os seguindo de Leones
        </Button>
        </>
    )
}

export default TesteFollow