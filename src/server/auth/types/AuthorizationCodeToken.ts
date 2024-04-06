export interface AuthorizationCodeToken {
  userId: string;
  clientId: string;
  redirectUri: string;
  scope: string;
}
