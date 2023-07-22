import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginApi } from "../redux/login/loginApiCalls";
import { useSelector } from "react-redux";
import { State } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { hideMsg } from "../functions/functions";

const Login:React.FC = () => {
  const { userData } = useSelector((state: State) => state.login)  
  const navigate = useNavigate()
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<string[]>([])

  const dispatch: any = useDispatch();

  const submitLogin = async (e: any) => {
    e.preventDefault();
    try {
      const response: any = await dispatch(loginApi({username, password}));
      if(response === true) {
        setErrors([])
      } else {
        setErrors(response)
      }  
    } catch { }

  };

  useEffect(() => {
    if(userData) {
      setErrors([])
      navigate("/", { replace: true });
    }
  }, [navigate, userData])

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
      <form onSubmit={submitLogin} className="w-1/2 mt-3" style={{
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
            id="username"
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
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow rounded border focus:outline-none px-3 py-2 w-full"
            placeholder="password"
          />
        </div>
        <button className="mb-2 font-bold btn-main w-full shadow rounded focus:outline-none px-3 py-2">
          Connect
        </button>
        {errors?.length > 0 && errors?.map((err: string, index: number) => (
          <div key={index} className="bg-red-400 text-white p-2 rounded" onClick={(e) => hideMsg(e, errors, setErrors)}>{err}</div>
        ))}
      </form>
    </div>
  );
};

export default Login;
