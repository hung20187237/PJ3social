import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import HistoryModal from '../../../../../../res/components/HistoryModal';
import * as actions from '../../actionsUser';
import * as selectors from '../../selectorsUser';
import { useInjectSaga } from '../../../../../../utils/injectSaga';
import saga from '../../sagaUser';
import { useInjectReducer } from '../../../../../../utils/injectReducer';
import reducer from '../../reducerUser';
import { REDUX_KEY } from '../../../../../../utils/constants';
const key = REDUX_KEY.user;

const HistoryUser = ({ onClose, objectGuid, titleHistory, visible }) => {
  useInjectSaga({ key, saga });
  useInjectReducer({ key, reducer });
  const dispatch = useDispatch();

  useEffect(() => {
    if (visible) {
      if (objectGuid) {
        const body = {
          objectGuid,
          pageNumber: 50,
          pageSize: 10,
        };
        dispatch(actions.getListHistory(body));
      }
    }
  }, [objectGuid, visible]);

  const listHistory = useSelector(selectors.selectHistory());
  const isBeginRequest = useSelector(selectors.selectLoading());

  return (
    <div>
      <HistoryModal
        onClose={onClose}
        isLoading={isBeginRequest}
        title={titleHistory}
        dataHistory={listHistory}
        visible={visible}
        prioty={3}
      />
    </div>
  );
};

HistoryUser.propTypes = {
  onClose: PropTypes.func,
  objectGuid: PropTypes.string,
  titleHistory: PropTypes.string,
  visible: PropTypes.bool,
};

export default HistoryUser;
