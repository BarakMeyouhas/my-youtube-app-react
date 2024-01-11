import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import Song from "../../modal/Song";
import { youtube } from "../../Redux/Store";
import { ChangeEvent, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import SingleItem from "../../Layout/YouTube/SingleItem/SingleItem";
import axios from "axios";

function SongSearch(): JSX.Element {
  const allSongs = youtube.getState().songs.allSongs;
  const [searchValue, setSearchValue] = useState("");
  const [filteredSongs, setFilteredSongs] = useState<Song[]>([]);
  const apiKey = "AIzaSyBKQzeoMIHA942XqOho1fwPedksQ5fps2s";

  const apiURL = `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${apiKey}&type=video&q=${searchValue}&maxResults=20`;

  const handleSearch = () => {
    console.log(searchValue);
    axios.get(apiURL).then((response) => {
      const items = response.data.items;
      const newFilteredSongs: Song[] = items.map((item: any) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        img: item.snippet.thumbnails.medium.url,
        url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
        categoryName: "Your Category",
      }));
      setFilteredSongs(newFilteredSongs);
      console.log(items.url);
    });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="SongSearch">
      <Container
        sx={{
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <Grid>
          <Typography sx={{}} variant="h4" gutterBottom>
            Search Song From youtube
          </Typography>
          <Grid>
            <TextField
              label="Search Song from youtube"
              variant="outlined"
              className="SearchInput"
              value={searchValue}
              onChange={handleInputChange}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSearch}
              style={{ height: "56px" }}
            >
              <SearchIcon />
            </Button>
          </Grid>
        </Grid>
      </Container>

      <hr />

      <div>
        {filteredSongs.map((song) => (
          <SingleItem
            key={song.id}
            url={song.url}
            title={song.title}
            description={song.description}
            img={song.img}
            id={song.id}
            categoryName={song.categoryName}
            category={0}
            isFavorite={false}
          />
        ))}
      </div>
    </div>
  );
}

export default SongSearch;
