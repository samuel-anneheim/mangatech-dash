import Collection from "./collection.type";
import Volume from "./volume.type";

type Edition = {
  id: number;
  name: string;
  collection: Collection;
  volumes: Volume[];
  collectionId: Number;
  slug: string;
}

export default Edition;
