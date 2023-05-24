import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import AuthService from "../../api/services/Auth.service";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AlertCreate from "../../components/alert/AlertCreate";
import { Formik } from "formik";
import { ConnexionValidation } from "../../validation/Connexion.validation";

// TODO remove, this demo shouldn't need to reset the theme.
const initialValues = {
  email: "",
  password: "",
};

const Connexion = () => {
  const { authenticated, setAuthenticated, setAccessToken } =
    useContext(AuthContext);
  const [alertError, setAlertError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (authenticated) {
      navigate("/");
    }
  }, [authenticated, navigate]);

  const handleFormSubmit = (value: any) => {
    AuthService.login(value.email, value.password)
      .then((response) => {
        if (response) {
          setAuthenticated(true);
          setAccessToken(response.access_token);
          localStorage.setItem("access_token", response.access_token);
          localStorage.setItem("logged", "true");
          navigate("/");
        } else {
          setAlertError(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "space-around",
        justifyContent: "space-around",
        height: "100vh",
      }}
    >
      <Container component="main" maxWidth="xs">
        <AlertCreate
          alert={alertError}
          setAlert={setAlertError}
          text={"Email/mot de passe incorrect ou non autorisé"}
          severity="error"
        />
        <Box display="flex" justifyContent="center" alignItems="center">
          <img
            className="avater-image"
            alt="profile user"
            width="200px"
            height="200px"
            src={"../../assets/logo.png"}
            style={{ cursor: "pointer", borderRadius: "50%" }}
          />
        </Box>
        <Formik
          onSubmit={(values, { resetForm }) => {
            handleFormSubmit(values);
          }}
          initialValues={initialValues}
          validationSchema={ConnexionValidation}
          enableReinitialize
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr)"
              >
                <TextField
                  fullWidth
                  variant="filled"
                  type="email"
                  label="Email*"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  error={!!touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="password"
                  label="Password*"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  error={!!touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                />
              </Box>
              <Box display="flex" justifyContent="center" mt="20px">
                <Button type="submit" color="secondary" variant="contained">
                  SIGN IN
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Container>
    </Box>
  );
};

export default Connexion;
