import { Alert, Collapse, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type Props = {
  alert: boolean;
  setAlert: any;
  name: string;
  id: number;
  collectionName: string;
};

const DeleteAlertSuccess = ({
  alert,
  setAlert,
  name,
  id,
  collectionName,
}: Props) => {
  return (
    <Collapse in={alert}>
      <Alert
        severity="success"
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setAlert(false);
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        sx={{ mb: 2 }}
      >
        This {collectionName} named {name} with id {id} was delete by succes
      </Alert>
    </Collapse>
  );
};

export default DeleteAlertSuccess