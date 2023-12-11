import React, { useEffect, useState } from 'react';
import { Form, Tooltip, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { PlusOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { REGEX_PASSWORD, REGEX_PHONE_NUMBER, RESPONSE_MESSAGE } from '../../../../../../utils/constants';

import { checkPassword, validateEmailNotRequire, validateTextBox } from '../../../../../../res/commonFunction';
import {
  FormCustomHS,
  LineDiv,
  Icon,
  Content as ContentStyles,
  RadioGroup,
  RadioCustom,
  DivPlus,
  CustomTreeSelect,
} from './styles';
import iconAddNewDepartment from '../../../../../../images/IconAddOnline.svg';
import imageLogo from '../../../../../../images/defaultAvatar.svg';
import FloatingLabel from '../../../../../../res/components/FloatingLabel/Input';
import SelectFloat from '../../../../../../res/components/FloatingLabel/SelectFloat';
import * as actions from '../../actionsUser';
import * as selector from '../../selectorsUser';
import ButtonCircle from '../../../../../../res/components/ButtonCircle';
import LoadingOverlay from '../../../../../../res/components/LoadingOverlay';
import { TextBold } from '../../../../../DashBoard/styledDashBoard';
import ModalHandle from '../../../../../../res/components/ModalHandle';
import { ImgCustom } from '../../../../../Customer/component/AddCustomer/style';
import ImgAddTab from '../../../../../../images/addTab.svg';
import ResponseMessage from '../../../../../../res/components/ResponseMessage';
import iconAlert from '../../../../../../images/icon/iconAlert.svg';
import { DivFooter, ErrorText, ModalAlertCustom } from '../../../../../../res/components/ResponseMessage/style';
import { ButtonSave } from '../../../../../../res/components/CustomModalSmall/styled';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 18,
  },
};

const DEFAULT_PARAM_EASY_SEARCH = {
  currentPage: 1,
  pageSize: 50,
  textSearch: '',
  objectID: '',
  objectCategory: 0,
};

function getItem(key, title, value, children) {
  return { key, title, value, children };
}

