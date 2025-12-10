import { useEffect, useState } from "react"; 
import "./Beverages.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchBeverageProducts } from "./store";
import { toast } from "react-toastify";

function Beverages() {
   const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 4;

const dispatch = useDispatch();

  // Get data from Redux store
  const { loading, beverageItems, error } = useSelector(globalstate => globalstate.beverage);

  // Fetch beverage data on first render
  useEffect(() => {
    dispatch(fetchBeverageProducts());
  }, []);

  // ===== Pagination Logic =====
  const lastItem = currentPage * itemsPerPage;
  const firstItem = lastItem - itemsPerPage;
  const currentItems = beverageItems.slice(firstItem, lastItem);
  const totalPages = Math.ceil(beverageItems.length / itemsPerPage);

  // ===== Render Beverage Cards =====
  const renderBeverageList = currentItems.map(item => (
    <li className="bev-card" key={item.id}>
      <div className="img-box">
        <img src={item.img} alt={item.name} />
        <button className="add-btn" onClick={() => {dispatch(addToCart(item));
          toast.success(`product ${item.name} added successfully`,{position:"top-center"})
        }}>
          ADD
        </button>
      </div>

      <div className="price-row">
        <span className="price">₹{item.price}</span>
        <span className="old-price">₹{item.oldPrice}</span>
      </div>

      <p className="offer">{item.offer}</p>
      <p className="name">{item.name}</p>
      <p className="pack">{item.pack}</p>
      <p className="tag">{item.tag}</p>
      <p className="rating">⭐ {item.rating}</p>
    </li>
  ));

  // ===== Pagination UI =====
  const renderPagination = (
    <>
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
        className="page-btn"
      >
        ◀ Previous
      </button>

      {[...Array(totalPages)].map((_, index) => {
        const pageNumber = index + 1;
        return (
          <button
            key={pageNumber}
            onClick={() => setCurrentPage(pageNumber)}
            className={`page-number-btn ${currentPage === pageNumber ? "active" : ""}`}
          >
            {pageNumber}
          </button>
        );
      })}

      <button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
        className="page-btn"
      >
        Next ▶
      </button>
    </>
  );

  // ===== UI Only =====
  return (
    <div className="bev-container">
      <h2 className="title">Beverages</h2>

      <ul className="bev-grid">
        {renderBeverageList}
      </ul>

      <div className="pagination-container">
        {renderPagination}
      </div>
    </div>
  );
}

export default Beverages;