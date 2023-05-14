import React, { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const sumbitLogin = (e) => {
    e.preventDefault();
  };
  return (
    <div className="grid justify-items-center mt-2">
      <img
        style={{
          width: "500px",
          height: "300px",
        }}
        className="border rounded"
        src="/assets/images/logo-dentist.jpeg"
        alt="dentist-logo"
      />
      <form onSubmit={sumbitLogin} className="w-1/2 mt-3" style={{
          width: "500px",
        }}>
        <div className="mb-2">
          <label
            htmlFor="username"
            className="font-bold text-gray-700 block"
          >
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="shadow rounded border focus:outline-none px-3 py-2 w-full"
            placeholder="username"
          />
        </div>
        <div className="mb-2 ">
          <label
            htmlFor="password"
            className="font-bold text-gray-700 block"
          >
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow rounded border focus:outline-none px-3 py-2 w-full"
            placeholder="password"
          />
        </div>
        <button className="mb-2 font-bold btn-main w-full shadow rounded focus:outline-none px-3 py-2">
          Connect
        </button>
      </form>
    </div>
  );
};

export default Login;