const AddUser = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [showModal, setShowModal] = useState(false);
  const [listRoleGroup, setListRoleGroup] = useState([]);
  const [listDepartment, setListDepartment] = useState([]);
  const [listPosition, setLisPosition] = useState([]);
  const loading = useSelector(selector.selectLoading());
  const [isMessageResponse, setIsMessageResponse] = useState(null);
  const [check, setCheck] = useState([]);
  const [countCheck, setCountCheck] = useState(1);
  const refreshT = () => {
    dispatch(actions.searchEasyUser(DEFAULT_PARAM_EASY_SEARCH));
  };

  // Check trung mat khau
  const [userName, setUserName] = useState('');
  const [inputPass, setInputPass] = useState('');
  const [inputRePass, setInputRePass] = useState('');

  const [showCB1, setShowCB1] = useState(false);
  const [mesCB1, setMesCB1] = useState(false);

  useEffect(() => {
    if (inputPass && inputRePass) {
      form.validateFields(['passwordAgain']);
    }
  }, [inputPass, inputRePass]);

  useEffect(() => {
    if (inputPass && userName) {
      form.validateFields(['password']);
    }
  }, [inputPass, userName]);

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.ctrlKey && e.keyCode === 83 && showModal) {
        // eslint-disable-next-line no-restricted-globals
        event.preventDefault();
        onSubmit();
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showModal]);

  const listDept = useSelector(selector.selectListDepartment());
  const listPost = useSelector(selector.selectListPosition());
  const listRole = useSelector(selector.selectListRoleGroupAcitve());

  const openModal = () => {
    form.resetFields();
    resetForm();
    setShowModal(true);
    const listRoleGroupTemp = [];
    // eslint-disable-next-line array-callback-return
    Object.values(listRole).map(item => {
      const body = {};
      body.value = item.roleGroupID;
      body.label = item.roleGroupName;
      listRoleGroupTemp.push(body);
    });
    setListRoleGroup(listRoleGroupTemp);
    setListDepartment(listDept);
    setLisPosition(listPost);
  };

  const treeData = list => {
    const data = [];
    if (list && list.length > 0) {
      list.forEach(item => {
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

  const resetForm = () => {
    form.resetFields();
    form.setFieldsValue({
      userName: '',
      name: '',
      password: '',
      passwordAgain: '',
      email: '',
      phone: '',
      roleGroupID: '',
      identifyCode: '',
      isActive: true,
    });
    if (!form.getFieldValue('lstAccountUserDept') || form.getFieldValue('lstAccountUserDept').length > 0) {
      form.setFieldsValue({ lstAccountUserDept: [{ departmentID: null, positionID: null }] });
    }
  };

  // todo Lấy tên Phòng ban từ danh sách
  const getName = (_id, list) => {
    let res = '';
    list.map(item => {
      if (item.id === _id) {
        res = item.name;
        return item.name;
      }
    });
    return res;
  };

  // todo kiểm tra xem có phòng ban trùng nhau hay không
  const checkDuplicateDepartment = _value => {
    const temp = [];
    _value.map(item => {
      temp.push(item.departmentID);
    });

    const visited = [];
    const res = [];
    temp.map(item => {
      if (!visited.includes(item)) {
        const array = temp.filter(value => value == item);
        visited.push(item);
        if (array.length > 1) {
          res.push({ name: getName(item, listDepartment), number: array.length });
        }
      }
    });

    if (res.length > 0) {
      setMesCB1(res);
      setShowCB1(true);
      return false;
    }
    return true;
  };

  const messageResponse = (visible, status, titleClose, titleMessage, contentMessage, titleSubmit, onSubmit) => {
    setIsMessageResponse(
      <ResponseMessage
        visible={visible}
        status={status}
        onClose={() => {
          setIsMessageResponse(null);
        }}
        titleClose={titleClose}
        titleMessage={titleMessage}
        contentMessage={contentMessage}
        titleSubmit={titleSubmit}
        onSubmit={onSubmit}
      />,
    );
  };

  const onSubmit = isNext => {
    form.validateFields();
    if (userName.trim().length > 0) {
      dispatch(
        actions.checkExistUserName({ userName }, res => {
          if (res.data.object.length > 0) {
            setCheck({
              len: 1,
              message: `${t('userManagement.UserName')} ${userName} ${t('userManagement.isExisted')} ${t(
                'userManagement.pleaseReType',
              )}`,
            });
            if (countCheck === 1) {
              form.validateFields(['userName']);
              setCountCheck(0);
            } else {
              setCountCheck(1);
              form.validateFields(['userName']);
            }
          } else {
            setCheck({});
            setCountCheck(1);
            form.validateFields().then(value => {
              if (checkDuplicateDepartment(value.lstAccountUserDept)) {
                dispatch(
                  // eslint-disable-next-line no-shadow
                  actions.addUser({ ...value, identifyCode: value.identifyCode }, res => {
                    if (res.data.status === RESPONSE_MESSAGE.IM_SUCCESS || res.data.status === RESPONSE_MESSAGE.IM_ERROR) {
                      messageResponse(
                        true,
                        res.data.status,
                        `${t('common.Close')}`,
                        '',
                        res.data.status === RESPONSE_MESSAGE.IM_SUCCESS
                          ? `${t('customer.messageAddSuccessCustomer')}`
                          : res.data.object,
                      );
                      if (isNext) {
                        refreshT();
                        resetForm();
                      } else {
                        refreshT();
                        resetForm();
                        setShowModal(false);
                      }
                    } else {
                      messageResponse(
                        true,
                        res.data.status,
                        `${t('common.Close')}`,
                        '',
                        res.data.object,
                        t('common.saveModal'),
                        () => {},
                      );
                    }
                  }),
                );
              }
            });
          }
        }),
      );
    }
  };
  return (
    <>
      <Tooltip title={t('userManagement.tooltipAddUserOnlineDetail')} placement="left">
        {' '}
        <LineDiv
          id="addUser"
          onClick={() => {
            openModal();
          }}
        >
          {' '}
          <Icon src={iconAddNewDepartment} alt="icon" />{' '}
          <ContentStyles>{t('userManagement.tooltipAddUserOnline')}</ContentStyles>{' '}
        </LineDiv>{' '}
      </Tooltip>
      <ModalHandle
        title={t('userManagement.titleAddUser')}
        visible={showModal}
        width={1100}
        onClickCancel={() => {
          setShowModal(false);
          resetForm();
        }}
        onSave={() => {
          onSubmit(false);
        }}
        levelModal={2}
        onSaveAndReset={() => {
          // onSubmitAndContinue();
          onSubmit(true);
        }}
        isSaveIsReset
      >
        <div className="account">
          <FormCustomHS
            validateTrigger={['onBlur', 'onChange']}
            isScroll
            {...layout}
            form={form}
            style={{ marginTop: '0px' }}
            initialValues={{ email: '', password: '', name: '' }}
          >
            <br />
            <Row gutter={20} style={{ marginBottom: '5px' }}>
              <Col span={12}>
                <center>
                  {/* eslint-disable-next-line jsx-a11y/alt-text */}
                  <img src={imageLogo} height={130} />
                </center>
              </Col>
              <Col span={12}>
                <Row style={{ marginBottom: '5px', height: '64px' }}>
                  <Col span={24}>
                    <Form.Item
                      onBlur={() => {
                        if (userName.trim().length > 0) {
                          dispatch(
                            actions.checkExistUserName({ userName }, res => {
                              if (res.data.object.length > 0) {
                                setCheck({
                                  len: 1,
                                  message: `${t('userManagement.UserName')} ${userName} ${t('userManagement.isExisted')} ${t(
                                    'userManagement.pleaseReType',
                                  )}`,
                                });
                                if (countCheck === 1) {
                                  form.validateFields(['userName']);
                                  setCountCheck(0);
                                } else {
                                  setCountCheck(1);
                                  form.validateFields(['userName']);
                                }
                              } else {
                                setCheck({});
                                setCountCheck(1);
                              }
                            }),
                          );
                        }
                      }}
                      name="userName"
                      rules={[
                        () => ({
                          validator(_, value) {
                            setUserName(value);
                            if (value) {
                              setCheck({});
                              if (value.trim().length === 0) {
                                return Promise.reject(new Error(`${t('userManagement.userNameError')}`));
                              }
                              if (value.trim().length < 3 || value.trim().length > 30) {
                                return Promise.reject(new Error(`${t('userManagement.userNameLengthError')}`));
                              }
                              return Promise.resolve();
                            }
                            return Promise.reject(new Error(`${t('userManagement.userNameError')}`));
                          },
                        }),
                        check,
                      ]}
                    >
                      <FloatingLabel
                        label={t('userManagement.account')}
                        autoComplete="off"
                        isRequired
                        autoFocus
                        id="userName"
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row style={{ marginBottom: '5px', height: '64px' }}>
                  <Col span={24}>
                    <Form.Item
                      name="name"
                      rules={[
                        () => ({
                          validator(_, value) {
                            if (value) {
                              const messErr = validateTextBox(3, 30, value, true, t('userManagement.fullName'));
                              // if (value.trim().length < 3 || value.trim().length > 50) {
                              //   return Promise.reject(new Error(`${t('userManagement.fullNameLengthError')}`));
                              // }
                              // return Promise.resolve();
                              if (messErr !== '') {
                                return Promise.reject(messErr);
                              }
                              return Promise.resolve();
                            }
                            return Promise.reject(new Error(`${t('userManagement.fullNameError')}`));
                          },
                        }),
                      ]}
                    >
                      <FloatingLabel label={t('userManagement.fullName')} autoComplete="off" isRequired />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row gutter={20} style={{ marginBottom: '5px', height: '64px' }}>
              <Col span={12}>
                <Row gutter={8}>
                  <Col span={22}>
                    <Form.Item
                      name="password"
                      rules={[
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            setInputPass(value);
                            if (!value) {
                              return Promise.reject(new Error(t('changePassword.inValidatePassword')));
                            }
                            if (value && (value.trim().length < 8 || value.trim().length > 30)) {
                              return Promise.reject(new Error(t('userManagement.passwordLengthError')));
                            }
                            if (
                              value.includes(' ') ||
                              (getFieldValue('userName') &&
                                value.toLowerCase().includes(getFieldValue('userName').toLowerCase()))
                            ) {
                              return Promise.reject(new Error(t('changePassword.requiredNotUsernameAndBlank')));
                            }
                            // Kiem tra mat khau ton tai 3 trong 4 ki tu
                            if (!checkPassword(value)) {
                              return Promise.reject(new Error(t('changePassword.requiredElementOfPassword')));
                            }
                            return Promise.resolve();
                          },
                        }),
                      ]}
                    >
                      <FloatingLabel label={t('login.labelPassword')} autoComplete="off" isPass isRequired />
                    </Form.Item>
                  </Col>
                  <Col span={2}>
                    <ButtonCircle
                      iconName="info1"
                      title={
                        <div>
                          <div>{t('common.elementRequirePassword')}:</div>
                          <div>
                            <strong>(1) </strong>
                            {t('common.mustHaveLength')}
                            <strong> {t('common.from8To30Characters')}</strong>
                          </div>
                          <div>
                            <strong>(2) {t('common.requireElementDetail')}</strong>
                          </div>
                          <div>
                            <strong>(3) {t('common.Contains3OutOf4character')}</strong> (a - z, A - Z, 0 - 9, !@#$%^&*)
                          </div>
                        </div>
                      }
                    />
                  </Col>
                </Row>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="passwordAgain"
                  rules={[
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        setInputRePass(value);
                        if (value) {
                          if (value !== inputPass) {
                            return Promise.reject(new Error(`${t('userManagement.rePasswordNotSame')}`));
                          }
                          if (value && (value.trim().length < 8 || value.trim().length > 30)) {
                            return Promise.reject(new Error(t('userManagement.passwordLengthError')));
                          }
                          if (
                            value.includes(' ') ||
                            (getFieldValue('userName') &&
                              value.toLowerCase().includes(getFieldValue('userName').toLowerCase()))
                          ) {
                            return Promise.reject(new Error(t('changePassword.requiredNotUsernameAndBlank')));
                          }
                          // Kiem tra mat khau ton tai 3 trong 4 ki tu
                          if (!checkPassword(value)) {
                            return Promise.reject(new Error(t('changePassword.requiredElementOfPassword')));
                          }
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error(`${t('changePassword.inValidateRePassword')}`));
                      },
                    }),
                  ]}
                >
                  <FloatingLabel label={t('userManagement.againPw')} autoComplete="off" isPass isRequired />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={20} style={{ marginBottom: '10px', height: '64px' }}>
              <Col span={12}>
                <Form.Item
                  name="email"
                  rules={[
                    () => ({
                      validator(_, value) {
                        const errMessage = validateEmailNotRequire(value);
                        if (errMessage !== '') {
                          return Promise.reject(new Error(errMessage));
                        }
                        return Promise.resolve();
                      },
                    }),
                  ]}
                >
                  <FloatingLabel label="Email" autoComplete="off" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="phone"
                  rules={[
                    {
                      required: false,
                    },
                    () => ({
                      validator(_, value) {
                        if (!value || REGEX_PHONE_NUMBER.test(value.trim())) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error(t('common.phoneNumberIsIllegal')));
                      },
                    }),
                  ]}
                >
                  <FloatingLabel label={t('userManagement.phoneNumber')} name="" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={20} style={{ marginBottom: '0', height: '64px' }}>
              <Col span={12}>
                <Form.Item
                  name="identifyCode"
                  rules={[
                    () => ({
                      validator(_, value) {
                        if (!value || /^([0-9]{9}|[0-9]{12})$/g.test(value.trim())) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error(t('userManagement.messageInvalididentifyCode')));
                      },
                    }),
                  ]}
                >
                  <FloatingLabel label={t('common.citizenIdentification')} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="roleGroupID" rules={[{ required: true, message: t('userManagement.requireRole') }]}>
                  <SelectFloat
                    label={t('userManagement.role')}
                    dataSelect={listRoleGroup}
                    autoComplete="false"
                    isRequired
                    showSearch
                    valueSelect={form.getFieldValue.roleGroupID}
                    onChangeSelect={value => {
                      form.setFieldsValue({ ...form.getFieldValue, roleGroupID: value });
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Form.List name="lstAccountUserDept">
              {(fields, { add, remove }) => (
                <Row gutter={8}>
                  <Col span={4} style={{ margin: 'auto' }}>
                    <TextBold style={{ fontSize: '14px', marginTop: '10px' }}>
                      {t('userManagement.DepartmentAndPosition')}
                    </TextBold>
                  </Col>
                  <Col span={20}>
                    {fields.length < 5 ? (
                      <>
                        <Tooltip title={t('userManagement.tooltipAdd')} placement="left">
                          <ImgCustom
                            isSpecial
                            src={ImgAddTab}
                            style={{ cursor: 'pointer', float: 'right', marginTop: '10px' }}
                            onClick={() => {
                              add();
                            }}
                          />
                        </Tooltip>
                      </>
                    ) : (
                      <>
                        <DivPlus style={{ cursor: 'pointer', float: 'right', marginTop: 0 }} disable>
                          <Tooltip title={t('userManagement.maxNumber')} placement="left">
                            <PlusOutlined />
                          </Tooltip>
                        </DivPlus>
                      </>
                    )}
                  </Col>
                  <Col span={24}>
                    <div style={{ height: '190px', borderRadius: '12px', border: '1px solid #C5CED9', marginTop: '8px' }}>
                      <>
                        <Row
                          style={{
                            backgroundColor: '#E3F7FF',
                            height: '40px',
                            color: '#222D4B',
                            // border: '1px solid',
                            borderTopLeftRadius: '12px',
                            borderTopRightRadius: '12px',
                            borderBottom: '1px solid #C5CED9',
                          }}
                        >
                          <div
                            style={{
                              width: '412px',
                              marginRight: '50px',
                              marginLeft: '20px',
                              fontWeight: 500,
                              marginTop: 'auto',
                              marginBottom: 'auto',
                            }}
                          >
                            {t('system.titleTHDepartment')}
                          </div>
                          <div style={{ width: '430px', marginTop: 'auto', marginBottom: 'auto', fontWeight: 500 }}>
                            {t('system.titleTHManagement')}
                          </div>
                          <div
                            style={{
                              width: '100px',
                              textAlign: 'center',
                              marginLeft: '18px',
                              marginTop: 'auto',
                              marginBottom: 'auto',
                              display: fields.length < 2 ? 'none' : 'inline',
                              fontWeight: 500,
                            }}
                          >
                            {t('system.titleTHCustom')}
                          </div>
                        </Row>
                        <div
                          className="addPart"
                          style={{
                            display: 'flex',
                            // justifyContent: 'center',
                            flexDirection: 'column',
                            overflow: 'scroll',
                            height: '150px',
                          }}
                        >
                          {fields
                            .slice()
                            .reverse()
                            .map((field, index) => (
                              <div
                                style={{
                                  height: '65px',
                                  marginTop: index === 0 ? '20px' : '0px',
                                  width: '100%',
                                  display: 'flex',
                                  // justifyContent: 'center',
                                  flexDirection: 'row',
                                }}
                              >
                                <div style={{ width: '430px', marginRight: '50px', marginLeft: '20px' }}>
                                  <Form.Item
                                    {...field}
                                    validateTrigger={['onChange', 'onBlur']}
                                    name={[field.name, 'departmentID']}
                                    rules={[{ required: true, message: t('userManagement.departmentNotNull') }]}
                                  >
                                    <CustomTreeSelect
                                      style={{ fontSize: '14px' }}
                                      showSearch
                                      value
                                      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                      placeholder={t('userManagement.choceDepartment')}
                                      allowClear
                                      treeDefaultExpandAll
                                      treeData={treeData(listDepartment)}
                                    />
                                  </Form.Item>
                                </div>
                                <div style={{ width: '430px' }}>
                                  <Form.Item
                                    {...field}
                                    validateTrigger={['onChange', 'onBlur']}
                                    name={[field.name, 'positionID']}
                                    rules={[{ required: true, message: t('userManagement.positionNotNull') }]}
                                  >
                                    <CustomTreeSelect
                                      style={{ fontSize: '14px' }}
                                      showSearch
                                      value
                                      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                      placeholder={t('userManagement.chocePosition')}
                                      allowClear
                                      treeDefaultExpandAll
                                      treeData={treeData(listPosition)}
                                    />
                                  </Form.Item>
                                </div>
                                <div style={{ width: 0 }}>
                                  <Form.Item
                                    {...field}
                                    validateTrigger={['onChange', 'onBlur']}
                                    name={[field.name, 'userID']}
                                    initialValue="00000000-0000-0000-0000-000000000000"
                                    rules={[{ required: false, message: t('userManagement.departmentNotNull') }]}
                                  />

                                  <Form.Item
                                    {...field}
                                    validateTrigger={['onChange', 'onBlur']}
                                    name={[field.name, 'id']}
                                    initialValue="00000000-0000-0000-0000-000000000000"
                                    rules={[{ required: false, message: t('userManagement.departmentNotNull') }]}
                                  />
                                </div>
                                <div style={{ width: '165px', display: 'flex', justifyContent: 'center' }}>
                                  {fields.length > 1 ? (
                                    <ButtonCircle
                                      iconName="delete"
                                      onClick={() => remove(field.name)}
                                      enable
                                      title={t('userManagement.DelDepartmentPosition')}
                                      placement="top"
                                    />
                                  ) : null}
                                </div>
                              </div>
                            ))}
                        </div>
                      </>
                    </div>
                  </Col>
                </Row>
              )}
            </Form.List>

            <Row gutter={20} style={{ marginTop: '15px' }}>
              <Col span={24} style={{ height: '40px' }}>
                <Form.Item
                  name="isActive"
                  label={`${t('userManagement.status')} `}
                  rules={[{ required: false, message: t('userManagement.requireRole') }]}
                >
                  <RadioGroup>
                    <RadioCustom value>{t('common.active')}</RadioCustom>
                    <RadioCustom value={false}>{t('common.inActive')}</RadioCustom>
                  </RadioGroup>
                </Form.Item>
              </Col>
            </Row>
          </FormCustomHS>
        </div>
      </ModalHandle>
      <ModalAlertCustom
        visible={showCB1}
        centered
        footer={null}
        closable={false}
        width={700}
        onCancel={() => {
          setShowCB1(false);
        }}
        onClose={() => {
          setShowCB1(false);
        }}
      >
        {
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ paddingTop: 35, flexDirection: 'column' }}
          >
            <Icon src={iconAlert} style={{ width: '100px', height: '100px' }} />
            <>
              <div style={{ marginTop: '20px' }}>
                {mesCB1 &&
                  mesCB1.map(item => (
                    <div
                      style={{ padding: '0px 15px' }}
                      dangerouslySetInnerHTML={{
                        __html: t('system.CB1Message', { nameDepartment: item.name, number: item.number }),
                      }}
                    />
                  ))}
              </div>
              <div dangerouslySetInnerHTML={{ __html: t('system.CB1Detail') }} style={{ marginTop: '10px' }} />
            </>
            <DivFooter>
              <ButtonSave onClick={() => setShowCB1(false)}>{t('common.Close')}</ButtonSave>
            </DivFooter>
          </div>
        }
      </ModalAlertCustom>
      {isMessageResponse}
      {loading && <LoadingOverlay />}
    </>
  );
};

AddUser.propTypes = {
  updateData: PropTypes.func,
};

export default AddUser;
