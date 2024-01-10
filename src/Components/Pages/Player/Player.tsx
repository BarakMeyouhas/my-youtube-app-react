import { useParams } from "react-router-dom";
import "./Player.css";
import { Container, Grid } from "@mui/material";

function Player(): JSX.Element {
  const params = useParams();

  return (
    <Container className="Player">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <h1>{params.title}</h1>
          <hr />
        </Grid>
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <iframe
            width="100%"
            height="315"
            src={`https://www.youtube.com/embed/${params.url}?autoplay=1`}
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
