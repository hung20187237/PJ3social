import { REDUX_KEY } from '../../../../utils/constants';
export const GET_LIST_USER = `${REDUX_KEY.user}/GET_LIST_USER`;
export const GET_LIST_USER_SUCCESS = `${REDUX_KEY.user}/GET_LIST_USER_SUCCESS`;
export const REQUEST_FALSE = `${REDUX_KEY.user}/REQUEST_FALSE`;
export const GET_LIST_ROLE_GROUP_ACTIVE = `${REDUX_KEY.user}/GET_LIST_ROLE_GROUP_ACTIVE`;
export const GET_LIST_ROLE_GROUP_ACTIVE_SUCCESS = `${REDUX_KEY.user}/GET_LIST_ROLE_GROUP_ACTIVE_SUCCESS`;
export const GET_LIST_DEPARTMENT = `${REDUX_KEY.user}/GET_LIST_DEPARTMENT`;

export const GET_LIST_DEPARTMENT_SUCCESS = `${REDUX_KEY.user}/GET_LIST_DEPARTMENT_SUCCESS`;

export const GET_LIST_POSITION = `${REDUX_KEY.user}/GET_LIST_POSITION`;

export const GET_LIST_POSITION_SUCCESS = `${REDUX_KEY.user}/GET_LIST_POSITION_SUCCESS`;

export const ADD_USER = `${REDUX_KEY.user}/ADD_USER`;

export const ADD_USER_SUCCESS = `${REDUX_KEY.user}/ADD_USER_SUCCESS`;

export const GET_LIST_HISTORY = `${REDUX_KEY.user}/GET_LIST_HISTORY`;

export const GET_LIST_HISTORY_SUCCESS = `${REDUX_KEY.user}/GET_LIST_HISTORY_SUCCESS`;

export const UPDATE_PASSWORD = `${REDUX_KEY.user}/UPDATE_PASSWORD`;

export const UPDATE_PASSWORD_SUCCESS = `${REDUX_KEY.user}/UPDATE_PASSWORD_SUCCESS`;

export const SEARCH_EASY_USER = `${REDUX_KEY.user}/SEARCH_EASY_USER`;

export const SEARCH_EASY_USER_SUCCESS = `${REDUX_KEY.user}/SEARCH_EASY_USER_SUCCESS`;

export const ADVANCE_SEARCH_USER = `${REDUX_KEY.user}/ADVANCE_SEARCH_USER`;

export const ADVANCE_SEARCH_USER_SUCCESS = `${REDUX_KEY.user}/ADVANCE_SEARCH_USER_SUCCESS`;

export const DELETE_USER = `${REDUX_KEY.user}/DELETE_USER`;

export const CHECK_EXIST_NAME = `${REDUX_KEY.user}/CHECK_EXIST_NAME`;

export const LIST_STATUS_TYPE = [
  {
    value: '-1',
    label: 'Tất cả',
  },
  {
    value: '1',
    label: 'Đang hoạt động',
  },
  {
    value: '0',
    label: 'Không hoạt động',
  },
];

export const DEFAULT_PARAM_EASY_SEARCH = {
  currentPage: 1,
  pageSize: 50,
  textSearch: '',
  objectID: '0',
  objectCategory: 0,
};

export const DEFAULT_PARAM_ADVANCE_SEARCH_PARTNER = {
  textSearch: '',
  userId: '00000000-0000-0000-0000-000000000000',
  departmentId: '00000000-0000-0000-0000-000000000000',
  positionId: '00000000-0000-0000-0000-000000000000',
  rolegroupId: 0,
  isActive: 1,
  objectID: '',
  objectCategory: 0,
  companyId: '',
  pageSize: 50,
  currentPage: 1,
};
