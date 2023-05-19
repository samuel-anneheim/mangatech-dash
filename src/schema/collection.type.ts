import Author from "./author.type";
import Category from "./category.type";
import Editor from "./editor.type";
import Tags from "./tag.type";

type Collection = {
  id?: number;
  title: string;
  slug?: string;
  image: string;
  releaseDate: string | Date;
  createDate?: string;
  isFinish: boolean;
  visibility: boolean;
  resume: string;
  followNumber?: number;
  author?: Author;
  category?: Category;
  editor?: Editor;
  tags?: Tags[];
  tagsId?: number[];
  authorId: number;
  categoryId: number;
  editorId: number;
}

export default Collection;
