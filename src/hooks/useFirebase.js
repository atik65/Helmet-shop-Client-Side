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
  updateProfile,
} from "firebase/auth";

firebaseInit();
const auth = getAuth();

const useFirebase = () => {
  const [user, setUser] = useState({
    email: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("true");
  const [admin, setAdmin] = useState(false);
  const [adminLoading, setAdminLoading] = useState(false);

  // const history = useHistory();

  // google sign in function
  const googleSignIn = (location, history) => {
    const redirectURI = location?.state?.from || "/";
    const googleProvider = new GoogleAuthProvider();
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        setUserToDB(result.user.email, result.user.displayName, "PUT");
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
  const createUser = (email, pass, location, history, name) => {
    const redirectURI = location?.state?.from || "/";

    createUserWithEmailAndPassword(auth, email, pass)
      .then((result) => {
        updateProfile(auth.currentUser, {
          displayName: name,
        })
          .then(() => {})
          .catch(() => {});

        setUserToDB(email, name, "POST");
        setError("");
        Swal.fire({
          icon: "success",
          title: "You Registered and log in successfully!",
          showConfirmButton: false,
          timer: 1500,
        });

        history.push(redirectURI);
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
  const signIn = (email, pass, location, history) => {
    const redirectURI = location?.state?.from || "/";
    signInWithEmailAndPassword(auth, email, pass)
      .then((result) => {
        setError("");
        Swal.fire({
          icon: "success",
          title: "You sign in successfully!",
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
        setError("");
        setUser(user);
      } else {
        // Swal.fire("Please sign in first");
      }
      setLoading(false);
    });
  }, []);

  // set new user to database
  const setUserToDB = (email, displayName, method) => {
    const newUser = { email, displayName };

    try {
      fetch(`https://helmetshop.onrender.com/users`, {
        method: method,
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    fetch(`https://helmetshop.onrender.com/${user?.email}/users`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.role === "admin") {
          setAdmin(true);
          setAdminLoading(false);
        } else {
          setAdmin(false);
          setAdminLoading(true);
        }
      })
      .catch((error) => {
        console.log(error.message);
        // setLoading(false);
        setAdminLoading(false);
      });
  }, [user.email]);

  return {
    signIn,
    logOut,
    createUser,
    googleSignIn,
    error,
    user,
    adminLoading,
    loading,
    admin,
  };
};

export default useFirebase;
