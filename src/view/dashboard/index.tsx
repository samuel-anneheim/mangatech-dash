import { Box } from "@mui/material";
import Header from "../../components/Header";

const Dashboard = () => {
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center" mt={5}>
          <img
            className="avater-image"
            alt="profile user"
            width="500px"
            height="500px"
            src={"../../assets/logo.png"}
            style={{ cursor: "pointer", borderRadius: "50%" }}
          />
        </Box>
    </Box>
  );
};

export default Dashboard;
