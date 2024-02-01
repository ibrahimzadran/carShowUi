import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CarResponse } from "../types";
import { DataGrid, GridColDef } from "@mui/x-data-grid";


const CarList = () => {
    const getCars = async(): Promise<CarResponse[]> =>{
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/cars`)
    return response.data;
}

const {data,error,isSuccess}= useQuery({
    queryKey:["cars"],
    queryFn: getCars

})

const columns : GridColDef[] =[
    {field:'make',headerName :'Make',width: 200},
    {field: 'model', headerName: 'Model', width: 200},
    {field: 'color', headerName: 'Color', width: 200},
    {field: 'registerNumber', headerName: 'Reg.nr.', width: 150},
    {field: 'year', headerName: 'Year', width: 150},
    {field: 'price', headerName: 'Price', width: 150},
  ]

if(!isSuccess){
    return <h2> Loading....</h2>
}else if (error){
    return <h2>Error when fetcching cars</h2>
}else{
    return(
        <DataGrid 
        rows={data}
        columns={columns}
        />
    )
}

  
}

export default CarList