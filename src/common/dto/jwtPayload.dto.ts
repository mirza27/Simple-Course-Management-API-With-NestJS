export interface JwtPayload {
  userId: number;
  name: string;
  email: string;
  role: string;
  expiredAt: string | Date;
}
