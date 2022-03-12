import { useContext } from "react";
import ListGroup from "../common/ListGroup";
import MoviesContext from "../contexts/moviesContext";

const GenresList = () => {
  const ctx = useContext(MoviesContext);

  return (
    <ListGroup
      items={ctx.genres}
      selectedItem={ctx.selectedGenre}
      onItemSelect={ctx.onGenreSelect}
    />
  );
};

export default GenresList;
