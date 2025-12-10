import { useEffect, useState } from "react"; // ✅ Correct
import "./Veg.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchVegProducts } from "./store";
import { toast } from "react-toastify";

function Veg() {

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 4;



const {loading, vegItems1, error} = useSelector(globalstate => globalstate.veg)

  // Pagination logic
  const end = currentPage * itemsPerPage;
  const start = end - itemsPerPage;
  const currentItems = vegItems1.slice(start, end);
  const totalPages = Math.ceil(vegItems1.length / itemsPerPage);

  //for dispatching 
  const dispatch = useDispatch();

  useEffect(()=>{
  dispatch(fetchVegProducts());
   },[]);


   
  const vegList = currentItems.map((item) => (
    <li className="veg-card" key={item.id}>
      <div className="img-box">
        <img src={item.img} alt={item.name} />
        <button
          className="add-btn"
          onClick={() => {dispatch(addToCart(item));
                          toast.success(`product ${item.name} added successfully`,{position:"top-center"})}
           }
        >
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

  // ------- Pagination Buttons UI -------
  const paginationButtons = (
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
            className={`page-number-btn ${
              currentPage === pageNumber ? "active" : ""
            }`}
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

  // ------- RETURN (Only UL + LI tags printed) -------
  return (
    <div className="veg-container">
      <h2 className="title">Veg Dishes</h2>

      <ul className="veg-grid">
        {vegList}
      </ul>

      <div className="pagination-container">
        {paginationButtons}
      </div>
    </div>
  );
}

export default Veg;