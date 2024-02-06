import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { CarResponse } from "../types";
import { DataGrid, GridCellParams, GridColDef } from "@mui/x-data-grid";
import { Button, Snackbar } from "@mui/material";
import { deleteCar, getCars } from "../carapi";
import { useState } from "react";
import Confirmation from "./Confirmation";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddCar from "./AddCar";
import EditCar from "./EditCar";




const CarList = () => {
    const queryClient = useQueryClient()
    const[open, setOpen] = useState(false)
    const [openConfirmation, setOpenConfirmation] = useState(null)
    const [showSnackBar, setSnackBar] = useState(false)





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
    { field:'edit',
    headerName:'',
  width:90,
 sortable:false,
filterable:false,

renderCell:(params:GridCellParams)=> 
<EditCar cardata={params.row} />
},
    {
      field: "delete",
      headerName: "",
      width: 90,
      sortable: false,
      filterable: false,
      renderCell: (params:GridCellParams) => (
        <>
       <Button color="error"
       onClick={()=>setOpenConfirmation({
        id:params.row.id,
        make:params.row.make,
      model:params.row.model
    }) }

      ><DeleteForeverIcon/></Button>
       <Confirmation open={openConfirmation?.id===params.row.id} 
       make={openConfirmation?.make}
       model={openConfirmation?.model}
       onClose={()=>setOpenConfirmation(false)}
       onConfirm={()=> {
        mutate(params.row.id);
        setOpenConfirmation(false)
      }
      }
       >
       </Confirmation>
       </>
      )
    }
  ]

  

 const {mutate} = useMutation(deleteCar, {
    onSuccess : () => {
        // setOpen(true)
        queryClient.invalidateQueries({queryKey:["cars"]});
        setSnackBar(true);
    },
    onError : (err) =>{
        console.error(err);
    }
  })

  


if(!isSuccess){
    return <h2> Loading....</h2>
}else if (error){
    return <h2>Error when fetcching cars</h2>
}else{
    return(

     
        <>
        <DataGrid 
        rows={data}
        columns={columns}
        
        />
            <Snackbar open={showSnackBar} 
        autoHideDuration={2000}
        onClose={()=> setSnackBar(false)}
        message="Car deleted"
        
        />
         <AddCar />

        </>

    )
}


  
}

export default CarList