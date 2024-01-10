import { useNavigate, useParams } from "react-router-dom";
import SingleItem from "./SingleItem/SingleItem";
import "./YouTube.css";
import { useEffect, useState } from "react";
import { youtube } from "../../Redux/Store";
import { downloadSongsAction } from "../../Redux/SongReducer";
import axios from "axios";
import { downloadCategoryAction } from "../../Redux/CategoriesReducer";
import { Typography, Container, Stack } from "@mui/material";

function YouTube(): JSX.Element {
  const params = useParams();
  const navigate = useNavigate();
  const [songsList, setSongsList] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryResponse = await axios.get(
          "https://my-youtube-app-database-a8a16796b967.herokuapp.com/api/v1/youtube/catList"
        );
        const songResponse = await axios.get(
          "https://my-youtube-app-database-a8a16796b967.herokuapp.com/api/v1/youtube/songList"
        );

        youtube.dispatch(downloadCategoryAction(categoryResponse.data));
        youtube.dispatch(downloadSongsAction(songResponse.data));
        setSongsList(songResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const categoryId = Number(params.categoryId) || 0;
  const filteredSongs = categoryId
    ? youtube
        .getState()
        .songs.allSongs.filter(
          (item: { category: number }) => item.category === categoryId
        )
    : youtube.getState().songs.allSongs;

  const favoriteSongs = youtube.getState().songs.favoriteSongs;

  return (
    <>
      <Typography variant="h4" gutterBottom>
        All Songs
      </Typography>
      <Container>
        <Stack spacing={1} className="YouTube">
          {filteredSongs.map((item: { [x: string]: any }) => (
            <SingleItem
              key={item["id"]}
              url={item["url"]}
              category={item["category"]}
              categoryName={item["categoryName"]}
              title={item["title"]}
              description={item["description"]}
              img={item["img"]}
              id={item["id"]}
              isFavorite={favoriteSongs.some(
                (song: { id: any }) => song.id === item["id"]
              )}
            />
          ))}
        </Stack>
      </Container>
    </>
  );
}

export default YouTube;
