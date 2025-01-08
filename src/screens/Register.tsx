import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../styles/Auth.scss";
import { register } from "../utils/auth";
import useUserStore from "../store/userStore";
import { useEffect } from "react";

const validationSchema = Yup.object({
  username: Yup.string().required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords must match")
    .required("Confirm password is required"),
});

const initialValues = {
  username: "",
  password: "",
  confirmPassword: "",
};

const Register = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUserStore();

  const handleNavigate = () => {
    navigate("/login");
  };

  const handleSubmit = async (values: any) => {
    const res = await register(values.username, values.password);
    if (res.type === "sucess") {
      setUser({
        username: res.data?.username,
        token: res.data?.token,
        id: res.data?.id,
      });
      navigate("/home");
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user]);

  return (
    <div className="auth-screen">
      <div className="auth-area">
        <h3>Register</h3>
        <form onSubmit={formik.handleSubmit}>
          <div className="form-field">
            <input
              type="text"
              name="username"
              placeholder="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.username && formik.errors.username && (
              <div className="error">{formik.errors.username}</div>
            )}
          </div>

          <div className="form-field">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="error">{formik.errors.password}</div>
            )}
          </div>

          <div className="form-field">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <div className="error">{formik.errors.confirmPassword}</div>
              )}
          </div>

          <button type="submit">Register</button>
        </form>

        <p>
          Already have an account? <span onClick={handleNavigate}>Login</span>
        </p>
      </div>
    </div>
  );
};

export default Register;
