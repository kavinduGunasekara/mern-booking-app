import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from '../api-client'
import ManageHotelFrom from "../forms/ManageHotelForm/ManageHotelForm";

const EditHotel = () => {
    const { hotelId } = useParams();

    const { data: hotel} = useQuery(
        "fetchMyHotelById",
         ()=>
    apiClient.fetchMyHotelById(hotelId || ""),
    {
        enabled: !!hotelId,
    }
    );
    return <ManageHotelFrom hotel ={hotel} />
}; 

export default EditHotel;
