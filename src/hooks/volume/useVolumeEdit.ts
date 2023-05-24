import { useContext, useEffect, useState } from "react";
import functionHelper from "../../utils/functionHelper";
import EditionService from "../../api/services/Edition.service";
import Edition from "../../schema/edition.type";
import Collection from "../../schema/collection.type";
import CollectionService from "../../api/services/Collection.Service";
import Volume from "../../schema/volume.type";
import VolumeService from "../../api/services/Volume.Service";
import dayjs from "dayjs";
import LogoutContext from "../../context/LogoutContext";
import { AuthContext } from "../../context/AuthContext";

const useVolumeEdit = (status: string, id?: number) => {
  const [initialValues, setInitialValues] = useState<Volume>({
    title: "",
    number: 0,
    releaseDate: "",
    image: "#",
    resume: "",
    nbrPages: 0,
    price: 0,
    visibility: false,
    editionId: 0,
  } as Volume);
  const [alertText, setAlertText] = useState<string>("SUCCESS ALERT");
  const [alertErrorText, setAlertErrorText] = useState<string>("ERROR ALERT");
  const [title, setTitle] = useState<string>("VIEW VOLUME");
  const [image, setImage] = useState("#");
  const [subtitle, setSubtitle] = useState<string>("View volume details");
  const [collection, setCollection] = useState<Collection[]>([]);
  const [collectionId, setCollectionId] = useState<number>(0);
  const [editionList, setEditionList] = useState<Edition[]>([]);
  const [editionId, setEditionId] = useState<number>(0);
  const [alert, setAlert] = useState(false);
  const [alertError, setAlertError] = useState(false);
  const checkValidConnexion = LogoutContext();
  const {accessToken} = useContext(AuthContext);

  
  useEffect(() => {
    checkValidConnexion;
    CollectionService.list().then((data) => setCollection(data));
    if (status === "create") {
      setAlertErrorText("Volume creation failed");
      setAlertText("Volume created");
      setTitle("CREATE VOLUME");
      setSubtitle("Create a new volume");
    } else {
      if (id) {
        VolumeService.getOne(id).then((res) => {
          setInitialValues(functionHelper.formatEdtiForm(res));
          res.image && setImage(res.image);
          if (res.edition.collectionId) {
            setCollectionId(res.edition.collectionId);
            handleChangeCollectionId({ target: { value: res.edition.collectionId } })
            setEditionId(res.edition.id);
          }
        });
      }
      if (status === "edit") {
        setAlertText("Volume updated");
        setAlertErrorText("Volume update failed");
        setTitle("EDIT VOLUME");
        setSubtitle("Edit volume details");
      }
      
    }
    
  }, []);

  const handleChangeCollectionId = async (event: any) => {
    const value = event.target.value;
    setCollectionId(value);
    setEditionId(0);
    if (value !== 0) {
      await EditionService.getWhereCollectionId(value).then((value) =>
        setEditionList(value)
      );
    } else {
      setEditionList([]);
    }
  };

  const handleFormSubmit = async (values: any, resetForm: any) => {
    if (status === "create") {
      values = functionHelper.setEmptyToUndefined(values);
      values.createDate= dayjs(new Date()).format("YYYY-MM-DD");
      values.followNumber= 0;
      values.image = image === "#" ? undefined : image;
      values.editionId = editionId ? editionId : undefined;
      if (values.releaseDate) {
        values.releaseDate = dayjs(values.releaseDate).format("YYYY-MM-DD");
      }
      (await VolumeService.create(values, accessToken ? accessToken : '')) === false
        ? setAlertError(true)
        : (resetForm({ initialValues }), setAlert(true));
    } else if(status === "edit") {  
      values.editionId = editionId ? editionId : undefined;  
      values = functionHelper.formatEditPatch(values, initialValues, image);
      if (!values) return;
      if (values.releaseDate) {
        values.releaseDate = dayjs(values.releaseDate).format("YYYY-MM-DD");
      }
      (await VolumeService.update(id ? +id : 0, values, accessToken ? accessToken : '')) === false
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
    collection,
    editionList,
    setEditionId,
    handleChangeCollectionId,
    collectionId,
    editionId,
    image,
    setImage,
    alert,
    setAlert,
    alertError,
    setAlertError,
    handleFormSubmit,
  };
};

export default useVolumeEdit;
