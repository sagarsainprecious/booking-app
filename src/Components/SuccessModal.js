// SuccessModal.js
import React from "react";
import {
  Modal,
  Paper,
  Typography,
  Grid,
  IconButton,
  styled,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

// Styled components using Material-UI's styled function
const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[5],
  padding: theme.spacing(4),
  textAlign: "center",
  maxWidth: 400,
}));

const IconContainer = styled(Grid)({
  color: (theme) => theme.palette.success.main,
});

const SuccessModal = ({ open, onClose }) => {
  return (
    <StyledModal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <StyledPaper>
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <IconContainer item>
            <IconButton disabled>
              <CheckCircleOutlineIcon
                style={{ fontSize: 80, color: "green" }}
              />
            </IconButton>
          </IconContainer>
          <Grid item xs={12}>
            <Typography variant="h6">Booking Successful!</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              We have sent a google calendar invite, please check your google calendar.
            </Typography>
          </Grid>
        </Grid>
      </StyledPaper>
    </StyledModal>
  );
};

export default SuccessModal;
