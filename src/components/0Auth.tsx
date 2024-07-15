import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase.tsx';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/userRedux';

const OAuth=()=> {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      const res = await fetch('https://fail-success-backend.vercel.app/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      
      dispatch(loginSuccess(data));

      navigate("/");
     
    } catch (error) {
      console.log('could not sign in with google', error);
    }
  };
  return (
  <>
    <button onClick={handleGoogleClick} className="px-4 py-2 border flex items-center justify-center gap-2 border-slate-200 :border-slate-700 rounded-lg text-slate-700 :text-slate-200 hover:border-slate-400 :hover:border-slate-500 hover:text-slate-900 :hover:text-slate-300 hover:shadow transition duration-150 w-full">
    <img
      className="w-6 h-6"
      src="https://www.svgrepo.com/show/475656/google-color.svg"
      loading="lazy"
      alt="google logo"
    />
<span>Continue with Google</span>
  </button>


</>
  );
}


export default OAuth
