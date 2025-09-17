import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector} from "react-redux";
import { addTicket } from "../slice/ticketSlice";
import type TicketType from "../types/types";
import { X } from 'lucide-react';
import type { RootState } from "../store/store";
const validationSchema = Yup.object({
title: Yup.string()
.required("Title is required")
.min(3, "Title must be at least 3 characters")
.max(30, "Title cannot exceed 30 characters")
// Must start with a letter and only contain allowed chars
.matches(
/^[A-Za-z][A-Za-z0-9 .,_-]*$/,
"start with a letter and  may contain letters, numbers, spaces"
)
,

description: Yup.string()
  .required("Description is required")
  .min(10, "Description must be at least 10 characters")
  .max(200, "Description cannot exceed 200 characters")
  .test(
    "no-html-tags",
    "Description cannot allowed HTML tags",
    (value) => !/(<[^>]+>)/.test(value || "")
  )
  .test(
    "no-script",
    "Description looks unsafe",
    (value) => !/script\s*>/i.test(value || "")
  )
  .test(
    "no-excessive-newlines",
    "Not more than 1 consecutive blank lines allowed",
    (value) => !(typeof value === "string" && /\n{3,}/.test(value))
  ),

priority: Yup.string()
.oneOf(["Low", "Medium", "High"], "Select a valid priority")
.required("Priority is required"),
});

interface TicketFormProps {
  onClose: () => void;
  onSave?: (ticket: any) => void; 
}

export default function TicketForm({ onClose }: TicketFormProps) {
  const dispatch = useDispatch();
  const user=useSelector((state:RootState)=>state.user)
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 flex justify-center items-center px-2">
      <div className=" top-10  p-5 md:max-w-2xl w-full shadow-lg rounded-lg bg-gray-300 text-gray-700">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className=" md:text-2xl font-bold">Create New Ticket</h2>
          <button
            onClick={onClose}
            className="text-gray-700 hover:scale-125 duration-200"
          >
          <X />
          </button>
        </div>

        {/* Formik Form */}
        <Formik
          initialValues={{
            title: "",
            description: "",
            priority: "",
          }}
          validationSchema={validationSchema}
          validateOnBlur={true}
          validateOnChange={true}
          onSubmit={(values, { resetForm }) => {
            console.log(values.description)
            const newTicket:TicketType = {
              userId:user.userId,
              id: `TN${new Date().getTime()}`,
              title: values.title,
              description: values.description,
              priority: values.priority as "Low" | "Medium" | "High",
                status:'Open',
              createdAt: new Date().toLocaleString(),
              isDeleted:false
              
            };
            dispatch(addTicket(newTicket)); 
            resetForm();
            onClose()
          }}
        >
          {({ errors, touched, values }) => (
            <Form className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium">Title</label>
                <Field
                  type="text"
                  name="title"
                  className="mt-1 w-full p-2 border-2 border-gray-400  bg-gray-200 rounded-md outline-none  "
                />
                {touched.title && errors.title && (
                  <span className="text-red-500 text-sm ">{errors.title}</span>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium">Description</label>
                <Field
                  as="textarea"
                  name="description"
                  disabled={!values.title.length}
                  className="mt-1 w-full p-2 border-2 border-gray-400  bg-gray-200 rounded-md outline-none"
                />
                {touched.description && errors.description && (
                  <p className="text-red-500 text-sm">{errors.description}</p>
                )}
              </div>

              {/* Priority */}
              <div>
                <label className="block text-sm font-medium">Priority</label>
                <Field
                  as="select"
                  name="priority"
                  disabled={!values.title.length }
                  className="mt-1 w-full p-2 border-2 border-gray-400  bg-gray-200 rounded-md outline-none"
                >
                  <option disabled value="">
                    Select
                  </option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </Field>
                {touched.priority && errors.priority && (
                  <p className="text-red-500 text-sm">{errors.priority}</p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-blue-500 text-gray-200 hover:bg-blue-600 py-2 rounded-md"
              >
                Create Ticket
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
