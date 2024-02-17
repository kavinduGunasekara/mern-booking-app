import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestsSection from "./GuestsSection";
import ImagesSection from "./ImagesSection";

export type HotelFormData = {
    name: string;
    city: string;
    country: string;
    description: string;
    type: string;
    pricePerNight: number;
    starRating: number;
    facilities: string[];
    imageFiles: FileList;
    adultCount: number;
    childCount: number;

};

const ManageHotelFrom = () => {
    const formMethods = useForm<HotelFormData>();
    const { handleSubmit }= formMethods;

    const onSubmit = handleSubmit((formData: HotelFormData) => {
    // create a FormData Object & call our Api
    console.log(formData);
    
    });

    return (
    <FormProvider {...formMethods}>
         <form className="flex flex-col gap-10" onSubmit={onSubmit}>
            <DetailsSection/>
            <TypeSection/>
            <FacilitiesSection/>
            <GuestsSection/>
            <ImagesSection/>
          <span className="flex justify-end">
            <button type="submit" className="bg-green-600 text-white p-2 font-bold hover:bg-green-500 text-xl rounded-lg"
            >
                Save
            </button>

          </span>

         </form>
    </FormProvider>
    );
};

export default ManageHotelFrom;