import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    IconButton,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import './SubmitConfirmComponent.css'
function SubmitConfirmComponent({ isOpen,handleConfirmActivation, handleClose,handleProceed }) {
    const handleConfirmation = (confirmed) => {
        handleConfirmActivation(confirmed);
        handleClose();
    };
    return (
        <Dialog open={isOpen} onClose={handleClose}>
            <div className="items-stretch shadow-lg bg-white flex flex-col p-3 rounded-lg">
                <DialogTitle style={{ paddingLeft: '0', paddingRight: '0' }} className="justify-between items-stretch flex gap-5 max-md:max-w-full ">
                    <h2 className="text-blue-900 text-base font-bold leading-4 tracking-tight grow whitespace-nowrap">
                        Create Model
                    </h2>
                    {/* <IconButton className="aspect-square object-contain object-center w-4 overflow-hidden shrink-0 max-w-full" onClick={() => handleConfirmation(false)}>
                        <CancelIcon />
                    </IconButton> */}
                </DialogTitle>
                <DialogContent style={{ paddingTop: 'inherit' }} className="text-zinc-700 text-base font-normal leading-4 tracking-tight items-stretch rounded bg-gray-100 justify-center mt-3 px-3 py-4 max-md:max-w-full">
                    <span className="">Your model has been {"CREATED"}</span>

                </DialogContent>

                {/* <DialogActions className="justify-between items-stretch flex gap-2.5 mt-6 pl-20 max-md:max-w-full max-md:flex-wrap max-md:pl-5"> */}
                <form className="items-stretch self-stretch flex flex-col pt-3">
                    <header className="justify-between items-stretch flex gap-2.5 pl-20">
                        <div className="flex min-h-[-9007199254740991px] flex-col" />
                        <DialogActions>
                            <Button
                                className="text-blue-900 text-center text-sm leading-4 tracking-tight items-stretch rounded border border-[color:var(--primary-1-maruti-blue-500,#171C8F)] bg-white grow justify-center px-6 py-2 border-solid max-md:px-5 text-transform-none"
                                // onClick={() => handleConfirmation(true)}
                                onClick={()=>handleProceed(true)}
                                color="secondary"
                            >
                                Ok, Proceed
                            </Button>

                        </DialogActions>
                    </header>
                </form>
            </div>
        </Dialog>
    );
}

export default SubmitConfirmComponent;
