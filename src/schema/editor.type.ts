import Collection from "./collection.type";

type Editor = {
  id: number;
  name: string;
  logo: string;
  description: string;
  officialWebsite: string;
  collections: Collection[];
  slug: string;
  countCollections: number;
}

export default Editor;
