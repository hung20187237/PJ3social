import React, { useEffect, useState } from 'react';
import { Dropdown, Form, Menu, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'antd/es/form/Form';
import PropTypes from 'prop-types';
import loadingIcon from '../../../../images/loading.svg';
import BoldItalyHeader from '../../../../res/components/TableOtherView/BoldItalyHeader';
import BoldItaly from '../../../../res/components/TableOtherView/BoldItaly';
import TableFunction from '../../../../res/components/TableOtherView/TableFunction';
import {
  AdvanceSearchWrapper,
  CloseAdvanceView,
  Content,
  ContentAdvanceView,
  ContentBody,
  ContentHeader,
  ContentTable,
  ContentTitle,
  ContentWrapper,
  HeaderAdvanceView,
  HeaderLeft,
  HeaderRight,
  TitleAdvance,
} from '../../../../res/commonStyles';
import Button from '../../../../res/components/Button';
import Table from '../../../../res/components/Table';
import { LineDiv, Icon, Content as ContentStyles } from './styles';
import { useInjectSaga } from '../../../../utils/injectSaga';
import reducer from './reducerUser';
import saga from './sagaUser';
import * as actions from './actionsUser';
import * as selectors from './selectorsUser';
import { REDUX_KEY } from '../../../../utils/constants';
// eslint-disable-next-line import/named
import { DEFAULT_PARAM_EASY_SEARCH, LIST_STATUS_TYPE, DEFAULT_PARAM_ADVANCE_SEARCH_PARTNER } from './contantsUser';
import { useInjectReducer } from '../../../../utils/injectReducer';
import iconUpload from '../../../../images/iconUpLoad.svg';
import AddUser from './component/AddUser';
import InfoUserPopup from './component/InforUserPopup';
import EditUser from './component/EditUser';
import ChangePassword from './component/ResetPassword';
import RenderPBCV from './component/RenderPBCv';
import { CURRENT_PAGE, PAGE_SIZE } from '../../../Partner/constantsPartner';
import advanceIcon from '../../../../images/iconAdvance.svg';
import refreshAdvanceIcon from '../../../../images/iconRefeshAdvance.svg';
import closeAdvanceIcon from '../../../../images/iconClose.svg';
import SelectFloat from '../../../../res/components/FloatingLabel/SelectFloat';
import { Loading } from '../../../Profile/stylesProfile';
import { formatPhoneNumber, getTimeNow } from '../../../../res/commonFunction';
import FloatingTree from '../../../../res/components/FloatingLabel/FloatingTree/FloatingTree';
import BoldItalyTag from '../../../../res/components/TableOtherView/BoldItalyTag';
import HistoryModal from "../../../../res/components/HistoryModal";
const key = REDUX_KEY.user;
function getItem(key, title, value, children) {
  return { key, title, value, children };
}
const UserManagement = ({ textSearch, objectId, categoryId, showAdvanceSearch, onCloseAdvanceSearch, fCome }) => {
  const [status, setStatus] = useState('1');
  const [roleType, setRoleType] = useState('0');
  const [form] = useForm();
  useInjectSaga({ key, saga });
  useInjectReducer({ key, reducer });
  const dispatch = useDispatch();
  const [dataEasySearch, setDataEasySearch] = useState(DEFAULT_PARAM_EASY_SEARCH);
  const [dataAdvanceSearch, setDataAdvanceSearch] = useState(DEFAULT_PARAM_ADVANCE_SEARCH_PARTNER);
  const loading = useSelector(selectors.selectLoading());
  const isBeginRequest = useSelector(selectors.selectBeginRequest());

  // Phong ban
  const [dept, setDept] = useState('');
  // Chuc vu
  const [position, setPosition] = useState('');
  const [dataUser, setDataUser] = useState({});
  const [openPopupInfoUser, setOpenPopupInfoUser] = useState(false);
  const [showEditPosition, setShowEditPosition] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showChangePass, setShowChangePass] = useState(false);
  const [idUserSelected, setIdUserSelected] = useState('');
  const [listRoleGroup, setListRoleGroup] = useState([]);
  const [listDepartment, setListDepartment] = useState([]);
  const [listPosition, setLisPosition] = useState([]);

  const [page, setPage] = useState(1);

  // gan co: khi lan dau vao thi k cho call advanceSearch
  const [f, setF] = useState(false);

  const [fTurn, setFTurn] = useState(false);

  const totalcount = useSelector(selectors.selectTotalAccount());
  // Param advance thay doi khi chon
  useEffect(() => {
    setF(true);
    if (showAdvanceSearch && f) {
      const body = {
        ...DEFAULT_PARAM_ADVANCE_SEARCH_PARTNER,
        departmentId: dept === '' ? '00000000-0000-0000-0000-000000000000' : dept,
        positionId: position === '' ? '00000000-0000-0000-0000-000000000000' : position,
        isActive: status,
        rolegroupId: roleType,
      };
      dispatch(actions.advanceSearchUser(body));
      setPage(1);
    }
  }, [dept, position, status, roleType, showAdvanceSearch]);

  const { t } = useTranslation();

  const listUser = useSelector(selectors.selectListUser());

  const refreshT = () => {
    if (showAdvanceSearch) {
      dispatch(
        actions.advanceSearchUser({
          ...dataAdvanceSearch,
          isActive: status,
          rolegroupId: roleType,
          departmentId: dept === '' ? '00000000-0000-0000-0000-000000000000' : dept,
          positionId: position === '' ? '00000000-0000-0000-0000-000000000000' : position,
        }),
      );
    } else {
      dispatch(actions.searchEasyUser(DEFAULT_PARAM_EASY_SEARCH));
    }
  };

  useEffect(() => {
    setFTurn(false);
    dispatch(
      actions.getListDepartment({}, res => {
        if (res) {
          setListDepartment(res);
        }
      }),
    );

    dispatch(
      actions.getListPosition({}, res => {
        if (res) {
          setLisPosition(res);
        }
      }),
    );

    dispatch(
      actions.getListRoleGroupActive({}, res => {
        setListRoleGroup(listRoleGroupTemp);
        const listRoleGroupTemp = [{ value: '0', label: t('common.all') }];
        if (res && res.object) {
          // eslint-disable-next-line array-callback-return
          res.object.map(item => {
            // // eslint-disable-next-line no-param-reassign
            // item.value = item.roleGroupID;
            // // eslint-disable-next-line no-param-reassign
            // item.label = item.roleGroupName;
            const body = new Object();
            // eslint-disable-next-line no-param-reassign
            body.value = item.roleGroupID;
            // eslint-disable-next-line no-param-reassign
            body.label = item.roleGroupName;
            listRoleGroupTemp.push(body);
          });
        }
        setListRoleGroup(listRoleGroupTemp);
      }),
    );
  }, []);

  const treeData = list => {
    const data = [];
    if (list && list.length > 0) {
      Object.values(list).forEach(item => {
        if (item.parentID === '00000000-0000-0000-0000-000000000000') {
          data.push(getItem(item.id, item.name, item.id, recursiveItem(item.id, list)));
        }
      });
    }
    return data;
  };

  const recursiveItem = (id, list) => {
    const data = [];
    list.forEach(item1 => {
      if (id === item1.parentID) {
        data.push(getItem(item1.id, item1.name, item1.id, recursiveItem(item1.id, list)));
      }
    });
    return data;
  };

  const TABLE_ACCOUNT = [
    {
      title: t('common.sttColumnTitle'),
      dataIndex: 'stt',
      key: 'stt',
      width: 90,
      align: 'center',
      render: (text, record, index) =>
        showAdvanceSearch
          ? (dataAdvanceSearch.currentPage - 1) * dataAdvanceSearch.pageSize + index + 1
          : (dataEasySearch.currentPage - 1) * dataEasySearch.pageSize + index + 1,
    },
    {
      title: <BoldItalyHeader name1={t('userManagement.account')} isBold />,
      // title: t('partner.partnerType'),
      dataIndex: 'userName',
      key: 'userName',
      width: 170,
      render: (text, record) => <div>{record.userName}</div>,
    },
    {
      title: <BoldItalyHeader name1={t('userManagement.fullName')} isBold />,
      width: 200,
      dataIndex: 'fullName',
      key: 'fullName',
      render: (text, record) => <BoldItalyTag showTooltip name1={record.fullName} />,
    },
    {
      title: <BoldItalyHeader name1={t('userManagement.departmentRole')} isBold />,
      dataIndex: 'ltpersonContacts',
      key: 'ltpersonContacts',
      render: (text, record) => <RenderPBCV data={record} />,
    },
    {
      title: <BoldItalyHeader name1={t('userManagement.role')} isBold />,
      dataIndex: 'userNameCreated',
      key: 'userNameCreated',
      // render: (text, record) => RenderRole(record.roleGroupName),
      render: (text, record) => <BoldItalyTag showTooltip name1={record.roleGroupName} />,
    },
    {
      title: <BoldItalyHeader name1={t('userManagement.phoneNumber')} isBold />,
      dataIndex: 'mobile',
      key: 'mobile',
      width: 150,
      render: (text, record) => <BoldItaly name1={formatPhoneNumber(record.mobile)} />,
    },
    {
      title: t('common.status'),
      dataIndex: 'isActive',
      key: 'isActive',
      width: 170,
      render: (text, record) => (
        <TableFunction
          type="user"
          text={text}
          record={record}
          titleEdit={t('userManagement.tooltipEdit')}
          titleHistory={t('userManagement.tooltipHistory')}
          titleLock={t('userManagement.changePassword')}
          titleMeeting={t('userManagement.tooltipMeeting')}
          onClickEdit={() => {
            setShowEditPosition(true);
            setDataUser(record);
          }}
          onClickHistory={() => {
            setIdUserSelected(record.userID);
            setShowHistory(true);
          }}
          onClickLock={() => {
            setShowChangePass(true);
            setDataUser(record);
          }}
          onClickMeeting={() => {}}
          checkEdit={record.showButton.crud}
          checkViewHistory={record.showButton.viewHistory}
          checkLock={record.showButton.changePass}
        />
      ),
    },
  ];

  const onClickExport = () => {};

  const item = (
    <Menu
      items={[
        {
          key: '1',
          label: (
            <AddUser
              updateData={() => {
                refreshT();
              }}
            />
          ),
        },
        {
          key: '2',
          label: (
            <Tooltip title={t('userManagement.tooltipAddUserExcelDetail')} placement="left">
              {' '}
              <LineDiv onClick={() => {}}>
                {' '}
                <Icon src={iconUpload} alt="icon" /> <ContentStyles>{t('userManagement.tooltipAddUserExcel')}</ContentStyles>{' '}
              </LineDiv>{' '}
            </Tooltip>
          ),
        },
      ]}
    />
  );

  useEffect(() => {
    setPage(1);
  }, showAdvanceSearch);

  const onClickRow = data => {
    setDataUser(data);
    setOpenPopupInfoUser(true);
  };

  const onChangePagination = (dataPageSize, dataCurrentPage) => {
    if (showAdvanceSearch) {
      setPage(dataCurrentPage);
      setDataAdvanceSearch({
        ...dataAdvanceSearch,
        [PAGE_SIZE]: dataPageSize,
        [CURRENT_PAGE]: dataCurrentPage,
      });
    } else {
      setPage(dataCurrentPage);
      setDataEasySearch({
        ...dataEasySearch,
        [PAGE_SIZE]: dataPageSize,
        [CURRENT_PAGE]: dataCurrentPage,
      });
    }
  };

  useEffect(() => {
    setDataEasySearch({
      ...DEFAULT_PARAM_EASY_SEARCH,
      textSearch,
      objectCategory: categoryId,
      objectID: objectId || '0',
    });
  }, [textSearch, objectId, categoryId]);

  useEffect(() => {
    if (!showAdvanceSearch) {
      dispatch(actions.searchEasyUser(dataEasySearch));
    }
  }, [dataEasySearch]);

  const handleCloseAdvanceSearch = () => {
    onCloseAdvanceSearch();
    handleResetFilter();
    dispatch(actions.searchEasyUser(DEFAULT_PARAM_EASY_SEARCH));
  };

  const handleResetFilter = () => {
    form.resetFields();
    setStatus('1');
    setRoleType('0');
    setDept('');
    setPosition('');
  };

  const treePos = treeData(listPosition || []);
  const tProps = { treeDefaultExpandedKeys: [] };
  if (treePos.length > 0)
    treePos.map(item => {
      tProps.treeDefaultExpandedKeys.push(item.key);
    });

  const treeDept = treeData(listDepartment || []);
  const tPropsDept = { treeDefaultExpandedKeys: [] };
  if (treeDept.length > 0)
    treeDept.map(item => {
      tPropsDept.treeDefaultExpandedKeys.push(item.key);
    });

  const addRoot = list => [
    {
      key: '00000000-0000-0000-0000-000000000000',
      title: t('common.all'),
      value: '00000000-0000-0000-0000-000000000000',
      children: treeData(list),
    },
  ];

  return (
    <Content>
      <ContentWrapper>
        <ContentHeader>
          <HeaderLeft>
            <ContentTitle>
              {t('userManagement.listUserCount')}: {totalcount}
            </ContentTitle>
            {/* <ButtonCircle */}
            {/*  title={t('userManagement.tooltipExport')} */}
            {/*  placement="top" */}
            {/*  iconName="export-primary" */}
            {/*  onClick={onClickExport} */}
            {/*  enable */}
            {/* /> */}
          </HeaderLeft>
          <HeaderRight>
            <Dropdown overlay={item}>
              <Button
                iconName="add"
                type="primary"
                onClick={() => {
                  document.getElementById('addUser').click();
                }}
              >
                {t('common.addNew')}
              </Button>
            </Dropdown>
          </HeaderRight>
        </ContentHeader>
        <ContentBody>
          <ContentTable showAdvanceSearch={showAdvanceSearch}>
            <Table
              heightRow="48px"
              columns={TABLE_ACCOUNT}
              data={listUser}
              minWidth={1100}
              pagination
              isLoading={isBeginRequest}
              totalRecord={totalcount}
              onChangePagination={(size, current) => {
                onChangePagination(size, current);
              }}
              loadingIcon={loadingIcon}
              disableClickRowExpand
              onClickRow={onClickRow}
              // rowSelection
              cuurentPageEx={page}
            />
          </ContentTable>
          {showAdvanceSearch && (
            <AdvanceSearchWrapper style={{ width: 360 }}>
              <HeaderAdvanceView>
                <img alt="" src={advanceIcon} />
                <TitleAdvance>{t('common.advanceSearch')}</TitleAdvance>
                <Tooltip title={t('common.resetFilter')} onClick={handleResetFilter}>
                  <img
                    style={{ cursor: 'pointer', marginLeft: '5px', height: '24px', marginTop: '15px' }}
                    alt=""
                    src={refreshAdvanceIcon}
                  />
                </Tooltip>
                <CloseAdvanceView>
                  {loading ? (
                    <Loading />
                  ) : (
                    <Tooltip title={t('common.textClose')} onClick={handleCloseAdvanceSearch} placement="left">
                      <img src={closeAdvanceIcon} alt={t('common.Close')} style={{ cursor: 'pointer' }} />
                    </Tooltip>
                  )}
                </CloseAdvanceView>
              </HeaderAdvanceView>
              <ContentAdvanceView>
                <Form form={form}>
                  {/* Phòng ban */}
                  <Form.Item name="depatmentType">
                    <FloatingTree
                      showSearch
                      label={t('userManagement.department')}
                      defaultValue="00000000-0000-0000-0000-000000000000"
                      treeData={listDepartment.length > 0 ? addRoot(listDepartment) : []}
                      tProps={tPropsDept}
                      allowClear
                      treeDefaultExpandAll
                      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                      onChange={value => {
                        setDept(value);
                      }}
                    />
                  </Form.Item>
                  {/* Chức vụ */}
                  <Form.Item name="positionType">
                    <FloatingTree
                      showSearch
                      label={t('userManagement.position')}
                      defaultValue="00000000-0000-0000-0000-000000000000"
                      treeData={listPosition.length > 0 ? addRoot(listPosition) : []}
                      tProps={tProps}
                      allowClear
                      treeDefaultExpandAll
                      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                      onChange={value => {
                        {
                          setPosition(value);
                        }
                      }}
                    />
                  </Form.Item>

                  {/* Nhóm quyền */}
                  <Form.Item name="RoleType">
                    <SelectFloat
                      maxCharcter={28}
                      dataSelect={listRoleGroup}
                      label={t('userManagement.role')}
                      onChangeSelect={data => {
                        setRoleType(data);
                      }}
                      valueSelect={roleType}
                    />
                  </Form.Item>

                  {/* Trạng thái */}
                  <Form.Item name="status">
                    <SelectFloat
                      label={t('userManagement.status')}
                      dataSelect={LIST_STATUS_TYPE}
                      onChangeSelect={data => {
                        setStatus(data);
                      }}
                      valueSelect={status}
                    />
                  </Form.Item>
                </Form>
              </ContentAdvanceView>
            </AdvanceSearchWrapper>
          )}
        </ContentBody>
      </ContentWrapper>

      <InfoUserPopup
        data={
          dataUser && dataUser.lstAccountUserDept
            ? dataUser
            : { lstAccountUserDept: [], showButton: { crud: true, changePass: true, viewHistory: true } }
        }
        refresh={() => {
          refreshT();
        }}
        handleClose={() => {
          setOpenPopupInfoUser(false);
        }}
        visible={openPopupInfoUser}
      />

      <HistoryModal
        onClose={() => {
          setIdUserSelected('');
          setShowHistory(false);
        }}
        objectGuid={idUserSelected}
        title={t('userManagement.titleHistory')}
        visible={showHistory}
      />
      <EditUser
        refresh={() => {
          refreshT();
        }}
        data={dataUser}
        onClose={() => {
          setShowEditPosition(false);
        }}
        visible={showEditPosition}
      />
      <ChangePassword
        onClose={() => {
          setShowChangePass(false);
        }}
        data={dataUser}
        visible={showChangePass}
      />

      {/* {loading && <LoadingOverlay />} */}
      {/* {isBeginRequest && <LoadingOverlay />} */}
    </Content>
  );
};

UserManagement.propTypes = {
  textSearch: PropTypes.string,
  objectId: PropTypes.string,
  categoryId: PropTypes.string,
  showAdvanceSearch: PropTypes.bool,
  onCloseAdvanceSearch: PropTypes.func,
  fCome: PropTypes.bool,
};

export default UserManagement;
