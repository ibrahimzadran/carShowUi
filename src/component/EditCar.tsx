import React, { ChangeEvent, useState } from 'react'
import { CarEntry, CarResponse } from '../types';
import { Button } from '@mui/base';
import { Dialog, DialogActions, DialogTitle, colors } from '@mui/material';
import CarDialogContent from './CarDialogContent';
import { useMutation , useQueryClient } from '@tanstack/react-query';
import { updateCar } from '../carapi';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';


type FormProps = {
    cardata: CarResponse; 
}



const EditCar = ({cardata}:FormProps ) => {

    const [car, setCar] = useState<Car>({
        id: 0,
        make: '', 
        model:'',
        color:'', 
        registerNumber: '', 
        year: 0, 
        price:0
    })
    const [open, setOpen] = useState(false); 
    const handleChange = (event: ChangeEvent<HTMLInputElement> )=> {
        setCar({...car, [event.target.name]:event.target.value})
    }
    const handleClose = ()=> { 
        setOpen(false); 
    }
    const handleOpen =()=> { 
        setCar({
            id : 0,
            make : cardata.make,
            model : cardata.model,
            color : cardata.color,
            registerNumber : cardata.registerNumber,
            year : cardata.year,
            price : cardata.price
        })
        setOpen(true)
    }

    const queryClient = useQueryClient();

    const {mutate}= useMutation(updateCar, {
        onSuccess : ()=> {
            queryClient.invalidateQueries(['cars']);
        },
        onError : (err)=> {
            console.error(err)
        }
    })

    const handleSave = ()=>{
        const url = cardata.id;
        const carEntry : CarEntry={car,url}
        mutate (carEntry)
        setCar({
            id: 0,
            make: '', 
            model:'',
            color:'', 
            registerNumber: '', 
            year: 0, 
            price:0
        })
        setOpen(false)
    }

  return (
   <>
   <Button onClick={handleOpen} color="primary"> <ModeEditIcon /></Button>
   <Dialog open = {open} onClose={handleClose} >
    <DialogTitle > Edit Car </DialogTitle>
    <CarDialogContent car ={car} handleChange={handleChange}/>
   <DialogActions>
   <Button color="error" variant='contained'onClick={handleClose} > Cancel <CancelIcon color='error'/></Button>
   <Button color="primary" variant='contained'onClick={handleSave} > save <SaveIcon color='primary'/>  </Button>
   </DialogActions>



    
   </Dialog>

   </>
  )
}

export default EditCar