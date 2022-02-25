import { useParams, useNavigate } from "react-router-dom";
const MovieForm = () => {
  const params = useParams();
  const navigate = useNavigate();
  return (
    <div className="container">
      <h1>Movie Form</h1>
      <h2>{params.id}</h2>
      <button onClick={() => navigate("/movies")} className="btn btn-primary">
        Save
      </button>
    </div>
  );
};

export default MovieForm;
