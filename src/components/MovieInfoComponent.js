import { useEffect, useState } from "react";
import styled from "styled-components";
import { API_KEY } from "../App";
import axios from "axios";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background-color: #161b22;
  color: white;
  position: relative;
  animation: slideIn 0.5s ease-in-out;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  margin: 20px;

  @keyframes slideIn {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const CoverImage = styled.img`
  object-fit: cover;
  height: 350px;
  border-radius: 10px;
  margin-right: 20px;
`;

const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 600px;
`;

const MovieName = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #58a6ff;
  margin-bottom: 15px;
  text-transform: capitalize;
`;

const MovieInfo = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: #b3b3b3;
  margin: 5px 0;
  & span {
    color: #ffffff;
    opacity: 0.9;
  }
`;

const Close = styled.span`
  font-size: 20px;
  font-weight: 700;
  color: white;
  background: #d32f2f;
  height: 30px;
  width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
  position: absolute;
  top: 15px;
  right: 15px;
  transition: transform 0.3s ease, background 0.3s ease;

  &:hover {
    background: #f44336;
    transform: rotate(90deg);
  }
`;

const MovieInfoComponent = (props) => {
  const [movieInfo, setMovieInfo] = useState();
  const { selectedMovie } = props;

  useEffect(() => {
    axios
      .get(`https://www.omdbapi.com/?i=${selectedMovie}&apikey=${API_KEY}`)
      .then((response) => setMovieInfo(response.data));
  }, [selectedMovie]);

  return (
    <Container>
      {movieInfo ? (
        <>
          <CoverImage src={movieInfo?.Poster} alt={movieInfo?.Title} />
          <InfoColumn>
            <MovieName>{movieInfo?.Title}</MovieName>
            <MovieInfo>
              <strong>IMDB Rating:</strong> <span>{movieInfo?.imdbRating}</span>
            </MovieInfo>
            <MovieInfo>
              <strong>Year:</strong> <span>{movieInfo?.Year}</span>
            </MovieInfo>
            <MovieInfo>
              <strong>Language:</strong> <span>{movieInfo?.Language}</span>
            </MovieInfo>
            <MovieInfo>
              <strong>Rated:</strong> <span>{movieInfo?.Rated}</span>
            </MovieInfo>
            <MovieInfo>
              <strong>Released:</strong> <span>{movieInfo?.Released}</span>
            </MovieInfo>
            <MovieInfo>
              <strong>Runtime:</strong> <span>{movieInfo?.Runtime}</span>
            </MovieInfo>
            <MovieInfo>
              <strong>Genre:</strong> <span>{movieInfo?.Genre}</span>
            </MovieInfo>
            <MovieInfo>
              <strong>Director:</strong> <span>{movieInfo?.Director}</span>
            </MovieInfo>
            <MovieInfo>
              <strong>Actors:</strong> <span>{movieInfo?.Actors}</span>
            </MovieInfo>
            <MovieInfo>
              <strong>Plot:</strong> <span>{movieInfo?.Plot}</span>
            </MovieInfo>
          </InfoColumn>
          <Close onClick={() => props.onMovieSelect()}>×</Close>
        </>
      ) : (
        "Loading..."
      )}
    </Container>
  );
};

export default MovieInfoComponent;
