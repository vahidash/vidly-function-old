export default ({ liked, onClick }) => {
  return (
    <i
      className={liked ? "fa fa-heart clickable" : "fa fa-heart-o clickable"}
      onClick={onClick}
    ></i>
  );
};
