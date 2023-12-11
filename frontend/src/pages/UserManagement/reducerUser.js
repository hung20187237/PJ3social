import produce from 'immer';
import {
  GET_LIST_USER,
  GET_LIST_USER_SUCCESS,
  GET_LIST_ROLE_GROUP_ACTIVE,
  GET_LIST_ROLE_GROUP_ACTIVE_SUCCESS,
  GET_LIST_HISTORY_SUCCESS,
  UPDATE_PASSWORD,
  UPDATE_PASSWORD_SUCCESS,
  SEARCH_EASY_USER,
  SEARCH_EASY_USER_SUCCESS,
  ADVANCE_SEARCH_USER,
  ADVANCE_SEARCH_USER_SUCCESS, GET_LIST_DEPARTMENT_SUCCESS, GET_LIST_POSITION_SUCCESS,
} from './contantsUser';
export const initialState = {
  isLoading: false,
  isBeginRequest: false,
  listUser: [],
  totalCount: 0,
  listRoleGroupActive: [],
  listHistory: [],
  listDepartment: [],
  listPosition: [],
};

/* eslint-disable default-case, no-param-reassign */
const userReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SEARCH_EASY_USER:
      case ADVANCE_SEARCH_USER:
      case GET_LIST_USER:
        draft.isBeginRequest = true;
        // draft.isLoading = true;
        break;

      case SEARCH_EASY_USER_SUCCESS:
      case ADVANCE_SEARCH_USER_SUCCESS:
      case GET_LIST_USER_SUCCESS:
        draft.isBeginRequest = false;
        // draft.isLoading = false;
        draft.listUser = action.data.data;
        draft.totalCount = action.data.total;
        break;
      case GET_LIST_DEPARTMENT_SUCCESS:
        draft.isBeginRequest = false;
        draft.listDepartment = action.data;
        break;

      case GET_LIST_POSITION_SUCCESS:
        draft.isBeginRequest = false;
        draft.listPosition = action.data;
        break;

      case GET_LIST_ROLE_GROUP_ACTIVE:
        draft.isBeginRequest = true;
        break;
      case GET_LIST_ROLE_GROUP_ACTIVE_SUCCESS:
        draft.isBeginRequest = false;
        draft.listRoleGroupActive = action.data;
        break;
      case GET_LIST_HISTORY_SUCCESS:
        draft.listHistory = action.data;
        break;
      case UPDATE_PASSWORD_SUCCESS:
        draft.isBeginRequest = false;
        break;
      case UPDATE_PASSWORD:
        draft.isBeginRequest = false;
        break;
    }
  });

export default userReducer;
