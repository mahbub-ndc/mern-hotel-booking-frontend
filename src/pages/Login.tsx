import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";

import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { loginApi } from "../api/login-api";
export type LoginFormData = {
  email: string;
  password: string;
};
const Login = () => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<LoginFormData>();

  const navigate = useNavigate();

  const mutation = useMutation(loginApi, {
    retry: false,
    onSuccess: async () => {
      toast.success("Login successful!");
      await queryClient.invalidateQueries("validateToken");
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
        className="container flex flex-col gap-4 w-2/3 mx-auto"
        onSubmit={onSubmit}
      >
        <h2 className="text-3xl font-semibold py-5">Login</h2>

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
          {...register("password", { required: "Password is required" })}
        />

        {errors.password && (
          <span className="text-red-600">{errors.password.message}</span>
        )}

        <button className="bg-blue-500 text-white p-2 rounded-lg" type="submit">
          <input type="submit" />
        </button>
      </form>
      <div className="container  w-2/3 mt-5 mb-5 ">
        Don't have an account? Please{" "}
        <Link to={"/register"} className="text-blue-600">
          Register
        </Link>
      </div>
    </>
  );
};

export default Login;
