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
    let payload = {
      name: creds.name,
      email: creds.email,
      password: creds.password,
      location: creds.geolocation,
    };

    let response = await fetch("https://localhost:9000/api//createUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const response_in_json = await response.json();
    console.log(response_in_json);
    if (!response_in_json.success) {
      alert("Enter valid creds");
    }
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
