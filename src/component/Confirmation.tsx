import { Button, Dialog, DialogActions, DialogContent, DialogTitle, styled } from "@mui/material"

const ConfirmationDialog = styled(Dialog)(
    {
        position : 'absolute',
        top : '50%',
        left : '50%',
        transform : 'translate(-50%,-50%)',
        width : 'fit-content',
        height : 'fit-cntent'
    }
)

const Header = styled('div')({
    fontSize : 18,
    fontWeight : 400
})

const Message = styled('div')({
    marginTop : theme => theme.spacing(2)
})


const Confirmation = ({open, onClose, make, model,onConfirm}) => {
  return (
    <ConfirmationDialog open={open} onClose={onClose}>
   <DialogTitle>
    <Header>Delete Confirmation</Header>
   </DialogTitle>
   <DialogContent>
    <Message>
        Are you sure you want to delete the car "{make}" {model}
    </Message>
   </DialogContent>
   <DialogActions>
    <Button color="info" variant="contained" onClick={onClose}>Cancel</Button>
    <Button color="error" variant="contained" onClick={onConfirm}>Confirm</Button>
   </DialogActions>
   </ConfirmationDialog>
  )
}

export default Confirmation