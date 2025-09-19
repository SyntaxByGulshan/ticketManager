import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import userRegister from "../utils/userRegister";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Notification from "../../components/Notification";


const SignupSchema = Yup.object({
  UserName: Yup.string()
    .matches(/^[a-zA-Z ]*$/, "Only alphabets are allowed")
    .matches(
      /^[a-zA-Z]+([\s][a-zA-Z]+)*$/,
      "Only one space is allowed in middle"
    )
    .required("Name is required")
    .min(3, "At least 3 letters")
    .max(21, "Not more then 20 letters"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(/^\S*$/, "Spaces are not allowed")
    .matches(/[A-Z]/, "At least one uppercase letter")
    .matches(/[a-z]/, "At least one lowercase letter")
    .matches(/[0-9]/, "At least one number")
    .matches(
      /[@$!%*?&#^()_+\-=\[\]{};':"\\|,.\/?]/,
      "At least one special character"
    )
    .min(6, "At least 6 chars"),

  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password")],
    "Passwords must match"
  ),
});

export default function SignupPage() {
   const [showNotification, setShowNotification] = useState(false);
  const navigate = useNavigate();
  const register = userRegister();

  return (
    <div className="flex justify-center items-center py-20 px-2 text-gray-600">
      <div className="bg-gray-50 shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

        <Formik
          initialValues={{
            UserName: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={(values, { resetForm }) => {
            const reg = register({
              email: values.email,
              userName: values.UserName,
              password: values.password,
            });
            if (reg) {
              alert("Signup successful!");
              resetForm();
              navigate("/");
            } else {
              setShowNotification(true)
            }
          }}
        >
          {() => (
            <Form className="space-y-4">
              <div>
                <Field
                  name="UserName"
                  placeholder="Enter your name"
                  className="w-full p-2 border rounded border-gray-400 outline-gray-500"
                />
                <ErrorMessage
                  name="UserName"
                  component="p"
                  className="text-red-500 text-sm "
                />
              </div>

              <div>
                <Field
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full p-2 border rounded border-gray-400 outline-gray-500"
                />
                <ErrorMessage
                  name="email"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <Field
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  className="w-full p-2 border rounded border-gray-400 outline-gray-500"
                />
                <ErrorMessage
                  name="password"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>
              <div>
                <Field
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm   Password"
                  className="w-full p-2 border rounded border-gray-400 outline-gray-500"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-gray-100 p-2 rounded"
              >
                Sign Up
              </button>
            </Form>
          )}
        </Formik>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-600">Already have an account?</span>
          <button
            onClick={() => navigate("/login")}
            className="text-blue-600 hover:underline font-medium"
          >
            Log in
          </button>
        </div>
      </div>
      {showNotification && (
              <div className="fixed w-screen flex justify-center items-center  top-2 left-0">
                <Notification
                  notificationMessage='Email already used'
                  className={`relative text-gray-200  p-2 rounded-md text-center bg-red-500`}
                 
                  onLoad={() => {
                    setTimeout(() => {
                      setShowNotification(false);
                    }, 3000);
                  }}
                />
              </div>
            )}
    </div>
  );
}
