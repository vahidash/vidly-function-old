import { Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./pages/LoginForm";
import NavBar from "./components/NavBar";
import Movies from "./pages/Movies";
import Customers from "./pages/Customers";
import Rentals from "./pages/Rentals";
import MoviesForm from "./pages/MovieForm";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <main className="container">
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate replace to="/movies" />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:id" element={<MoviesForm />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/rentals" element={<Rentals />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/not-found" />} />
      </Routes>
    </main>
  );
};

export default App;
