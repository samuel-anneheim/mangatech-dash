import Edition from "./edition.type";

type Volume = {
  id?: number;
  title: string;
  number: number;
  releaseDate: string | Date;
  createDate?: Date | string;
  image: string;
  resume: string;
  nbrPages: number;
  price: number;
  visibility: boolean;
  followNumber?: number;
  edition?: Edition;
  editionId: number;
  slug?: string;
}

export default Volume;
