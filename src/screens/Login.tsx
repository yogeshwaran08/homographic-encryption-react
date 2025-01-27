import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../styles/Auth.scss";
import { login } from "../utils/auth";
import useUserStore from "../store/userStore";
import { useEffect } from "react";

const initialValues = {
  username: "",
  password: "",
};

const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const { user, setUser } = useUserStore();
  const navigate = useNavigate();

  const handleSubmit = async (values: any) => {
    const res = await login(values.username, values.password);
    if (res.type === "sucess") {
      setUser({
        username: res.data?.username,
        id: res.data?.id,
        access_token: res.data?.access_token,
      });
      navigate("/home");
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  const handleNavigate = () => {
    navigate("/register");
  };

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user]);

  return (
    <div className="auth-screen">
      <div className="auth-area">
        <h3>Login</h3>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
            />
            {formik.touched.username && formik.errors.username && (
              <div className="error">{formik.errors.username}</div>
            )}
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="error">{formik.errors.password}</div>
            )}
          </div>
          <button type="submit">Login</button>
        </form>
        <p>
          New to our website? <span onClick={handleNavigate}>Register</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
