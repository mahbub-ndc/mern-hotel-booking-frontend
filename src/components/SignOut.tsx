import { useMutation, useQueryClient } from "react-query";

import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { logout } from "../api/global-api";

const SignOut = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation(logout, {
    onSuccess: async () => {
      toast.success("Logout Successfully");
      await queryClient.invalidateQueries("validateToken");
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
      className="text-blue-600 px-3 py-1 font-bold bg-white hover:bg-gray-100 rounded "
    >
      Sign Out
    </button>
  );
};

export default SignOut;
