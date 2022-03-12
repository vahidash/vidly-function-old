import GenresList from "../components/GenresList";
import MoviesTable from "../components/MoviesTable";
import Pagination from "../common/Pagination";
import { MoviesContextProvider } from "../contexts/moviesContext";

const Movies = () => {
  return (
    <MoviesContextProvider>
      <div className="row">
        <div className="col-3">
          <GenresList />
        </div>
        <div className="col">
          <MoviesTable />
          <Pagination />
        </div>
      </div>
    </MoviesContextProvider>
  );
};

export default Movies;
