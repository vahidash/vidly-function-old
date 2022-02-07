import { useEffect, useState } from "react";
import { getGenres } from "./services/fakeGenreService";
import { getMovies } from "./services/fakeMovieService";

import Genres from "./components/Genres";
import Movies from "./components/Movies";

import Pagination from "./common/Pagination";
import usePaginate from "./hooks/usePaginate";

import _ from "lodash";

export default () => {
  const pageSize = 4;
  const [genres, setGenres] = useState([]);
  const [movies, setMovies] = useState([]);
  const [sortColumn, setSortColumn] = useState({});
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [currentPage, setCurrentPage] = useState(null);

  useEffect(() => {
    setGenres([{ _id: "", name: "All Genres" }, ...getGenres()]);
    setMovies(getMovies());
    setSortColumn({ path: "title", order: "asc" });
    setCurrentPage(1);
  }, []);

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
    setCurrentPage(1);
  };

  const handleDelete = (movie) => {
    setMovies(movies.filter((m) => m !== movie));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSort = (path) => {
    console.log(path);
    const sortColumnCopy = { ...sortColumn };
    if (sortColumnCopy.path == path)
      sortColumnCopy.order = sortColumnCopy.order == "asc" ? "desc" : "asc";
    else {
      sortColumnCopy.path = path;
      sortColumnCopy.order = "asc";
    }
    setSortColumn(sortColumnCopy);
  };

  const filteredMoviesByGenre =
    selectedGenre && selectedGenre._id
      ? movies.filter((m) => m.genre._id == selectedGenre._id)
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
    <main className="container">
      <div className="row">
        <div className="col-3">
          <Genres
            genres={genres}
            onGenreSelect={handleGenreSelect}
            selectedGenre={selectedGenre}
          />
        </div>
        <div className="col">
          <p>Showing {filteredMoviesByGenre.length} movies in the database!</p>
          <Movies
            recievedMovies={paginatedMovies}
            onDelete={handleDelete}
            onSort={handleSort}
          />
          <Pagination
            itemsCount={filteredMoviesByGenre.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </main>
  );
};
