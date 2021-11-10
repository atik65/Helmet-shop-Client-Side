import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import firebaseInit from "../firebase/firebase.init";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { useHistory } from "react-router";

firebaseInit();
const auth = getAuth();

const useFirebase = () => {
  const [user, setUser] = useState();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("true");

  const history = useHistory();

  // google sign in function
  const googleSignIn = (location) => {
    const redirectURI = location.state.from || "/";
    const googleProvider = new GoogleAuthProvider();
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        setError("");
        Swal.fire({
          icon: "success",
          title: "You sign in with Google successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        history.replace(redirectURI);
      })
      .catch((error) => {
        setError(error.message);
        Swal.fire({
          icon: "error",
          title: error.message,
        });
      });
  };

  // create user wtih email and password
  const createUser = (email, pass, location) => {
    const redirectURI = location.state.from || "/";
    createUserWithEmailAndPassword(auth, email, pass)
      .then((result) => {
        setError("");
        Swal.fire({
          icon: "success",
          title: "You Registered and log in successfully!",
          showConfirmButton: false,
          timer: 1500,
        });

        history.replace(redirectURI);
      })
      .catch((error) => {
        setError(error.message);
        Swal.fire({
          icon: "error",
          title: error.message,
        });
      });
  };

  // sign in with email and pass
  const signIn = (email, pass, location) => {
    const redirectURI = location.state.from || "/";
    signInWithEmailAndPassword(auth, email, pass)
      .then((result) => {
        setError("");
        Swal.fire({
          icon: "success",
          title: "You Registered and log in successfully!",
          showConfirmButton: false,
          timer: 1500,
        });

        history.replace(redirectURI);
      })
      .catch((error) => {
        setError(error.message);
        Swal.fire({
          icon: "error",
          title: error.message,
        });
      });
  };

  // sign out function
  const logOut = () => {
    signOut(auth)
      .then((result) => {
        setUser({});

        Swal.fire({
          icon: "success",
          title: "You sign out successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        Swal.fire("Opps! Something went Wrong", "Sign Out failed!", "error");
      });
  };

  useEffect(() => {
    setLoading(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setError("");
      } else {
        // Swal.fire("Please sign in first");
      }
      setLoading(false);
    });
  }, []);

  return {
    signIn,
    logOut,
    createUser,
    googleSignIn,
    error,
    user,
    verifyEmail,
    loading,
  };
};

export default useFirebase;
