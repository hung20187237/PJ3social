import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from 'antd';
import { Content } from '../../../../../Profile/components/RenderObjectSign/styles';

const RenderPBCV = ({ data }) => {
  const list = Array(...data.lstAccountUserDept);
  const size = list.length;
  if (size === 0) {
    return <div />;
  }
  return (
    <div>
      <Tooltip
        overlayStyle={{ maxWidth: 1000 }}
        placement="topLeft"
        mouseLeaveDelay={0}
        title={list.map(item => (
          <div>
            {item.departmentName} - {item.positionName}
          </div>
        ))}
      >
        {list.map(item => (
          <Content>
            {item.departmentName} - {item.positionName}
          </Content>
        ))}
      </Tooltip>
    </div>
  );
};
RenderPBCV.propTypes = {
  data: PropTypes.array,
};

export default RenderPBCV;
