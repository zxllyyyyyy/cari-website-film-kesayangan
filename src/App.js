import "./style/App.css";
import { getMovieList, searchMovie } from "./components/api";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";

const App = () => {
  const [popularMovie, setPopularMovie] = useState([]);

  useEffect(() => {
    getMovieList().then((results) => {
      setPopularMovie(results);
    });
  }, []);

  const PopularMovieList = () => {
    return popularMovie.map((movie, i) => {
      return (
        <div className="wrapper" key={i}>
          <img
            className="Movie-img"
            src={`${process.env.REACT_APP_BASEIMGURL}/${movie.poster_path}`}
          />
          <div className="Movie-text">
            <div className="title">{movie.title}</div>
            <div className="date">{movie.release_date}</div>
            <div className="rate">{movie.vote_average}</div>
          </div>
        </div>
      );
    });
  };

  const search = async (q) => {
    if (q.length > 3) {
      const query = await searchMovie(q);
      setPopularMovie(query.results);
    }
  };

  return (
    <div className="App">
      <header className="App-list">
        <Navbar />
        <input
          placeholder="Search..."
          className="Movie-search"
          onChange={({ target }) => search(target.value)}
        />
      </header>
      <nav className="Nav-list">
        <div className="container">
          <PopularMovieList />
        </div>
      </nav>
    </div>
  );
};

export default App;
