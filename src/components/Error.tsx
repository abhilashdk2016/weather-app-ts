import { Box, Modal, Typography } from "@mui/material";
import { useEffect, useState } from "react";

type Props = {
    error?: null | string,
    setError: (value: (null|string)) => void
};

const style = {
    position: 'absolute' as 'absolute',
    background: `rgba( 255, 255, 255, 0.2 )`,
    borderRadius: '10px',
    maxWidth: '500px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    height: "300px",
    maxHeight: "300px",
    width: "100%",
    color: "white",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };
const Error = ({error, setError}: Props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setError(null);
  }
  useEffect(() => {
    if(error) {
        handleOpen();
    }
  }, [error]);
    return <>
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Error connecting to Weather API
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Unauthorized
            </Typography>
        </Box>
    </Modal>
</>
}

export default Error