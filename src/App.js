import styled from "styled-components";
import MovieComponent from "./components/MovieComponent";
import MovieInfoComponent from "./components/MovieInfoComponent";
import { useState } from "react";
import axios from "axios";

export const API_KEY = "c3751cf";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #121212;
`;

const Header = styled.div`
  background-color: #0d1117;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 20px;
  font-size: 25px;
  font-weight: bold;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.5);
  position: sticky;
  top: 0;
  z-index: 10;
`;

const AppName = styled.div`
  display: flex;
  align-items: center;
  cursor: default;
`;

const MovieImage = styled.img`
  width: 48px;
  height: 48px;
  margin-right: 10px;
`;

const SearchBox = styled.div`
  display: flex;
  margin-right: 20px;
  align-items: center;
  padding: 10px;
  border-radius: 6px;
  width: 50%;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const SearchIcon = styled.img`
  width: 24px;
  height: 24px;
  opacity: 0.6;
`;

const SearchInput = styled.input`
  color: black;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
  margin-left: 10px;
  flex: 1;
  transition: opacity 0.3s ease;

  &:focus {
    opacity: 1;
  }
`;

const MovieListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 20px;
  gap: 20px;
  justify-content: center;
  color: white;
  background-color:#161B22;
`;
const Placeholder = styled.img`
  width: 120px;
  height: 120px;
  margin: 250px;
  opacity: 50%;
`;


function App() {
  const [searchQuery, updateSearchQuery] = useState("");
  const [timeoutId, updateTimeoutId] = useState();
  const [movieList, updateMovieList] = useState([]);
  const [selectedMovie, onMovieSelect] = useState();

  const fetchData = async (searchString) => {
    const response = await axios.get(`https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`)
    console.log(response);
    updateMovieList(response.data.Search);
  }
  const onTextChange = (e) => {
    clearTimeout(timeoutId);
    updateSearchQuery(e.target.value);
    const timeout = setTimeout(() => fetchData(e.target.value), 500);
    updateTimeoutId(timeout);
  };

  return (
    <Container>
      <Header>
        <AppName>
          <MovieImage src="/movie.png" />
          Movie Explorer
        </AppName>
        <SearchBox>
          <SearchIcon src="/search.png" />
          <SearchInput placeholder="Search Movie Name" value={searchQuery} onChange={onTextChange} />
        </SearchBox>
      </Header>
      {selectedMovie && <MovieInfoComponent selectedMovie={selectedMovie} onMovieSelect={onMovieSelect}/>}
      <MovieListContainer>
        {movieList?.length ? (
          movieList.map((movie, index) => (
            <MovieComponent
              key={index}
              movie={movie}
              onMovieSelect={onMovieSelect}
            />
          ))
        ): <Placeholder src="moviePlaceholder.png" />}
      </MovieListContainer>
    </Container>
  );
}

export default App;
