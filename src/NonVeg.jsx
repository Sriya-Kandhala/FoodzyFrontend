import { useEffect, useState } from "react"; 
import "./NonVeg.css"; // using the same CSS styling
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchNonVegProducts, fetchVegProducts } from "./store";
import { toast } from "react-toastify";

function NonVeg() {

  const [currentPage, setCurrentPage] = useState(1);
  
    const itemsPerPage = 4;


const dispatch = useDispatch();

  // Access Redux state
  const { loading, nonVegItems, error } = useSelector(globalstate => globalstate.nonveg);

  // Fetch data only once when component loads
  useEffect(() => {
    dispatch(fetchNonVegProducts());
  }, []);

  // Pagination logic
  const lastItem = currentPage * itemsPerPage;
  const firstItem = lastItem - itemsPerPage;
  const currentItems = nonVegItems.slice(firstItem, lastItem);
  const totalPages = Math.ceil(nonVegItems.length / itemsPerPage);

  //  Render Food Cards 
  const renderNonVegList = currentItems.map(item => (
    <li className="veg-card" key={item.id}>
      
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

  //  Pagination UI 
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

  // Return UI Only 
  return (
    <div className="veg-container">
      <h2 className="title">Non-Veg Dishes</h2>

      <ul className="veg-grid">
        {renderNonVegList}
      </ul>

      <div className="pagination-container">
        {renderPagination}
      </div>
    </div>
  );
}

export default NonVeg;