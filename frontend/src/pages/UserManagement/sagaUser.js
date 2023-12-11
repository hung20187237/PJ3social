import { call, put, takeLatest } from 'redux-saga/effects';
import { axiosGet, axiosPost, axiosPostNoCheck } from '../../../../utils/request';
import * as actions from './actionsUser';
import * as constants from './contantsUser';

export function* getUserList() {
  const path = `/AccountUser/GetList`;
  try {
    const res = yield call(axiosGet, path);
    if (res.data) {
      yield put(actions.getListUserSuccess(res.data.object));
    } else {
      yield put(actions.requestFalse());
    }
  } catch (error) {
    yield put(actions.requestFalse());
  }
}
export function* getListRoleGroupActive(action) {
  const path = `/RoleGroup/GetListByActive`;
  try {
    const res = yield call(axiosGet, path);
    if (res.data) {
      yield put(actions.getListRoleGroupActiveSucess(res.data.object));
      action.callback(res.data);
    } else {
      yield put(actions.requestFalse());
    }
  } catch (error) {
    yield put(actions.requestFalse());
  }
}

export function* getDepartmentList(action) {
  const path = `/AccountDept/GetList`;
  try {
    const res = yield call(axiosGet, path);
    if (res.data) {
      yield put(actions.getListDepartmentSuccess(res.data.object));
      action.callback(res.data.object);
    }
  } catch (e) {
    yield put(actions.requestFalse());
  }
}

export function* getListPosition(action) {
  const path = `/AccountPosition/GetList`;
  try {
    const res = yield call(axiosGet, path);
    if (res.data) {
      yield put(actions.getListPositionSuccess(res.data.object));
      action.callback(res.data.object);
    }
  } catch (e) {
    yield put(actions.requestFalse());
  }
}

export function* addUser(action) {
  const path = `/AccountUser/InsertUpdate`;
  try {
    const res = yield call(axiosPostNoCheck, path, action.body);
    if (res.data) {
      yield put(actions.addUserSuccess(res.data));
      action.callback(res);
    }
  } catch (e) {
    yield put(actions.requestFalse());
  }
}

export function* getHistory(action) {
  const path = `/Common/GetListHistory`;
  try {
    const res = yield call(axiosPost, path, action.body);
    if (res.data.isOk === true) {
      if (res.data.object.data) {
        yield put(actions.getListHistorySuccess(res.data.object.data));
      } else {
        yield put(actions.getListHistorySuccess(null));
      }
    } else {
      yield put(actions.getListHistorySuccess(null));
      yield put(actions.requestFalse());
    }
  } catch (error) {
    yield put(actions.requestFalse());
  }
}

export function* updatePassword(action) {
  const path = `/AccountUser/UpdatePassword`;
  try {
    const res = yield call(axiosPost, path, action.body);
    if (res.data) {
      yield put(actions.updatePasswordSuccess());
      action.callback(res.data.isOk);
    } else {
      yield put(actions.requestFalse());
    }
  } catch (e) {
    yield put(actions.requestFalse());
  }
}

export function* searchEasyUser(action) {
  const path = `/AccountUser/GetListEasySearch`;
  try {
    const res = yield call(axiosPostNoCheck, path, action.body);
    if (res.data.isOk) {
      yield put(actions.searchEasyUserSuccess(res.data.object));
      action.callback(res);
    } else {
      yield put(actions.requestFalse());
    }
  } catch (e) {
    yield put(actions.requestFalse());
  }
}

export function* advanceSearch(action) {
  const path = `/AccountUser/GetListAdvancedSearch`;
  try {
    const res = yield call(axiosPost, path, action.body);
    if (res.data.isOk) {
      yield put(actions.advanceSearchUserSuccess(res.data.object));
    } else {
      yield put(actions.requestFalse());
    }
  } catch (e) {
    yield put(actions.requestFalse());
  }
}

export function* deleteUserByID(action) {
  const path = `/AccountUser/Delete`;
  try {
    const res = yield call(axiosPost, path, action.body);
    if (res.data.isOk) {
      action.callback(res);
    } else {
      yield put(actions.requestFalse());
    }
  } catch (e) {
    yield put(actions.requestFalse());
  }
}

export function* checkExistName(action) {
  const path = `/AccountUser/CheckExistUserName?UserName=${action.body.userName}&Id=00000000-0000-0000-0000-000000000000`;
  try {
    const res = yield call(axiosGet, path);
    if (res) {
      action.callback(res);
    } else {
    }
  } catch (e) {
    yield put(actions.requestFalse());
  }
}

export default function* watchFetchMonitor() {
  yield takeLatest(constants.GET_LIST_USER, getUserList);
  yield takeLatest(constants.GET_LIST_ROLE_GROUP_ACTIVE, getListRoleGroupActive);
  yield takeLatest(constants.GET_LIST_DEPARTMENT, getDepartmentList);
  yield takeLatest(constants.GET_LIST_POSITION, getListPosition);
  yield takeLatest(constants.ADD_USER, addUser);
  yield takeLatest(constants.GET_LIST_HISTORY, getHistory);
  yield takeLatest(constants.UPDATE_PASSWORD, updatePassword);
  yield takeLatest(constants.SEARCH_EASY_USER, searchEasyUser);
  yield takeLatest(constants.ADVANCE_SEARCH_USER, advanceSearch);
  yield takeLatest(constants.DELETE_USER, deleteUserByID);
  yield takeLatest(constants.CHECK_EXIST_NAME, checkExistName);
}
