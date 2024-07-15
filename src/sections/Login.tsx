import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../redux/apiCalls";
import { useDispatch } from "react-redux";
import OAuth from "../components/0Auth";

const Login = () => {
  const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const naviagate = useNavigate()


    const handleClick = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            await login(dispatch, { email, password });
            setLoading(false);
            naviagate('/')
       
      window.location.reload();
        } catch (error) {
            setLoading(false);
        }
    };

  return (
    <section className="flex min-h-screen items-center justify-center py-10 bg-white px-2">
      <div className="bg-white w-full text-black lg:w-4/12 rounded-xl md:mx-0 py-10 px-6 lg:px-16 xl:px-12 flex items-center justify-center">
        <div className="w-full h-100">
          <h1 className="text-xl md:text-xl font-medium leading-tight mt-5">Login</h1>
          <form className="mt-6" onSubmit={handleClick}>
            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                required
              />
            </div>
            <div className="mt-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                required
              />
            </div>
            <div className="text-right mt-2">
              <Link to="/forgot-pass" className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700">
                Forget password?
              </Link>
            </div>
            <button
              type="submit"
              className="w-full block bg-slate-900 hover:scale-105 transition-all focus:bg-slate-700 text-white font-semibold rounded-lg px-4 py-3 mt-6"
            >
              {loading ? <span className="loading loading-spinner loading-sm"></span> : "Login"}
            </button>
          </form>
          <div className="flex items-center justify-center gap-3">
            <hr className="my-6 border-gray-300 w-full" />
            <h1 className="text-gray-500">Or</h1>
            <hr className="my-6 border-gray-300 w-full" />
          </div>
          <OAuth/>
          <p className="mt-8">
            Need an account?
            <Link to="/register" className="text-blue-600 hover:text-blue-700 font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
