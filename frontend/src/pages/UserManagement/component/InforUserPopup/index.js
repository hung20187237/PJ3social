import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Row } from 'antd';
import PropTypes from 'prop-types';
import imageLogo from '../../../../../../images/defaultAvatar.svg';
import { TextBold } from '../../../../../DashBoard/styledDashBoard';
import ButtonFunctionList from '../../../../../../res/components/TableOtherView/ButtonFunctionList';
import ModalHandle from '../../../../../../res/components/ModalHandle';
import ChangePassword from '../ResetPassword';
import EditUser from '../EditUser';
import { formatPhoneNumber } from '../../../../../../res/commonFunction';
import HistoryModal from '../../../../../../res/components/HistoryModal';

const InfoUserPopup = ({ data, handleClose, visible, refresh }) => {
  const [showHistory, setShowHistory] = useState(false);
  const [showUpdatePassword, setShowUpdatePassword] = useState(false);
  const [showEditUser, setShowEditUser] = useState(false);

  const { t } = useTranslation();
  return (
    <>
      <ModalHandle
        title={t('userManagement.titleInfoUser')}
        visible={visible}
        width={900}
        onClickCancel={handleClose}
        isModalInformation
        prioty={2}
      >
        <div className="account" style={{ marginLeft: '20px', marginRight: '20px' }}>
          <Row style={{ borderBottom: 'black solid 1px', paddingBottom: '10px' }}>
            <Col span={7}>
              <center style={{ marginTop: '38px' }}>
                <img src={imageLogo} height={150} alt="imgLogo" />
              </center>
            </Col>
            <Col span={17}>
              <Row style={{ marginTop: '10px' }}>
                <Col span={24} style={{ height: '32px' }}>
                  <div style={{ position: 'absolute', right: 0 }}>
                    <ButtonFunctionList
                      inCreate
                      titleEdit={t('userManagement.edit')}
                      titleHistory={t('userManagement.viewHistory')}
                      titleMeeting={t('userManagement.role')}
                      titleLock={t('userManagement.changePassword')}
                      checkLock={data.showButton.changePass}
                      checkEdit={data.showButton.crud}
                      checkViewHistory={data.showButton.viewHistory}
                      onClickHistory={() => {
                        setShowHistory(true);
                      }}
                      onClickLock={() => {
                        setShowUpdatePassword(true);
                      }}
                      onClickEdit={() => {
                        setShowEditUser(true);
                        // handleClose();
                      }}
                    />
                  </div>
                </Col>
              </Row>
              <Row style={{ height: '25px', marginBottom: '10px' }}>
                <Col span={6}>{`${t('userManagement.account')}:`}</Col>
                <Col span={18}>
                  <TextBold style={{ marginLeft: '-20px' }}>{data.userName}</TextBold>
                </Col>
              </Row>

              <Row style={{ height: '25px', marginBottom: '10px' }}>
                <Col span={6}>{`${t('userManagement.fullName')}:`}</Col>
                <Col span={18}>
                  <TextBold style={{ marginLeft: '-20px' }}>{data.fullName}</TextBold>
                </Col>
              </Row>

              <Row style={{ height: '25px', marginBottom: '10px' }}>
                <Col span={6}>Email: </Col>
                <Col span={18}>
                  <TextBold style={{ marginLeft: '-20px' }}>{data.email}</TextBold>
                </Col>
              </Row>

              <Row style={{ height: '25px', marginBottom: '10px' }}>
                <Col span={6}>{`${t('userManagement.phoneNumber')}:`}</Col>
                <Col span={18}>
                  <TextBold style={{ marginLeft: '-20px' }}>{formatPhoneNumber(data.mobile)}</TextBold>
                </Col>
              </Row>

              <Row style={{ height: '25px', marginBottom: '10px' }}>
                <Col span={6}>{`${t('userManagement.identityCard')}:`}</Col>
                <Col span={18}>
                  <TextBold style={{ marginLeft: '-20px' }}>{data.identifyCode}</TextBold>
                </Col>
              </Row>

              <Row style={{ marginBottom: '10px' }}>
                <Col span={6}>{`${t('userManagement.roleGroupName')}:`}</Col>
                <Col span={18}>
                  <TextBold style={{ marginLeft: '-20px' }}>{data.roleGroupName}</TextBold>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row style={{ height: '20px' }} />

          {Array(...data.lstAccountUserDept).map(item => (
            <Row
              style={{
                // height: item.departmentName.length > 36 ? `${(item.departmentName.length / 36 + 1) * 19}px` : '20px',
                marginBottom: '5px',
              }}
            >
              <Col span={12}>
                <Row>
                  <Col span={6}>{t('userManagement.department')}:</Col>
                  <Col span={18}>
                    <TextBold>{item.departmentName}</TextBold>
                  </Col>
                </Row>
              </Col>
              <Col span={12}>
                <Row>
                  <Col span={6}>{t('userManagement.position')}:</Col>
                  <Col span={18}>
                    <TextBold style={{ marginLeft: '-17px', display: 'block' }}>{item.positionName}</TextBold>
                  </Col>
                </Row>
              </Col>
            </Row>
          ))}
          <Row>
            <Col span={12}>
              <Row>
                <Col span={6}>{`${t('userManagement.status')}: `}</Col>
                <Col span={18}>
                  {' '}
                  {data.isActive ? (
                    <span style={{ color: '#25C766', fontWeight: 'Bold' }}>{t('common.active')}</span>
                  ) : (
                    <span style={{ color: '#ED3E26', fontWeight: 'Bold' }}>{t('common.inActive')}</span>
                  )}
                </Col>
              </Row>
            </Col>
            <Col span={12} />
          </Row>
        </div>
      </ModalHandle>

      <HistoryModal
        onClose={() => {
          setShowHistory(false);
        }}
        objectGuid={data.userID}
        title={t('userManagement.titleHistory')}
        visible={showHistory}
      />

      <ChangePassword
        data={data}
        onClose={() => {
          setShowUpdatePassword(false);
        }}
        visible={showUpdatePassword}
      />

      <EditUser
        data={data}
        refresh={refresh}
        onClose={() => {
          setShowEditUser(false);
        }}
        onCloseAll={() => {
          handleClose();
        }}
        visible={showEditUser}
      />
    </>
  );
};

InfoUserPopup.prototype = {
  visible: PropTypes.bool,
  refresh: PropTypes.func,
  handleClose: PropTypes.func,
  data: PropTypes.object,
};
export default InfoUserPopup;
