export default ({ items, selectedItem, onItemSelect }) => {
  return (
    <ul className="list-group">
      {items.map((item) => (
        <li
          key={item._id}
          onClick={() => onItemSelect(item)}
          className={
            item == selectedItem ? "list-group-item active" : "list-group-item"
          }
        >
          {item.name}
        </li>
      ))}
    </ul>
  );
};
