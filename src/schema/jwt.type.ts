type Jwt = {
  username: string;
  roles: string;
  sub: number;
  exp: number;
  iat: number;
}

export default Jwt;