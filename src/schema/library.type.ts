import User from "./user.type";
import Volume from "./volume.type";

type Library = {
  id: number;
  isRead: boolean;
  volume: Volume;
  user: User;
  volumeId: number;
  userId: number;
}

export default Library;
