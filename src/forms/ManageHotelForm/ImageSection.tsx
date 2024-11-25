import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./MangeHotelForm";

const ImageSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Images</h2>
      <div className=" border rounded p-4 flex flex-col">
        <input
          type="file"
          multiple
          accept="image/*"
          className="w-full"
          {...register("imageFiles", {
            validate: (value) => {
              if (value.length === 0) return "Please select at least one image";
              if (value.length > 6) return "You can only upload 6 images";
              return true;
            },
          })}
        />
        {errors.imageFiles && (
          <span className="text-red-500">{errors.imageFiles.message}</span>
        )}
      </div>
    </div>
  );
};

export default ImageSection;
