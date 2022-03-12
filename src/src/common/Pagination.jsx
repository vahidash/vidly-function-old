import { useContext } from "react";
import MoviesContext from "../contexts/moviesContext";
import _ from "lodash";

const Pagination = ({ itemsCount, currentPage, pageSize, onPageChange }) => {
  const ctx = useContext(MoviesContext);

  const pagesCount = Math.ceil(ctx.itemsCount / ctx.pageSize);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);

  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => (
          <li
            key={page}
            className={
              page === ctx.currentPage
                ? "page-item active clickable"
                : "page-item clickable"
            }
          >
            <a onClick={() => ctx.onPageChange(page)} className="page-link">
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
