import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Login() {
  const [creds, setCreds] = useState({
    email: "",
    password: "",
  });

  let navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    let payload = {
      email: creds.email,
      password: creds.password,
    };

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(payload);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    let responseText;
    fetch("http://localhost:9000/api/loginUser", requestOptions)
      .then((response) => {
        if (!response.ok) {
          alert("Network response was not ok");
        }
        return response.text();
      })
      .then((result) => {
        responseText = result;
        console.log("Response", responseText);
        if (responseText) {
          console.log("I am here");
          navigate("/");
        }
      })
      .catch((error) => console.log("Error", error));
  };

  const onChange = (e) => {
    setCreds({ ...creds, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div class="mb-3">
            <label class="form-label">Email address</label>
            <input
              type="email"
              class="form-control"
              name="email"
              value={creds.email}
              onChange={onChange}
            />
          </div>
          <div class="mb-3">
            <label class="form-label">Password</label>
            <input
              type="password"
              class="form-control"
              name="password"
              value={creds.password}
              onChange={onChange}
            />
          </div>
          <button type="submit" class="btn btn-primary">
            Submit
          </button>
          <Link to="/signup" className="m-3 btn btn-danger">
            I'm a new user
          </Link>
        </form>
      </div>
    </>
  );
}

export default Login;
