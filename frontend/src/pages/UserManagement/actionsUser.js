import {
  GET_LIST_USER,
  GET_LIST_USER_SUCCESS,
  REQUEST_FALSE,
  GET_LIST_ROLE_GROUP_ACTIVE,
  GET_LIST_ROLE_GROUP_ACTIVE_SUCCESS,
  GET_LIST_DEPARTMENT,
  GET_LIST_POSITION,
  ADD_USER,
  ADD_USER_SUCCESS,
  GET_LIST_HISTORY,
  GET_LIST_HISTORY_SUCCESS,
  UPDATE_PASSWORD,
  UPDATE_PASSWORD_SUCCESS,
  SEARCH_EASY_USER,
  SEARCH_EASY_USER_SUCCESS,
  ADVANCE_SEARCH_USER,
  ADVANCE_SEARCH_USER_SUCCESS,
  GET_LIST_DEPARTMENT_SUCCESS,
  GET_LIST_POSITION_SUCCESS, DELETE_USER, CHECK_EXIST_NAME,
} from './contantsUser';

export function getListUser() {
  return {
    type: GET_LIST_USER,
  };
}

export function getListUserSuccess(data) {
  return {
    type: GET_LIST_USER_SUCCESS,
    data,
  };
}

export function requestFalse() {
  return {
    type: REQUEST_FALSE,
  };
}

export function getListRoleGroupActive(body, callback) {
  return {
    type: GET_LIST_ROLE_GROUP_ACTIVE,
    body,
    callback,
  };
}

export function getListRoleGroupActiveSucess(data) {
  return {
    type: GET_LIST_ROLE_GROUP_ACTIVE_SUCCESS,
    data,
  };
}

export function getListDepartment(body, callback) {
  return {
    type: GET_LIST_DEPARTMENT,
    body,
    callback,
  };
}

export function getListDepartmentSuccess(data) {
  return {
    type: GET_LIST_DEPARTMENT_SUCCESS,
    data,
  };
}

export function getListPosition(body, callback) {
  return {
    type: GET_LIST_POSITION,
    body,
    callback,
  };
}

export function getListPositionSuccess(data) {
  return {
    type: GET_LIST_POSITION_SUCCESS,
    data,
  };
}

export function addUser(body, callback) {
  return {
    type: ADD_USER,
    body,
    callback,
  };
}

export function addUserSuccess(data) {
  return {
    type: ADD_USER_SUCCESS,
    data,
  };
}

export function getListHistory(body) {
  return {
    type: GET_LIST_HISTORY,
    body,
  };
}

export function getListHistorySuccess(data) {
  return {
    type: GET_LIST_HISTORY_SUCCESS,
    data,
  };
}

export function updatePassword(body, callback) {
  return {
    type: UPDATE_PASSWORD,
    body,
    callback,
  };
}

export function updatePasswordSuccess() {
  return {
    type: UPDATE_PASSWORD_SUCCESS,
  };
}

export function searchEasyUser(body, callback) {
  return {
    type: SEARCH_EASY_USER,
    body,
    callback,
  };
}

export function searchEasyUserSuccess(data) {
  return {
    type: SEARCH_EASY_USER_SUCCESS,
    data,
  };
}

export function advanceSearchUser(body) {
  return {
    type: ADVANCE_SEARCH_USER,
    body,
  };
}

export function advanceSearchUserSuccess(data) {
  return {
    type: ADVANCE_SEARCH_USER_SUCCESS,
    data,
  };
}

export function deleteUser(body, callback) {
  return {
    type: DELETE_USER,
    body,
    callback,
  };
}

export function checkExistUserName(body, callback) {
  return {
    type: CHECK_EXIST_NAME,
    body, callback,
  }
}
