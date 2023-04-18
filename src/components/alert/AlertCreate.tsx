import { Alert, Collapse, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type Props = {
  alert: boolean;
  setAlert: (alert: boolean) => void;
  text: string;
  severity?: "success" | "info" | "warning" | "error";
};

const AlertCreate = ({ alert, setAlert, text, severity }: Props) => {
  return (
    <Collapse in={alert}>
      <Alert
        severity={severity}
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
        {text}
      </Alert>
    </Collapse>
  );
};

export default AlertCreate;
