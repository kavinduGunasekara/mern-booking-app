import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";

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
    return (
    <FormProvider {...formMethods}>
         <form className="flex flex-col gap-10">
            <DetailsSection/>
            <TypeSection/>
         </form>
    </FormProvider>
    );
};

export default ManageHotelFrom;