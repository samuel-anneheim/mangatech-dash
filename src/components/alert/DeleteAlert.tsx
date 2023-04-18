import { Alert, Box, Button, Collapse, IconButton } from "@mui/material";

type Props = {
  alertWarn: boolean,
  setAlertWarn: any,
  nameDelete: string,
  idDelete: number,
  handleDelete: any,
  collectionName: string
}

const DeleteAlert = ({
  alertWarn,
  setAlertWarn,
  nameDelete,
  idDelete,
  handleDelete,
  collectionName
}: Props) => {
  return (
    <Collapse in={alertWarn}>
      <Alert
        severity="warning"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        action={
          <IconButton
            aria-label="close"
            color="warning"
            size="small"
            onClick={() => {
              setAlertWarn(false);
            }}
          ></IconButton>
        }
      >
        <Box display="flex" alignItems="center">
          <Box>
            Do you want delete {collectionName} {nameDelete} with id: {idDelete}
          </Box>
          <Box>
            <Button
              onClick={() => {
                handleDelete(), setAlertWarn(false);
              }}
              color="secondary"
            >
              Yes
            </Button>
            <Button
              onClick={() => setAlertWarn(false)}
              color="secondary"
              sx={{ m: "0px" }}
            >
              No
            </Button>
          </Box>
        </Box>
      </Alert>
    </Collapse>
  );
};

export default DeleteAlert;
