export interface AccessTokenPayload {
  type: string;
  id: string;
  castcleId: string;
  displayName: string;
  email: string;
  avatar: string;
  preferredLanguage: Array<string>
  role: string;
  verified: boolean;
  showAds: boolean;
  pages: Array<Page>;
  accessTokenExpiresTime: Date;
}

export interface RefreshTokenPayload {
  id: string;
  role: string;
  refreshTokenExpiresTime: Date;
}

export interface AccessTokenPayloadGuest {
  id: string;
  preferredLanguage: Array<string>
  role: string;
  accessTokenExpiresTime: Date;
}

export interface VerifyTokenPayload {
  id: string;
  verifyTokenExpiresTime: Date;
}

export interface Page {
  type: string;
  id: string;
  castcleId: string;
  displayName: string;
  avatar: string;
  role: string;
  verified: boolean;
}