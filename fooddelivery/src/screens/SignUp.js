import React, { useState } from "react";
import { Link } from "react-router-dom";

function SignUp() {
  const [creds, setCreds] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    let response = fetch("https://localhost:9000/api//createUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  };

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit()}>
          <div class="mb-3">
            <label for="name" class="form-label">
              Name
            </label>
            <input
              type="text"
              class="form-control"
              name="name"
              value={creds.name}
            />
          </div>
          <div class="mb-3">
            <label class="form-label">Email address</label>
            <input
              type="email"
              class="form-control"
              name="email"
              value={creds.email}
            />
          </div>
          <div class="mb-3">
            <label class="form-label">Password</label>
            <input
              type="password"
              class="form-control"
              name="password"
              value={creds.password}
            />
          </div>
          <div class="mb-3">
            <label class="form-label">Geo Location</label>
            <input
              type="geolocation"
              class="form-control"
              name="geolocation"
              value={creds.geolocation}
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
