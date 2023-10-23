import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginApi } from "../redux/login/loginApiCalls";
import { useSelector } from "react-redux";
import { State } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ShowErrorMsg from "../HtmlComponents/ShowErrorMsg";

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

  const { t } = useTranslation()

  return (
    <section className="grid grid-cols-3 justify-items-center mt-2">
      <div className="col-start-1 col-end-4">
        <img
          style={{
            width: "100%",
            height: "40%",
          }}
          className="border rounded"
          src="/assets/images/ASOFT.png"
          // src="/assets/images/logo-dentist.jpeg"
          alt="dentist-logo"
        />
        <form onSubmit={submitLogin} className="mt-3">
          <div className="mb-2">
            <label
              htmlFor="username"
              className="font-bold text-gray-700 block"
            >
              {t("Username")}
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="shadow rounded border focus:outline-none px-3 py-2 w-full"
              placeholder={t("Username")}
            />
          </div>
          <div className="mb-2 ">
            <label
              htmlFor="password"
              className="font-bold text-gray-700 block"
            >
              {t("Password")}
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow rounded border focus:outline-none px-3 py-2 w-full"
              placeholder={t("Password")}
            />
          </div>
          <button className="mb-2 font-bold btn-main w-full shadow rounded focus:outline-none px-3 py-2">
            {t("Connecter")}
          </button>
          <ShowErrorMsg errors={errors} setErrors={setErrors} />
        </form>
      </div>
    </section>
  );
};

export default Login;
