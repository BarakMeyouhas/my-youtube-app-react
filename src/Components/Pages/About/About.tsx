import React from "react";
import { Typography, Paper, Container } from "@mui/material";
import "./About.css";

function About(): JSX.Element {
  return (
    <Container component="main" maxWidth="md">
      <Paper elevation={6} className="About">
        <Typography variant="h4" gutterBottom className="about-heading">
          About My YouTube App
        </Typography>
        <Typography variant="body1" paragraph>
          Welcome to My YouTube App! This application allows you to explore and
          manage your favorite YouTube songs. You can perform various actions
          within the app to enhance your experience.
        </Typography>
        <Typography variant="h5" gutterBottom className="feature-heading">
          Key Features:
        </Typography>
        <ul className="feature-list">
          <li>Search and add new songs from YouTube.</li>
          <li>Categorize songs into different categories.</li>
          <li>View all songs and filter them based on categories.</li>
          <li>Mark your favorite songs and view them in the Favorites section.</li>
        </ul>
        <Typography variant="h5" gutterBottom className="get-started-heading">
          How to Get Started:
        </Typography>
        <Typography variant="body1" paragraph className="get-started-text">
          To get started, navigate to the "All Songs" section and explore the
          available songs. You can also add new songs, create categories, and
          customize your experience. Enjoy using My YouTube App!
        </Typography>
        <Typography variant="h5" gutterBottom className="contact-heading">
          Contact Me:
        </Typography>
        <Typography variant="body1" paragraph className="contact-text">
          If you have any questions or feedback, feel free to contact me at
          barakm25@gmail.com.
          and my <a target="_blank" href="https://github.com/BarakMeyouhas">GitHub account</a>
        </Typography>
      </Paper>
    </Container>
  );
}

export default About;
