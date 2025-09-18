import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import userValidation from "../utils/userValidation";

const LoginSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export default function LoginPage() {

  const navigate=useNavigate()

  const user=userValidation()
  
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={(values, { resetForm }) => {
           const validation= user({email:values.email,password:values.password})
           console.log(validation)
            if(validation){
              navigate('/')
              resetForm();
            }
            else{
              window.alert('invalid user')
            }
          }}
        >
          {() => (
            <Form className="space-y-4">
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

              <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">
                Login
              </button>

            </Form>
          )}
        </Formik>
         <div className="flex items-center gap-2 text-sm">
      <span className="text-gray-600">New user?</span>
      <button
        onClick={() => navigate("/signup")}
        className="text-blue-600 hover:underline font-medium"
      >
        Sign up
      </button>
    </div>
      </div>
    </div>
  );
}
