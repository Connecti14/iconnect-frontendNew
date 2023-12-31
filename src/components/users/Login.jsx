import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import baseUrl from "../../config";



const Login = ({ getFromLoginData }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };
    const data = await axios.post(`${baseUrl}/sigin`, user);
    localStorage.setItem("user", JSON.stringify(data.data));
    setTimeout(() => {
      if (localStorage.getItem("user")) {
        let localdata = localStorage.getItem("user");
        let parsedata = JSON.parse(localdata);

        getFromLoginData(parsedata);
      }
    }, 1000);
    navigate("/");
  };

  return (
    <>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h2 className="mt-4 mb-4 text-center">Login</h2>
                <form onSubmit={loginUser}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email address
                    </label>
                    <input
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      className="form-control"
                      id="email"
                      autoComplete="email"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      className="form-control"
                      id="password"
                      autoComplete="current-password"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <button
                      type="submit"
                      className="btn btn-primary w-100"
                    >
                      Sign in
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
