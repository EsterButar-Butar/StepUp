import { FcGoogle } from "react-icons/fc";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { auth } from "../../firebase";

import { useNavigate } from "react-router-dom";

export default function GoogleButton() {
  const navigate = useNavigate();

  const handleGoogleSignup = async () => {
    try {
      const provider = new GoogleAuthProvider();

      const result = await signInWithPopup(auth, provider);

      console.log(result.user);

      navigate("/assessment");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      type="button"
      className="su-btn-google"
      onClick={handleGoogleSignup}
    >
      <FcGoogle className="su-google-icon" />
      Sign up with Google
    </button>
  );
}
