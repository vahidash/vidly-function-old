import { createContext, useEffect, useState } from "react";
import { getGenres } from "../services/fakeGenreService";
import { getMovies } from "../services/fakeMovieService";
import usePaginate from "../hooks/usePaginate";
import _ from "lodash";

const MoviesContext = createContext();

export const MoviesContextProvider = (props) => {
  const pageSize = 4;
  const [genres, setGenres] = useState([]);
  const [movies, setMovies] = useState([]);
  const [sortColumn, setSortColumn] = useState({});
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [currentPage, setCurrentPage] = useState(null);

  useEffect(() => {
    setGenres([{ _id: "", name: "All GenresList" }, ...getGenres()]);
    setMovies(getMovies());
    setSortColumn({ path: "title", order: "asc" });
    setCurrentPage(1);
  }, []);

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
    setCurrentPage(1);
  };

  const handleLike = (movie) => {
    const moviesCopy = [...movies];
    const index = moviesCopy.indexOf(movie);
    moviesCopy[index].liked = !moviesCopy[index].liked;
    setMovies(moviesCopy);
  };

  const handleDelete = (movie) => {
    setMovies(movies.filter((m) => m !== movie));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSort = (path) => {
    const sortColumnCopy = { ...sortColumn };
    if (sortColumnCopy.path === path)
      sortColumnCopy.order = sortColumnCopy.order === "asc" ? "desc" : "asc";
    else {
      sortColumnCopy.path = path;
      sortColumnCopy.order = "asc";
    }
    setSortColumn(sortColumnCopy);
  };

  const filteredMoviesByGenre =
    selectedGenre && selectedGenre._id
      ? movies.filter((m) => m.genre._id === selectedGenre._id)
      : movies;

  const sortedMoviesByPath = _.orderBy(
    filteredMoviesByGenre,
    [sortColumn.path],
    [sortColumn.order]
  );

  const paginatedMovies = usePaginate(
    sortedMoviesByPath,
    currentPage,
    pageSize
  );

  return (
    <MoviesContext.Provider
      value={{
        genres,
        selectedGenre,
        onGenreSelect: handleGenreSelect,
        movies: paginatedMovies,
        onLike: handleLike,
        onDelete: handleDelete,
        onSort: handleSort,
        itemsCount: filteredMoviesByGenre.length,
        pageSize,
        currentPage,
        onPageChange: handlePageChange,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContext;
