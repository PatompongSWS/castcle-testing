export interface User {
  id: string;
  type: string;
  castcleId: string;
  displayName: string;
  email: string;
  avatar: string;
  preferredLanguage: Array<string>
  role: string;
  verified: boolean;
  password: string;
}