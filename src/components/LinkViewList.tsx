import { Box, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../theme";

type Props = {
  route: string,
  value: string;
  id: number;
};

const LinkViewList = ({ value, route, id }: Props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box>
    <Typography color={colors.grey[100]}>
    <Link to={`/${route}/${id}`} style={{color :colors.grey[100], textDecoration: "inherit"}} >
        {value}
      </Link>
    </Typography>
  </Box>
  );
};

export default LinkViewList;