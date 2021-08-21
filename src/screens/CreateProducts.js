import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteProduct,
  getProductDetail,
  getProducts,
  saveProduct,
} from "../actions/ProductActions";

function EditProductsScreen(props) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [nameEdit, setNameEdit] = useState("");
  const [categoryEdit, setCategoryEdit] = useState("");
  const [imageEdit, setImageEdit] = useState("");
  const [priceEdit, setPriceEdit] = useState("");
  const [brandEdit, setBrandEdit] = useState("");
  const [idEdit, setIdEdit] = useState("");
  const [countInStockEdit, setCountInStockEdit] = useState("");
  const productDetail = useSelector((state) => state.productDetail);
  const { product } = productDetail;
  const dispatch = useDispatch();
  const listProducts = useSelector((state) => state.listProducts);
  const editProducts = useSelector((state) => state.editProducts);
  const deleteProductFromDB = useSelector((state) => state.deleteProductFromDB);
  const { success: deleteSuccess } = deleteProductFromDB;
  const { success: saveSuccess } = editProducts;
  const { loading, products, error } = listProducts;
  const [view, setView] = useState("list");

  useEffect(() => {
    dispatch(getProducts());
    setName("");
    setCategory("");
    setImage("");
    setPrice("");
    setBrand("");
    setCountInStock("");
  }, [saveSuccess, dispatch]);

  useEffect(() => {
    dispatch(getProducts());
  }, [deleteSuccess, dispatch]);

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(
      saveProduct({
        name: name,
        category: category,
        image: image,
        price: price,
        brand: brand,
        countInStock: countInStock,
      })
    );
    setView("list");
  }

  function changeView(event) {
    setView(event.target.value);
  }

  async function handleEdit(event) {
    dispatch(getProductDetail(event.target.id));
    setView("edit");
  }

  function handleDelete(event) {
    dispatch(deleteProduct(event.target.id));
    props.history.push("/editproducts");
  }

  useEffect(() => {
    if (product) {
      setNameEdit(product.name);
      setBrandEdit(product.brand);
      setCategoryEdit(product.category);
      setImageEdit(product.image);
      setPriceEdit(product.price);
      setCountInStockEdit(product.countInStock);
      setIdEdit(product._id);
    }
  }, [product]);

  function handleSaveChanges() {
    dispatch(
      saveProduct({
        name: nameEdit,
        brand: brandEdit,
        category: categoryEdit,
        image: imageEdit,
        price: priceEdit,
        countInStock: countInStockEdit,
        _id: idEdit,
      })
    );
    setView("list");
  }

  return (
    <div className="container-fluid">
      {view === "list" ? (
        <div>
          <table className="table product-list">
            <thead>
              <tr>
                <th>ID</th>
                <th>Product Name</th>
                <th>Category</th>
                <th>Image</th>
                <th>Price</th>
                <th>Brand</th>
                <th>Count In Stock</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products &&
                products.map((x) => (
                  <tr key={x._id}>
                    <td>{x._id}</td>
                    <td>
                      <Link to={"/product/" + x._id}>{x.name}</Link>
                    </td>
                    <td>{x.category}</td>
                    <td>
                      <img alt="product" id="table-img" src={x.image}></img>
                    </td>
                    <td>{x.price}</td>
                    <td>{x.brand}</td>
                    <td>{x.countInStock}</td>
                    <td id="btn-col">
                      <button
                        onClick={handleEdit}
                        value={x.name}
                        className="btn admin-btn edit-btn"
                        id={x._id}
                      >
                        Edit
                      </button>
                      <button
                        onClick={handleDelete}
                        id={x._id}
                        className="btn admin-btn edit-btn"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <button
            value="add-product"
            className="btn admin-btn"
            onClick={changeView}
          >
            <i className="fas fa-plus"></i> Product
          </button>
        </div>
      ) : view === "add-product" ? (
        <div>
          <h1 Name="page-header">Add Product</h1>
          <p>
            {loading && <div>loading...</div>}
            {error && <div>error...</div>}
          </p>
          <form method="post" onSubmit={(event) => handleSubmit(event)}>
            <div className="mb-3">
              <label for="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label for="exampleInputEmail1" className="form-label">
                Category
              </label>
              <input
                type="text"
                className="form-control"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label for="image" className="form-label">
                Image
              </label>
              <input
                type="text"
                className="form-control"
                id="image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label for="price" className="form-label">
                Price
              </label>
              <input
                type="number"
                className="form-control"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label for="brand" className="form-label">
                Brand
              </label>
              <input
                type="text"
                className="form-control"
                id="brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label for="countInStock" className="form-label">
                Count In Stock
              </label>
              <input
                type="text"
                className="form-control"
                id="countInStock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              />
            </div>
            <button type="submit" className="btn admin-btn">
              Submit
            </button>
            <button value="list" className="btn admin-btn" onClick={changeView}>
              <i className="far fa-window-close"></i>
            </button>
          </form>
        </div>
      ) : (
        <div>
          <form method="post" onSubmit={(event) => handleSaveChanges(event)}>
            <div className="mb-3">
              <label for="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder={nameEdit}
                onChange={(e) => setNameEdit(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label for="exampleInputEmail1" className="form-label">
                Category
              </label>
              <input
                type="text"
                className="form-control"
                id="category"
                placeholder={categoryEdit}
                onChange={(e) => setCategoryEdit(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label for="image" className="form-label">
                Image
              </label>
              <input
                type="text"
                className="form-control"
                id="image"
                placeholder={imageEdit}
                onChange={(e) => setImageEdit(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label for="price" className="form-label">
                Price
              </label>
              <input
                type="number"
                className="form-control"
                id="price"
                placeholder={priceEdit}
                onChange={(e) => setPriceEdit(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label for="brand" className="form-label">
                Brand
              </label>
              <input
                type="text"
                className="form-control"
                id="brand"
                placeholder={brandEdit}
                onChange={(e) => setBrandEdit(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label for="countInStock" className="form-label">
                Count In Stock
              </label>
              <input
                type="text"
                className="form-control"
                id="countInStock"
                placeholder={countInStockEdit}
                onChange={(e) => setCountInStockEdit(e.target.value)}
              />
            </div>

            <button className="btn admin-btn" type="submit">
              Save Changes
            </button>

            <button
              value="list"
              type="button"
              className="btn admin-btn"
              onClick={changeView}
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default EditProductsScreen;
