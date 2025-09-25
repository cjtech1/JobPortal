import React, {
  useContext,
  useEffect,
  useState,
  useRef,
  useCallback,
} from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const RecruiterLogin = () => {
  // mode: "Login" | "Sign Up"
  const [mode, setMode] = useState("Login");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const { setRecruiterLogin } = useContext(AppContext);

  const [textSubmitted, setTextSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const formRef = useRef(null);

  // Prevent background scroll while modal is mounted
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  // Create a stable object URL for preview and revoke it on change/unmount
  useEffect(() => {
    if (!imageFile) {
      setImagePreview(null);
      return undefined;
    }
    let url;
    try {
      url = URL.createObjectURL(imageFile);
      setImagePreview(url);
    } catch (error) {
      // If creating an object URL fails for any reason, avoid crashing the app
      // and just skip the preview.
      console.error("Failed to create image preview URL", error);
      setImagePreview(null);
      return undefined;
    }
    return () => {
      try {
        if (url) URL.revokeObjectURL(url);
      } catch {
        // ignore revoke errors
      }
    };
  }, [imageFile]);

  const reset = useCallback(() => {
    setName("");
    setPassword("");
    setEmail("");
    setImageFile(null);
    setTextSubmitted(false);
    setErrors({});
  }, []);

  const handleClose = useCallback(() => {
    reset();
    try {
      if (typeof setRecruiterLogin === "function") setRecruiterLogin(false);
      else {
        console.warn("setRecruiterLogin is not a function", setRecruiterLogin);
      }
    } catch (error) {
      console.error("Error calling setRecruiterLogin", error);
    }
  }, [reset, setRecruiterLogin]);

  // Close on Escape (placed after handleClose to avoid TDZ)
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        try {
          handleClose();
        } catch (error) {
          // Don't allow errors inside the handler to bubble and crash the app
          console.error("Error closing recruiter modal via Escape", error);
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleClose]);

  const validateLogin = () => {
    const err = {};
    if (!email) err.email = "Email is required";
    // simple email check
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      err.email = "Invalid email";
    if (!password) err.password = "Password is required";
    return err;
  };

  const validateSignup = () => {
    const err = {};
    if (!name) err.name = "Name is required";
    if (!email) err.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      err.email = "Invalid email";
    if (!password) err.password = "Password is required";
    return err;
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setErrors({});

    if (mode === "Sign Up" && !textSubmitted) {
      // first step of signup (show upload area)
      setTextSubmitted(true);
      return;
    }

    if (mode === "Login") {
      const err = validateLogin();
      if (Object.keys(err).length) {
        setErrors(err);
        return;
      }
      // TODO: call login API here. For now simulate success
      console.log("Logging in with", { email, password });
      handleClose();
      return;
    }

    // mode === "Sign Up" and textSubmitted === true -> finalize signup
    const err = validateSignup();
    if (Object.keys(err).length) {
      setErrors(err);
      return;
    }
    // TODO: call signup API here with name,email,password,imageFile
    console.log("Creating account", { name, email, password, imageFile });
    handleClose();
  };

  const onOverlayClick = () => {
    handleClose();
  };

  return (
    <div
      className="absolute top-0 bottom-0 left-0 right-0 z-10 bg-transparent backdrop-blur-sm flex items-center justify-center"
      onClick={onOverlayClick}
      aria-modal="true"
      role="dialog"
    >
      <form
        ref={formRef}
        onSubmit={onSubmitHandler}
        // stop overlay clicks when interacting with the form
        onClick={(e) => e.stopPropagation()}
        className="flex items-center justify-between gap-6 bg-white flex-col px-20 py-10 rounded-md border border-blue-400 shadow-2xs transition-all duration-300 ease-in-out hover:scale-105"
      >
        <div className="flex flex-col text-center">
          <h2 className="text-2xl font-semibold">Recruiter {mode}</h2>
          <p className="text-gray-500">
            {mode === "Login"
              ? "Welcome back! Please log in to continue"
              : "Create your recruiter account"}
          </p>
        </div>

        {mode === "Sign Up" && textSubmitted ? (
          <div className="flex flex-col gap-4 w-full">
            <div className="flex  gap-2 justify-center overflow-hidden">
              <label
                htmlFor="image"
                className="flex justify-center items-center flex-col gap-2 cursor-pointer"
              >
                <img
                  src={imagePreview || assets.upload_area}
                  alt="company logo preview"
                  className="w-16 h-16 object-cover rounded-full"
                />
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  className="sr-only"
                  onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
                />
                <p className="text-sm">Upload Company Logo (optional)</p>
              </label>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4 w-full">
            {mode === "Sign Up" && (
              <div className="flex  gap-2 border border-gray-300 rounded-full px-2 overflow-hidden items-center">
                <img src={assets.person_icon} alt="name icon" />
                <input
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Name"
                  className="px-2 py-4 outline-none w-full"
                  aria-label="Name"
                />
              </div>
            )}

            <div className="flex  gap-2 border border-gray-300 rounded-full px-2 overflow-hidden items-center">
              <img src={assets.email_icon} alt="email icon" />
              <input
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email"
                className="px-2 py-4 outline-none w-full"
                aria-label="Email"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm text-left w-full">
                {errors.email}
              </p>
            )}

            <div className="flex gap-2 border border-gray-300 rounded-full px-2 overflow-hidden items-center">
              <img src={assets.lock_icon} alt="password icon" />
              <input
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
                className="px-2 py-4 outline-none w-full"
                aria-label="Password"
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm text-left w-full">
                {errors.password}
              </p>
            )}
          </div>
        )}

        {mode === "Login" && (
          <div className=" w-full text-left">
            <button type="button" className="text-sm text-blue-500">
              Forgot Password?
            </button>
          </div>
        )}

        {mode === "Sign Up" && textSubmitted ? (
          <div className="flex justify-center w-full gap-2 border border-gray-300 rounded-full px-2 py-4 bg-blue-400 text-white cursor-pointer">
            <button
              className="cursor-pointer w-full h-full overflow-hidden"
              type="submit"
            >
              Create Account
            </button>
          </div>
        ) : (
          <div className="flex justify-center w-full gap-2 border border-gray-300 rounded-full px-2 py-4 bg-blue-400 text-white cursor-pointer">
            <button
              className="cursor-pointer w-full h-full overflow-hidden"
              type="submit"
            >
              {mode === "Sign Up" ? "Continue" : "Login"}
            </button>
          </div>
        )}

        <div>
          {!textSubmitted && (
            <p className="text-sm">
              {mode === "Login"
                ? "Don't have an account"
                : "Already have an account"}
              ? &nbsp;
              <button
                type="button"
                className="text-blue-500"
                onClick={() => {
                  setMode((prev) => (prev === "Sign Up" ? "Login" : "Sign Up"));
                  setTextSubmitted(false);
                  setErrors({});
                }}
              >
                {mode === "Login" ? "Sign Up" : "Login"}
              </button>
            </p>
          )}
        </div>

        <div className="absolute right-5 top-5 cursor-pointer">
          <button type="button" aria-label="Close" onClick={handleClose}>
            <img src={assets.cross_icon} alt="close" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default RecruiterLogin;
