import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProducts } from "../actions/ProductActions";

function StoreFront() {
  const dispatch = useDispatch();
  const listProducts = useSelector((state) => state.listProducts);
  const setCategory = useSelector((state) => state.setCategory);

  const { loading, products, error } = listProducts;
  const { loadingCategory, categoryList } = setCategory;

  console.log(categoryList);

  var currentCategory = "";
  if (categoryList === undefined) {
    currentCategory = undefined;
  } else if (categoryList.length === 0) {
    currentCategory = undefined;
  } else {
    currentCategory = categoryList[0].category;
  }

  if (error) console.log(error);

  useEffect(() => {
    dispatch(getProducts());

    return () => {
      //
    };
  }, []);

  return (
    <div className="store-front">
      <h1 className="page-header">
        {" "}
        {currentCategory ? currentCategory + "s" : "everything"}
      </h1>
      {loadingCategory && <i className="fas fa-spinner"></i>}
      {categoryList && categoryList.length > 0 ? (
        <div className="product-grid">
          {categoryList.map((x) => (
            <div key={x._id} className="col-sm-6 card">
              <img className="card-img-top" src={x.image} alt="item" />
              <div className="card-body">
                <h5 className="card-title">
                  <Link to={"/product/" + x._id}>{x.name}</Link>
                </h5>
                <p className="card-text">${x.price}</p>
                <Link
                  to={"/product/" + x._id}
                  className="btn btn-primary item-btn"
                >
                  Take a look.
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : loading ? (
        <p>
          <i className="fas fa-spinner"></i>
        </p>
      ) : (
        <div className="product-grid">
          {products &&
            products.map((x) => (
              <div key={x._id} className="col-sm-6 card">
                <img className="card-img-top" src={x.image} alt="item" />
                <div className="card-body">
                  <h5 className="card-title">
                    <a href={"/product" + x._id}>{x.name}</a>
                  </h5>
                  <p className="card-text">${x.price}</p>
                  <Link
                    to={"/product/" + x._id}
                    className="btn btn-primary item-btn"
                  >
                    Take a look.
                  </Link>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default StoreFront;
