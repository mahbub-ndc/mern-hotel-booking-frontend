import { useMutation, useQueryClient } from "react-query";

import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { logout } from "../api/global-api";

const SignOut = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation(logout, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      toast.success("Logout Successfully");

      navigate("/login");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const handleClick = () => {
    mutation.mutate();
  };
  return (
    <button
      onClick={handleClick}
      className="text-white md:bg-white md:text-blue-600  px-5 py-1 font-bold bg-blue-600 hover:bg-gray-100 hover:text-blue-600 rounded "
    >
      Sign Out
    </button>
  );
};

export default SignOut;
