export type PayloadRole = {
  id: number;
  roleName: string;
  permissions: { id: number; permissionName: string }[];
}[];
export type JwtPayload = {
  id: number;
  email: string;
  role: PayloadRole;
};
