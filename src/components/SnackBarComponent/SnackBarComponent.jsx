import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import PropType from 'prop-types'

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref}  {...props} sx={{
        backgroundColor: '#1718df', color: '#fff', '& .MuiAlert-icon': {
            color: '#fff'
        }
    }}
    />;
});
const SnackBarComponent = ({ handleClose, msg, isOpen, position = { vertical: 'bottom', horizontal: 'left' } }) => {

    return (
        <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar
                ContentProps={{
                    sx: {
                        backgroundColor: '#1718df',
                        color: '#fff'
                    }
                }}
                open={isOpen} autoHideDuration={3000} onClose={handleClose}
                anchorOrigin={{ vertical: position.vertical, horizontal: position.horizontal }}
            >
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    {msg}
                </Alert>
            </Snackbar>
        </Stack>
    );
}


SnackBarComponent.propTypes = {
    handleClose: PropType.func,
    msg: PropType.string,
    isOpen: PropType.bool.isRequired,
    position: PropType.object
}

export default SnackBarComponent