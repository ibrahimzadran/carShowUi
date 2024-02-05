import {DialogContent, TextField} from '@mui/material'

import { DialogFromProps } from "../types"


const CarDialogContent = ({car,handleChange}: DialogFromProps) => {
  return (
   <DialogContent>
    <TextField value={car.make} name="make" variant="filled" placeholder="Make" onChange={handleChange} /> <br/>
    <TextField value={car.model} name="model" variant="filled" placeholder="Model" onChange={handleChange} /><br/>
    <TextField value={car.color} name="color" variant="filled" placeholder="Color" onChange={handleChange} /><br/>
    <TextField value={car.registerNumber} name="registerNumber" variant="filled" placeholder="Reg.Number" onChange={handleChange} /> <br/>
    <TextField value={car.year} name="year" variant="filled" placeholder="Year" onChange={handleChange} /> <br/>
    <TextField value={car.price} name="price" variant="filled" placeholder="Price" onChange={handleChange} /> <br/>
   </DialogContent>
  )
}

export default CarDialogContent