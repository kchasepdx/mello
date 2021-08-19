import { useEffect, useState } from "react";
import { register } from "../actions/UserActions";
import { useDispatch, useSelector } from "react-redux";

function RegisterScreen(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, userInfo, error } = userRegister;
  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
    return () => {
      //
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(register(name, email, password));
  }
  return (
    <div className="container-fluid">
      <h1 className="page-header">Register</h1>
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
            type="name"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            Email address
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
    </div>
  );
}

export default RegisterScreen;
