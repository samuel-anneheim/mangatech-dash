import Collection from "./collection.type";

type Category = {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
  collections: Collection[];
  countCollections: number;
}

export default Category;
