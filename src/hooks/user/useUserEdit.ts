import { useContext, useEffect, useState } from "react";
import functionHelper from "../../utils/functionHelper";
import dayjs from "dayjs";
import UserService from "../../api/services/User.service";
import User from "../../schema/user.type";
import LogoutContext from "../../context/LogoutContext";
import { AuthContext } from "../../context/AuthContext";

const useUserEdit = (status: string, id?: number) => {
  const [initialValues, setInitialValues] = useState<User>({
    name: "",
    surname: "",
    email: "",
    password: "",
    picture: "#",
    dateOfBirth: "",
    role: "user",
    gender: "",
  } as User);
  const [alertText, setAlertText] = useState<string>("SUCCESS ALERT");
  const [alertErrorText, setAlertErrorText] = useState<string>("ERROR ALERT");
  const [title, setTitle] = useState<string>("VIEW USER");
  const [picture, setPicture] = useState("#");
  const [subtitle, setSubtitle] = useState<string>("View user details");
  const [alert, setAlert] = useState(false);
  const [alertError, setAlertError] = useState(false);
  const checkValidConnexion = LogoutContext();
  const {accessToken} = useContext(AuthContext)

  useEffect(() => {
    checkValidConnexion;
    if (status === "create") {
      setAlertErrorText("User creation failed");
      setAlertText("User created");
      setTitle("CREATE USER");
      setSubtitle("Create a new user");
    } else {
      if (id) {
        UserService.getOne(id, accessToken ? accessToken : '').then((res) => {
          setInitialValues(functionHelper.formatEdtiForm(res));
          res.picture && setPicture(res.picture);
        });
      }
      if (status === "edit") {
        setAlertText("User updated");
        setAlertErrorText("User update failed");
        setTitle("EDIT USER");
        setSubtitle("Edit user details");
      }
    }
  }, []);

  const handleFormSubmit = async (values: any, resetForm: any) => {
    if (status === "create") {
      values = functionHelper.setEmptyToUndefined(values);
      values.registrationDate = dayjs(new Date()).format("YYYY-MM-DD");
      values.picture = picture === "#" ? undefined : picture;
      if (values.dateOfBirth) {
        values.dateOfBirth = dayjs(values.dateOfBirth).format("YYYY-MM-DD");
      }
      (await UserService.create(values, accessToken ? accessToken : '')) === false
        ? (setAlertError(true),
          setInitialValues({
            name: values.name ? values.name : "",
            surname: values.surname ? values.surname : "",
            email: values.email ? values.email : "",
            password: values.password ? values.password : "",
            role: values.role ? values.role : "user",
            gender: values.gender ? values.role : "",
            picture: picture,
            dateOfBirth: "",
          }),
          resetForm({ initialValues }))
        : (resetForm({ initialValues }), setAlert(true));
    } else if (status === "edit") {
      values = functionHelper.formatEditPatch(values, initialValues, picture);
      if (!values) return;
      if (values.dateOfBirth) {
        values.dateOfBirth = dayjs(values.dateOfBirth).format("YYYY-MM-DD");
      }
      (await UserService.update(id ? +id : 0, values, accessToken ? accessToken : '')) === false
        ? setAlertError(true)
        : setAlert(true);
    }
  };

  return {
    initialValues,
    alertErrorText,
    alertText,
    title,
    subtitle,
    picture,
    setPicture,
    alert,
    setAlert,
    alertError,
    setAlertError,
    handleFormSubmit,
  };
};

export default useUserEdit;
