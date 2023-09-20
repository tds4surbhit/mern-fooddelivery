import React, { useState } from "react";
import { Link } from "react-router-dom";

function SignUp() {
  const [creds, setCreds] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    let payload = {
      name: creds.name,
      email: creds.email,
      password: creds.password,
      location: creds.geolocation,
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
    fetch("http://localhost:9000/api/createUser", requestOptions)
      .then((response) => {
        if (!response.ok) {
          alert("Network response was not ok");
        }
        return response.text();
      })
      .then((result) => {
        responseText = result;
        console.log("Response", responseText);
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
            <label htmlFor="name" class="form-label">
              Name
            </label>
            <input
              type="text"
              class="form-control"
              name="name"
              value={creds.name}
              onChange={onChange}
            />
          </div>
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
          <div class="mb-3">
            <label class="form-label">Geo Location</label>
            <input
              type="text"
              class="form-control"
              name="geolocation"
              value={creds.geolocation}
              onChange={onChange}
            />
          </div>
          <button type="submit" class="btn btn-primary">
            Submit
          </button>
          <Link to="/login" className="m-3 btn btn-danger">
            Existing User
          </Link>
        </form>
      </div>
    </>
  );
}

export default SignUp;
