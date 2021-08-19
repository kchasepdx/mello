import { useEffect, useState } from "react";
import { login } from "../actions/UserActions";
import { useDispatch, useSelector } from "react-redux";
// import jwt from "jsonwebtoken";

function LoginScreen(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, userInfo, error } = userLogin;
  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  useEffect(() => {
    if (userInfo) {
      if (userInfo.name) {
        props.history.push(redirect);
      }
    }
  }, [userInfo]);

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(login(email, password));
  }
  return (
    <div className="container-fluid">
      <h1 className="page-header">Log In</h1>
      <p>
        {loading && <p>loading...</p>}
        {error && <p>error...</p>}
      </p>
      <form method="post" onSubmit={(event) => handleSubmit(event)}>
        <div className="mb-3"></div>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            Email Address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <a href="/register">Need to Register?</a>
    </div>
  );
}

export default LoginScreen;
