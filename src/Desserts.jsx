import { useEffect, useState } from "react"; 
import "./Desserts.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchDessertProducts } from "./store";
import { toast } from "react-toastify";

function Desserts() {
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 4;



const dispatch = useDispatch();

  // Get data from Redux store
  const { loading, dessertItems, error } = useSelector(globalstate => globalstate.dessert);

  // Fetch dessert data when component first loads
  useEffect(() => {
    dispatch(fetchDessertProducts());
  }, []);

  // ===== Pagination Logic =====
  const lastItem = currentPage * itemsPerPage;
  const firstItem = lastItem - itemsPerPage;
  const currentItems = dessertItems.slice(firstItem, lastItem);
  const totalPages = Math.ceil(dessertItems.length / itemsPerPage);


  // ===== Render Dessert Cards =====
  const renderDessertList = currentItems.map(item => (
    <li className="dessert-card" key={item.id}>

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
    <div className="dessert-container">
      <h2 className="title">Desserts</h2>

      <ul className="dessert-grid">
        {renderDessertList}
      </ul>

      <div className="pagination-container">
        {renderPagination}
      </div>
    </div>
  );
}

export default Desserts;