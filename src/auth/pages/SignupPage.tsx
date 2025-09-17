import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import userRegister from "../utils/userRegister";
import { useNavigate } from "react-router-dom";

const SignupSchema = Yup.object({
  UserName: Yup.string().required("Name is required").min(3, "At least 3 chars"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required").min(6, "At least 6 chars"),
});

export default function SignupPage() {
  const navigate=useNavigate()
  const register=userRegister()

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

        <Formik
          initialValues={{ UserName: "", email: "", password: "" }}
          validationSchema={SignupSchema}
          onSubmit={(values, { resetForm }) => {
            const reg=register({email:values.email,userName:values.UserName,password:values.password})
            if(reg){
              alert("Signup successful!");
             resetForm();
             navigate('/')
            }
            else{
              alert(' email already used')
            }
            
          }}
        >
          {() => (
            <Form className="space-y-4">
              <div>
                <Field
                  name="UserName"
                  placeholder="Enter your name"
                  className="w-full p-2 border rounded"
                />
                <ErrorMessage name="UserName" component="p" className="text-red-500 text-sm" />
              </div>

              <div>
                <Field
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full p-2 border rounded"
                />
                <ErrorMessage name="email" component="p" className="text-red-500 text-sm" />
              </div>

              <div>
                <Field
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  className="w-full p-2 border rounded"
                />
                <ErrorMessage name="password" component="p" className="text-red-500 text-sm" />
              </div>

              <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
                Sign Up
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
