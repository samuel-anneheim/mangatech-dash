import { Box, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../theme";

type Props = {
  email: string;
};

const EmailList = ({ email }: Props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box>
    <Typography color={colors.grey[100]}>
    <Link to={`mailto:${email}`} style={{color :colors.grey[100], textDecoration: "inherit"}} >
        {email}
      </Link>
    </Typography>
  </Box>
  );
};

export default EmailList;