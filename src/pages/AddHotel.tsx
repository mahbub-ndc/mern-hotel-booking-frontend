/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "react-query";

import { toast } from "sonner";

import { FormProvider, useForm } from "react-hook-form";

import FormDetails from "../forms/ManageHotelForm/FormDetails";

import HotelType from "../forms/ManageHotelForm/HotelType";
import ImageSection from "../forms/ManageHotelForm/ImageSection";
import Guest from "../forms/ManageHotelForm/Guest";
import Facilities from "../forms/ManageHotelForm/Facilities";
import { useEffect } from "react";
import { addMyHotel } from "../api/global-api";

export type HotelForm = {
  _id: string;
  name: string;
  city: string;
  country: string;
  description: string;
  pricePerNight: number;
  rating: number;
  adultCount: number;
  childCount: number;
  facilities: string[];
  type: string;
  imageFiles: FileList;
};

const AddHotel = ({ hotel }: { hotel: any }) => {
  // const {
  //   register,
  //   formState: { errors },
  // } = useForm<HotelForm>();

  console.log("hotel from edit", hotel);

  const mutation = useMutation(addMyHotel, {
    onSuccess: () => {
      //console.log("Hotel added successfully");
      toast.success("Hotel added successfully");
    },
    onError: (error: Error) => {
      console.log(error.message);
      toast.error(error.message);
    },
  });
  const methods = useForm<HotelForm>();
  const { reset } = methods;

  useEffect(() => {
    reset(hotel);
  }, [hotel, reset]);

  const onSubmit = (data: HotelForm) => {
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    Array.from(data.imageFiles).forEach((imageFile) => {
      formData.append(`files`, imageFile);
    });
    mutation.mutate(formData);
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <div className="container-fluid px-5 md:container">
        <div className="flex flex-col gap-4 py-5">
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <FormDetails />
            <Guest />
            <HotelType />
            <Facilities />
            <ImageSection />
            <button
              className="bg-blue-500 text-white p-2 rounded-lg"
              type="submit"
            >
              <input type="submit" />
            </button>
          </form>
        </div>
      </div>
    </FormProvider>
  );
};

export default AddHotel;
