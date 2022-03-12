import { useContext } from "react";
import { Link } from "react-router-dom";
import Like from "../common/Like";
import MoviesContext from "../contexts/moviesContext";

const MoviesTable = () => {
  const ctx = useContext(MoviesContext);

  return (
    <div>
      <p>Showing {ctx.itemsCount} movies in the database!</p>
      <table className="table">
        <thead>
          <tr>
            <th onClick={() => ctx.onSort("title")}>Title</th>
            <th onClick={() => ctx.onSort("genre.name")}>Genre</th>
            <th onClick={() => ctx.onSort("numberInStock")}>Stock</th>
            <th onClick={() => ctx.onSort("dailyRentalRate")}>Rate</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {ctx.movies.map((movie) => (
            <tr key={movie._id}>
              <td>
                <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
              </td>
              <td>{movie.genre.name}</td>
              <td>{movie.numberInStock}</td>
              <td>{movie.dailyRentalRate}</td>
              <td>
                <Like liked={movie.liked} onClick={() => ctx.onLike(movie)} />
              </td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => ctx.onDelete(movie)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MoviesTable;
