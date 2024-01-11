import { useParams, useNavigate } from "react-router-dom";
import "./Player.css";
import { Button, Container, Grid } from "@mui/material";

function Player(): JSX.Element {
  const { title, url } = useParams();
  const navigate = useNavigate();

  const videoURL = `https://www.youtube.com/watch?v=${url}`;

  const addSong = () => {
    console.log("addSong clicked");
    navigate(`/addSong?params=${encodeURIComponent(videoURL)}`);
  };

  return (
    <Container className="Player">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <h1>{title}</h1>
          <Button onClick={addSong} variant="contained" color="primary">
            Add Song
          </Button>
          <hr />
        </Grid>
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <iframe
            width="100%"
            height="315"
            src={`https://www.youtube.com/embed/${url}?autoplay=1`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Player;
