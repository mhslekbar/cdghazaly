export enum PermissionType {
  SHOW_PERMISSIONS = "SHOW_PERMISSIONS",
  ADD_PERMISSION = "ADD_PERMISSION",
  EDIT_PERMISSION = "EDIT_PERMISSION",
  DELETE_PERMISSION = "DELETE_PERMISSION",
}

export enum PermissionStatus {
  START = "START",
  SUCCESS = "SUCCESS",
  FAILURE = "FAILURE"
}

export interface ShowPermissionsAction {
  type: {
    name: string,
    method: PermissionType.SHOW_PERMISSIONS
  },
  status: string,
  payload?: string[]
}

export interface AddPermissionAction {
  type: {
    name: string,
    method: PermissionType.ADD_PERMISSION
  },
  status: string,
  payload?: string[]
}

export interface EditPermissionAction {
  type: {
    name: string,
    method: PermissionType.EDIT_PERMISSION
  },
  status: string,
  payload?: string[]
}

export interface DeletePermissionAction {
  type: {
    name: string,
    method: PermissionType.DELETE_PERMISSION
  },
  status: string,
  payload?: string[]
}

export type PermissionAction = ShowPermissionsAction | AddPermissionAction | EditPermissionAction | DeletePermissionAction