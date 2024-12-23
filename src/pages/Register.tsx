import { useForm } from "react-hook-form";
import { useMutation } from "react-query";

import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { registerApi } from "../api/global-api";
export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};
const Register = () => {
  const {
    register,
    handleSubmit,
    watch,

    formState: { errors },
  } = useForm<RegisterFormData>();

  const navigate = useNavigate();

  const mutation = useMutation(registerApi, {
    onSuccess: () => {
      toast.success("Registration successful!");
      navigate("/");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
  //console.log(mutation);

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  // watch input value by passing the name of it

  return (
    <>
      <form
        className=" container-fluid px-5 md:container flex flex-col gap-4 w-full md:w-2/3  mx-auto"
        onSubmit={onSubmit}
      >
        <h2 className="text-3xl font-semibold py-5">Create Account</h2>
        <div className="flex flex-col gap-2 md:flex-row">
          <input
            className="flex-1 border-gray-200 border-2 rounded-lg p-2 outline-0"
            placeholder="First Name"
            {...register("firstName", { required: "First Name is required" })}
          />

          <input
            className="flex-1 border-gray-200 border-2 rounded-lg p-2 outline-0"
            placeholder="Last Name"
            {...register("lastName", { required: "First Name is required" })}
          />
        </div>
        {errors.firstName && (
          <span className="text-red-600">T{errors.firstName.message}</span>
        )}

        <input
          className="flex-1 border-gray-200 border-2 rounded-lg p-2 outline-0"
          placeholder="Email"
          {...register("email", { required: "Email is required" })}
        />

        {errors.email && (
          <span className="text-red-600">{errors.email.message}</span>
        )}

        <input
          className="flex-1 border-gray-200 border-2 rounded-lg p-2 outline-0"
          placeholder="Password"
          {...register("password", {
            validate: (value) => {
              if (!value) {
                return "Password is required";
              } else if (value.length < 6) {
                return "Password must be at least 6 characters";
              }
            },
          })}
        />

        {errors.password && (
          <span className="text-red-600">{errors.password.message}</span>
        )}

        <input
          className="flex-1 border-gray-200 border-2 rounded-lg p-2 outline-0"
          placeholder="Confirm Password"
          {...register("confirmPassword", {
            validate: (value) => {
              if (!value) {
                return "Password is required";
              } else if (watch("password") !== value) {
                return "Password does not match";
              }
            },
          })}
        />
        {errors.confirmPassword && (
          <span className="text-red-600">{errors.confirmPassword.message}</span>
        )}

        <button className="bg-blue-500 text-white p-2 rounded-lg" type="submit">
          <input type="submit" />
        </button>
      </form>
      <div className="md:container container-fluid px-5 w-full  md:w-2/3 mt-5 mb-5 ">
        Already Registered? Please{" "}
        <Link to={"/login"} className="text-blue-600">
          Login
        </Link>
      </div>
    </>
  );
};

export default Register;
