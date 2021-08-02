import data from "../data";

function StoreFront() {
  const products = data.products;

  return (
    <div className="store-front">
      <h1 className="page-header">Beanies & Hoodies</h1>
      <div className="product-grid">
        {products.map((x) => (
          <div key={x._id} class="col-sm-6 card">
            <img class="card-img-top" src={x.image} alt="item" />
            <div class="card-body">
              <h5 class="card-title">
                <a href={"/product" + x._id}>{x.name}</a>
              </h5>
              <p class="card-text">${x.price}</p>
              <a href={"/product" + x._id} class="btn btn-primary item-btn">
                Take a look.
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StoreFront;
