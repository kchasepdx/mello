import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import data from "../data";

function ProductDetail(props) {
  const id = props.match.params.id;
  const currentItem = data.products.filter((x) => x._id === id);
  const [qty, setQty] = useState("1");

  function addToCart() {
    props.history.push("/cart/" + id + "?qty=" + qty);
  }

  return (
    <div className="store-front">
      <a href="/">
        {" "}
        <i class="fas fa-long-arrow-alt-left"></i>Back to results...
      </a>
      <h1 className="page-header">{currentItem[0].name}</h1>
      <img class="card-img-top" src={currentItem[0].image} alt="item" />
      <div class="card-body">
        <h5 class="card-title">{currentItem[0].brand}</h5>
        <p class="card-text detail-price">${currentItem[0].price}</p>
        <form className="form-group" onSubmit={addToCart}>
          <label>Quantity:</label>
          <select onChange={(e) => setQty(e.target.value)} value={qty}>
            {[...Array(currentItem[0].countInStock).keys()].map((x) => (
              <option type="number" className="detail-qty" key={x}>
                {x}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="btn btn-primary item-btn detail-submit"
          >
            Add to Cart
          </button>
        </form>
      </div>
      )
    </div>
  );
}

export default ProductDetail;
