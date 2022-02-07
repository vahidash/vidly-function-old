import ListGroup from "../common/ListGroup";

export default ({ genres, selectedGenre, onGenreSelect }) => {
  return (
    <ListGroup
      items={genres}
      selectedItem={selectedGenre}
      onItemSelect={onGenreSelect}
    />
  );
};
