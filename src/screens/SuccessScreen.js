import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import { updateInventory } from "../actions/ProductActions";

function SuccessScreen() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const dispatch = useDispatch();
  const [render, setRender] = useState(false);

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  const query = useQuery();
  const sessionId = query.get("session_id");

  console.log("sessionID = " + sessionId);
  console.log(query);

  useEffect(() => {
    if (sessionId) {
      dispatch(updateInventory(cartItems));
      setRender(true);
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {render ? (
        <div className="home-screen container-fluid">
          <h1 id="thank-you">Thank you for your order!</h1>
          <p id="order-num">Your Order Number is : {sessionId}</p>
          <Link id="return-link" to="/">
            <i className="fas fa-chevron-circle-left"></i> Return to Store
          </Link>
        </div>
      ) : (
        <div className="home-screen container-fluid">
          <h1 id="restricted">
            <i className="fas fa-key"></i>Restricted Access
            <i className="fas fa-key"></i>
          </h1>
          <Link id="restricted-return-link" to="/">
            <i className="fas fa-chevron-circle-left"></i> Return to Store
          </Link>
        </div>
      )}{" "}
    </div>
  );
}

export default SuccessScreen;
