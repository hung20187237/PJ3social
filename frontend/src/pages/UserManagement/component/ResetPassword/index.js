import React, { useEffect, useState } from 'react';

import { Col, Form, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import CustomModalLarge from '../../../../../../res/components/CustomModalLarge';
import { FormCustomHS } from '../AddUser/styles';
import FloatingLabel from '../../../../../../res/components/FloatingLabel/Input';
import { TextBold } from '../../../../../DashBoard/styledDashBoard';
import { REGEX_PASSWORD, REGEX_PASSWORD2 } from '../../../../../../utils/constants';
import * as actions from '../../actionsUser';
import * as selectors from '../../selectorsUser';
import LoadingOverlay from '../../../../../../res/components/LoadingOverlay';
import Notice from '../../../../../../res/components/Notice';
import { checkPassword } from '../../../../../../res/commonFunction';

const ChangePassword = ({ data, onClose, visible }) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const loading = useSelector(selectors.selectLoading());

  const [btnClick, setBtnClick] = useState(false);
  const [checkReType, setCheckReTpye] = useState(false);

  const [inputPass, setInputPass] = useState('');
  const [inputRePass, setInputRePass] = useState('');

  useEffect(() => {
    if (inputPass && inputRePass) {
      form.validateFields(['passwordAgain']);
    }
  }, [inputPass, inputRePass]);

  // doi mat khau tai day
  const onSubmit = () => {
    const body = { id: data.userID };
    form.validateFields().then(value => {
      body.password = value.password;
      dispatch(
        actions.updatePassword(body, res => {
          if (res) {
            Notice({ msg: `Đặt lại mật khẩu thành công !` });
            onClose();
            visible = false;
            form.resetFields();
          }
        }),
      );
    });
  };
  return (
    <>
      <CustomModalLarge
        title={t('userManagement.updatePassword')}
        visible={visible}
        width={500}
        onClickCancel={() => {
          onClose();
          form.resetFields();
        }}
        onSave={() => {
          setBtnClick(true);
          setCheckReTpye(true);
          onSubmit();
        }}
      >
        <div>
          <FormCustomHS form={form}>
            <Row style={{ width: '100%' }}>
              <Col span={6}>{`${t('userManagement.account')}:`}</Col>
              <Col span={18}>
                <TextBold>{data.userName}</TextBold>
              </Col>
            </Row>

            <Row style={{ width: '100%', marginBottom: '20px', marginTop: '20px' }}>
              <Col span={6}>{`${t('userManagement.fullName')}:`}</Col>
              <Col span={18}>
                <TextBold>{data.fullName}</TextBold>
              </Col>
            </Row>
            <Row style={{ width: '100%', marginBottom: '10px' }}>
              <Form.Item
                style={{ width: '100%' }}
                name="password"
                rules={[
                  () => ({
                    validator(_, value) {
                      setInputPass(value);
                      if (!value) {
                        if (btnClick) {
                          return Promise.reject(new Error(t('changePassword.pleaseTypeNewPass')));
                        }
                        return Promise.reject(new Error(t('changePassword.inValidatePassword')));
                      }
                      setBtnClick(false);
                      if (value.includes(' ') || value.toLowerCase().includes(data.userName.toLowerCase())) {
                        return Promise.reject(new Error(t('changePassword.requiredNotUsernameAndBlank')));
                      }
                      if (value.length < 8 || value.length > 30) {
                        return Promise.reject(new Error(t('userManagement.passwordLengthError')));
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
                <FloatingLabel label={t('userManagement.typeNewPassword')} autoComplete="off" isPass isRequired />
              </Form.Item>
            </Row>

            <Row style={{ width: '100%', marginBottom: '10px' }}>
              <Form.Item
                style={{ width: '100%' }}
                name="passwordAgain"
                rules={[
                  () => ({
                    validator(_, value) {
                      setInputRePass(value);
                      if (value) {
                        setCheckReTpye(false);
                        if (value !== inputPass) {
                          return Promise.reject(new Error(`${t('userManagement.rePasswordNotSame')}`));
                        }
                        return Promise.resolve();
                      }
                      if (checkReType) {
                        return Promise.reject(new Error(t('changePassword.pleaseReTypeNewPass')));
                      }
                      return Promise.reject(new Error(`${t('changePassword.inValidatePassword')}`));
                    },
                  }),
                ]}
              >
                <FloatingLabel label={t('userManagement.reTypeNewPassword')} autoComplete="off" isPass isRequired />
              </Form.Item>
            </Row>

            <div>
              - {t('userManagement.requireLimitLength')} <TextBold>{t('userManagement.upper8Charactor')}</TextBold>
            </div>
            <div>
              - <TextBold>{t('userManagement.DoesNotContainSth')}</TextBold>
            </div>
            <div>
              - <TextBold>{t('common.Contains3OutOf4character')}</TextBold> (a – z, A – Z, 0 – 9, !@#$%^&*)
            </div>
            <div> {t('userManagement.SpecificExample')}</div>
          </FormCustomHS>
        </div>
      </CustomModalLarge>
      {loading && <LoadingOverlay />}
    </>
  );
};

export default ChangePassword;
