import Volume from "./volume.type";
enum Role {
  User = 'user',
  Admin = 'admin',
}

type User = {
  id: number;
  name: string;
  surname: string;
  email: string;
  password: string;
  picture: string;
  registrationDate: Date;
  dateOfBirth: Date;
  role: Role;
  countVolume: number;
  countVolumeRead: number;
  gender: string;
  wishist: Volume[];
}

export default User;
