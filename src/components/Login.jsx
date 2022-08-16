import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
    const [credentials, setCredentials] = useState({email: '', password: ''});
    let navigate = useNavigate();
    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value})
      };

  const onSubmit = async (e) => {
    e.preventDefault();
    const loginPayload = {
        email: credentials.email,
        password: credentials.password
      }; 
    const res = await fetch('http://localhost:5000/api/auth/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(loginPayload),
    });
    const json = await res.json();
    if (json.success === true) {
      localStorage.setItem('token', json.authToken);
      props.showAlert("User loggedin Successfully", "success");
      navigate("/");
    } else {
      props.showAlert("Invailid credential", "danger");
    }
  };
  return (
    <div className="container mt-3">
      <h2 className="my-2"> Login to continoue iNotebook</h2>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            name="email"
            id="email"
            aria-describedby="email"
            onChange={onChange}
            value={credentials.email}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="password"
            onChange={onChange}
            value={credentials.password}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
