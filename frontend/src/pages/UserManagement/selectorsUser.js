import { createSelector } from 'reselect';
import { REDUX_KEY } from '../../../../utils/constants';
import { initialState } from './reducerUser';

export const selectUser = state => state[REDUX_KEY.user] || initialState;

export const selectListUser = () =>
  createSelector(
    selectUser,
    state => state.listUser,
  );

export const selectHistory = () =>
  createSelector(
    selectUser,
    state => state.listHistory,
  );

export const selectTotalAccount = () =>
  createSelector(
    selectUser,
    state => state.totalCount,
  );

export const selectLoading = () =>
  createSelector(
    selectUser,
    state => state.isLoading,
  );

export const selectListRoleGroupAcitve = () =>
  createSelector(
    selectUser,
    state => state.listRoleGroupActive,
  );

export const selectListPosition = () =>
  createSelector(
    selectUser,
    state => state.listPosition,
  );

export const selectListDepartment = () =>
  createSelector(
    selectUser,
    state => state.listDepartment,
  );

export const selectBeginRequest = () =>
  createSelector(
    selectUser,
    state => state.isBeginRequest,
  );
