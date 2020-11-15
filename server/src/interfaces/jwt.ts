export interface AuthInfo {
  uid: string
  picture: string
  nickname: string
  sex: number
  isAdmin: boolean
}

export interface JwtAuthInfo extends AuthInfo {
  iat: number
  exp: number
}
