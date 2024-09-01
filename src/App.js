import React from 'react';
import { Container, Tabs, Tab, Box, Grid, Card, CardContent, Typography, Button, TextField } from '@mui/material';
import movies from './json/data.json';  
import './App.css';  

function App() {
  const [value, setValue] = React.useState(0);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [favourites, setFavourites] = React.useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handleAddToFavourites = (movie) => {
    setFavourites((prevFavourites) => {
      if (prevFavourites.find((fav) => fav.id === movie.id)) {
        return prevFavourites.filter((fav) => fav.id !== movie.id);
      }
     
      return [...prevFavourites, movie];
    });
  };

  
  const tabDataMap = [
    'movies-coming',      
    'movies-in-theaters', 
    'top-rated-india',    
    'top-rated-movies',   
  ];

  const currentMovies = movies[tabDataMap[value]] || [];

  const filteredMovies = currentMovies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery)
  );

  return (
    <Container>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <Tabs value={value} onChange={handleChange} aria-label="movie tabs">
          <Tab label="Coming Soon" />
          <Tab label="Movies in Theaters" />
          <Tab label="Top Rated Indian" />
          <Tab label="Top Rated Movies" />
          <Tab label="Favourites" />
        </Tabs>
        <TextField
          label="Search Movies"
          variant="outlined"
          onChange={handleSearchChange}
          value={searchQuery}
          size="small"
          style={{ width: '300px' }}
        />
      </Box>

      <TabPanel value={value} index={0}>
        <MovieGrid movies={filteredMovies} onAddToFavourites={handleAddToFavourites} favourites={favourites} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <MovieGrid movies={filteredMovies} onAddToFavourites={handleAddToFavourites} favourites={favourites} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <MovieGrid movies={filteredMovies} onAddToFavourites={handleAddToFavourites} favourites={favourites} />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <MovieGrid movies={filteredMovies} onAddToFavourites={handleAddToFavourites} favourites={favourites} />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <MovieGrid movies={favourites} onAddToFavourites={handleAddToFavourites} favourites={favourites} />
      </TabPanel>
    </Container>
  );
}

function TabPanel(props) {
  const { children, value, index } = props;
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

function MovieGrid({ movies, onAddToFavourites, favourites }) {
  return (
    <Grid container spacing={2}>
      {movies.map((movie, index) => {
        const posterPath = `/img/${movie.poster}`;  
        const isFavourite = favourites.some((fav) => fav.id === movie.id);

        return (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card>
              <CardContent className="card-content">
                <img src={posterPath} alt={movie.title} className="movie-image" />
                <Typography variant="h6" gutterBottom>{movie.title}</Typography>
                <Typography variant="body2">Year: {movie.year}</Typography>
                <Typography variant="body2">IMDB: {movie.imdbRating}</Typography>
                <Button
                  variant="contained"
                  color={isFavourite ? "secondary" : "primary"}
                  className="card-button"
                  onClick={() => onAddToFavourites(movie)}
                >
                  {isFavourite ? "Remove from Favourites" : "Add to Favourites"}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}

export default App;
