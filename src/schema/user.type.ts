import Volume from "./volume.type";
enum Role {
  User = 'user',
  Admin = 'admin',
}

type User = {
  id?: number;
  name: string;
  surname: string;
  email: string;
  password?: string;
  picture: string;
  registrationDate?: Date | string;
  dateOfBirth: Date | string;
  role: Role;
  countVolume?: number;
  countVolumeRead?: number;
  gender: string;
  wishList?: Volume[];
}

export default User;
