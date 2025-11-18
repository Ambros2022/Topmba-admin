export type ErrCallbackType = (err: { [key: string]: string }) => void

export type LoginParams = {
  email: string
  password: string
  rememberMe?: boolean
}

export type ForgotPasswordParams = {
  email: string
}
export type handelVerifyemailOtpParams = {
  email: string
  otp: any
}
export type handelhandelResetPasswordParams = {
  email: string
  otp: any
  newPassword: string
}

export type UserDataType = {
  token(arg0: string, token: any, arg2: { expires: number }): unknown
  id: number
  role: string
  email: string
  fullName: string
  username: string
  password: string
  avatar?: string | null
}

export type AuthValuesType = {
  // isAuthenticated<T>(isAuthenticated: any): [any, any]
  VerifyemailOtp: (params: handelVerifyemailOtpParams, errorCallback?: ErrCallbackType) => Promise<void>
  ResetPassword: (params: handelhandelResetPasswordParams, errorCallback?: ErrCallbackType) => Promise<void>
  loading: boolean
  logout: () => void
  permission: any
  isAuthenticated: boolean
  user: UserDataType | null
  setLoading: (value: boolean) => void
  setUser: (value: UserDataType | null) => void
  login: (params: LoginParams, errorCallback?: ErrCallbackType) => void
  ForgotPassword: (params: ForgotPasswordParams, errorCallback?: ErrCallbackType) => Promise<void>
  stateId: string | null
  setStateId: any
  cityId: string | null
  setCityId: any
  streamId: string | null
  setStreamId: any
}
