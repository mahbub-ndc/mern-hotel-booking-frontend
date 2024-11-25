/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { testForm } from "../api/global-api";
import { toast } from "sonner";

export interface TestFormData {
  name: string;
  email: string;
  password: string;
  imageFiles: FileList;
}
export const TestForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TestFormData>();

  const mutation = useMutation(testForm, {
    onSuccess: () => {
      //console.log("Hotel added successfully");

      toast.success("Test form added successfully");
    },
    onError: (error: Error) => {
      console.log(error.message);
      toast.error(error.message);
    },
  });

  const onSubmit = (data: TestFormData) => {
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    formData.append("file", data.imageFiles[0]);

    // if (data.imageUrls) {
    //   data.imageUrls.forEach((url, index) => {
    //     formData.append(`imageUrls[${index}]`, url);
    //   });
    // }

    // Array.from(data.imageFiles).forEach((imageFile) => {
    //   formData.append(`imageFiles`, imageFile);
    // });

    mutation.mutate(formData);
  };
  return (
    <div className="container mx-auto w-2/3">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="text-gray-700 text-sm font-semibold">
          Name
          <input
            type="text"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("name", { required: "This field is required" })}
          ></input>
          {errors.name && (
            <span className="text-red-500">{errors.name.message}</span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-semibold">
          Email
          <input
            type="email"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("email", { required: "This field is required" })}
          ></input>
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </label>

        <label className="text-gray-700 text-sm font-semibold">
          Password
          <input
            type="password"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("password", { required: "This field is required" })}
          ></input>
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
        </label>

        <div className=" border rounded p-4 flex flex-col">
          <input
            type="file"
            multiple
            accept="image/*"
            className="w-full"
            {...register("imageFiles", {
              validate: (value) => {
                if (value.length === 0)
                  return "Please select at least one image";
                if (value.length > 6) return "You can only upload 6 images";
                return true;
              },
            })}
          />
          {errors.imageFiles && (
            <span className="text-red-500">{errors.imageFiles.message}</span>
          )}
        </div>

        <button type="submit">Submit</button>
        {errors.name && <span>This field is required</span>}
      </form>
    </div>
  );
};
