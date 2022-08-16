import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  let navigate = useNavigate();
  const [signup, setSignup] = useState({name: '', email: '', password: '', confirmPassword: ''});
  const onChange = (e) => {
    setSignup({...signup, [e.target.name]: e.target.value})
    };
    const onSubmit = async (e) => {
      e.preventDefault();
      const signupPayload = {
          name: signup.name,
          email: signup.email,
          password: signup.password
        }; 
      const res = await fetch('http://localhost:5000/api/auth/createuser', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(signupPayload),
      });
      const json = await res.json();
      console.log(json);
      if (json.success === true) {
        localStorage.setItem('auth', json.authToken);
        props.showAlert("User registered Successfully", "success");
        navigate("/");
      } else {
        props.showAlert("Invailid credential", "danger");
        navigate("/signup");
      }
    };
  return (
    <div className="container mt-3">
      <h2 className="my-2"> Create an account to use iNotebook</h2>
      <form onSubmit={onSubmit}>
      <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="name"
            className="form-control"
            id="name"
            name="name"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            name="email"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            name="confirmPassword"
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
