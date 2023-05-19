import { useEffect, useState } from "react";
import functionHelper from "../../utils/functionHelper";
import Collection from "../../schema/collection.type";
import CollectionService from "../../api/services/Collection.Service";
import dayjs from "dayjs";
import Editor from "../../schema/editor.type";
import Category from "../../schema/category.type";
import Author from "../../schema/author.type";
import Tag from "../../schema/tag.type";
import EditorService from "../../api/services/Editor.service";
import CategoryService from "../../api/services/Category.service";
import AuthorService from "../../api/services/Author.service";
import TagService from "../../api/services/Tag.service";

const useCollectionEdit = (status: string, id?: number) => {
  const [initialValues, setInitialValues] = useState<Collection>({
    title: "",
    image: "#",
    releaseDate: "",
    resume: "",
    isFinish: false,
    visibility: false,
    editorId: 0,
    categoryId: 0,
    authorId: 0,
    tagsId: [],
  } as Collection);
  const [alertText, setAlertText] = useState<string>("SUCCESS ALERT");
  const [alertErrorText, setAlertErrorText] = useState<string>("ERROR ALERT");
  const [title, setTitle] = useState<string>("VIEW COLLECTION");
  const [subtitle, setSubtitle] = useState<string>("View collection details");
  const [image, setImage] = useState<string>("#");

  const [editor, setEditor] = useState<Editor[]>([]);
  const [category, setCategory] = useState<Category[]>([]);
  const [author, setAuthor] = useState<Author[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    EditorService.list().then((data) => setEditor(data));
    CategoryService.list().then((data) => setCategory(data));
    AuthorService.list().then((data) => setAuthor(data));
    TagService.list().then((data) => setTags(data));
    if (status === "create") {
      setAlertErrorText("Collection creation failed");
      setAlertText("Collection created");
      setTitle("CREATE COLLECTION");
      setSubtitle("Create a new collection");
      setInitialValues({ ...initialValues,  createDate: dayjs(new Date()).format("YYYY-MM-DD")});
    } else {
      if (id) {
        CollectionService.getOne(id).then((res) => {
          setInitialValues({...functionHelper.formatEdtiForm(res), tagsId: res.tags?.map((tag: Tag) => tag.id)});

          res.image && setImage(res.image);
        });
      }
      if (status === "edit") {
        setAlertText("Collection updated");
        setAlertErrorText("Collection update failed");
        setTitle("EDIT COLLECTION");
        setSubtitle("Edit collection details");
      }
    }
  }, []);

  return { initialValues, alertErrorText, alertText, title, subtitle, image, setImage, editor, category, author, tags };
};

export default useCollectionEdit;
