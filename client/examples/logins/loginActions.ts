export enum ActionType {
  LOGIN = "login"
}

export enum actionStatus {
  START = "start",
  SUCCESS = "success",
  FAILURE = "failure"
}

interface loginAction {
  type: ActionType.LOGIN,
  status: string,
  payload?: string[]
}

export type Action = loginAction
