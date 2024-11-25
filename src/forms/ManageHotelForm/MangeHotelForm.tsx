import { FormProvider, useForm } from "react-hook-form";
import FormDetails from "./FormDetails";

export type HotelFormData = {
  name: string;
  city: string;
  country: string;
  description: string;
  rating: number;
  pricePerNight: number;
  type: string;
  facilities: string[];
  imageFiles: FileList;
  imageUrls: string[];
  adultCount: number;
  childCount: number;
};

export type HotelFormUpatedData = {
  name: string;
  city: string;
  country: string;
  description: string;
  rating: number;
  pricePerNight: number;
  type: string;
};

type ManageHotelFormProps = {
  onSave: (data: FormData) => void;
  isLoading: boolean;
};
const MangeHotelForm = ({ onSave, isLoading }: ManageHotelFormProps) => {
  const formMethods = useForm<HotelFormData>();
  const { handleSubmit } = formMethods;
  const onSubmit = handleSubmit((data: HotelFormData) => {
    console.log(data);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("city", data.city);
    formData.append("country", data.country);
    formData.append("description", data.description);
    formData.append("rating", data.rating.toString());
    formData.append("pricePerNight", data.pricePerNight.toString());
    formData.append("childCount", data.childCount.toString());
    formData.append("adultCount", data.adultCount.toString());
    formData.append("type", data.type);
    data.facilities.forEach((facility, index) =>
      formData.append(`facilities[${index}]`, facility)
    );
    if (data.imageUrls) {
      data.imageUrls.forEach((url, index) => {
        formData.append(`imageUrls[${index}]`, url);
      });
    }

    Array.from(data.imageFiles).forEach((imageFile) => {
      formData.append(`imageFiles`, imageFile);
    });
    onSave(formData);
  });

  return (
    <div className="container mx-auto p-4 w-2/3">
      <FormProvider {...formMethods}>
        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <FormDetails />
          {/* <HotelType />
          <Facilities />
          <Guest />
          <ImageSection /> */}
          <span className="flex justify-end mt-4 py-3">
            <button
              disabled={isLoading}
              type="submit"
              className="bg-blue-500 text-white p-2 rounded"
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
          </span>
        </form>
      </FormProvider>
    </div>
  );
};

export default MangeHotelForm;
