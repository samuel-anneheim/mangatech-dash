import Edition from "./edition.type";
import Library from "./library.type";

type Volume = {
  id: number;
  title: string;
  number: number;
  releaseDate: Date;
  createDate: Date;
  image: string;
  resume: string;
  nbrPages: number;
  price: number;
  visibility: boolean;
  followNumber: number;
  edition: Edition;
  editionId: number;
  libraries: Library[];
  slug: string;
}

export default Volume;
