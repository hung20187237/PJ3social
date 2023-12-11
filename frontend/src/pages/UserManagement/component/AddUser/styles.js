import styled from 'styled-components';
import { Form, Select, Tabs, Radio, Col, Table, TreeSelect } from 'antd';

export const TABLE = {
  background: {
    hoverRow: '#fff',
    selectedRow: '#e6f7ff',
    hoverSelectedRow: '#dcf4ff',
    header: '#c5ced9',
  },
};

const FormCustomHS = styled(Form)`
  display: flex;
  flex-direction: column;
  margin: 23px 7px 0 20px;
  padding-right: 13px;
  max-height: 700px;
  overflow: hidden;

  .ant-form-item-label {
    text-align: left;
  }

  .ant-form-item-label > label.ant-form-item-required:not(.ant-form-item-required-mark-optional)::before {
    content: '';
  }

  .ant-form-item-label > label.ant-form-item-required:not(.ant-form-item-required-mark-optional)::after {
    color: red;
    content: '*';
  }
  .ant-form-item-label > label {
    position: relative;
    display: inline-flex;
    align-items: center;
    max-width: 100%;
    height: 40px;
    color: rgba(0, 0, 0, 0.85);
    font-size: 14px;
  }

  .ant-form-item-with-help {
    height: 66px !important;
    margin-bottom: 0;
    transition: none;
  }
`;

const CustomSelectHS = styled(Select)`
  width: 100%;
  height: 40px;
  &.ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
    height: 40px;
    border-radius: 12px;
  }

  .ant-select-selection-placeholder {
    line-height: 40px !important;
  }

  .ant-select-selection-item {
    line-height: 40px !important;
  }
  &.ant-select-item-option-selected:not(.ant-select-item-option-disabled) {
    font-weight: 600;
    background: rgba(33, 37, 41, 0.3);
  }
  &.ant-select-focused:not(.ant-select-disabled).ant-select:not(.ant-select-customize-input) .ant-select-selector {
    box-shadow: none;
  }
`;
const Icon = styled.img`
  margin-top: 3px;
  width: 14px;
  height: 14px;
`;

const LineDiv = styled.div`
  display: inline-flex;
  flex-direction: row;
  padding: 5px;
`;

const Content = styled.div`
  margin-left: 10px;
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
`;

const TabsCustomHS = styled(Tabs)``;

export const RadioGroup = styled(Radio.Group)`
  margin-left: 40px;
  padding-top: 7px !important;
`;

export const RadioCustom = styled(Radio)`
  margin-right: 40px;
`;
export const SpanStart = styled.span`
  color: ${props => props.theme.colors.red};
  margin-left: 5px;
`;
export const DivListContact = styled(Col)`
  display: flex;
  justify-content: flex-end;
`;

export const DivPlus = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: ${props => (props.disable ? props.theme.colors.disableColor : props.theme.primaryColor)};
  border: 1px solid ${props => (props.disable ? props.theme.colors.disableColor : props.theme.primaryColor)};
  width: 35px;
  height: 33px;
  color: white;
  font-size: 16px;
  border-radius: 6px;

  :hover {
    -webkit-filter: drop-shadow(0px 0px 3px #000);
    filter: drop-shadow(0px 0px 3px #000);
  }
`;
export const TableContent = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TableSave = styled(Table)`
  height: ${props => (props.enablePanigation ? 'calc(100% - 60px)' : '100%')};

  .ant-spin-nested-loading {
    height: 100%;
  }
  .ant-spin-container {
    height: 100%;
  }
  .ant-table {
    height: 100%;
  }
  .ant-table-container {
    height: 100%;
    overflow: hidden;
    position: relative;
  }
  .ant-table-body:after{
    content: '';
    position: absolute;
    left: 0px;
    right: 0px;
    bottom: 0px;
    height: ${props => (props.totalRecord > 10 ? '58px' : '0px')};
    //background: linear-gradient(180deg, rgba(139,167,32,0) 0%, rgba(255,255,255,1) 150%);
    pointer-events: none;
    background: linear-gradient(0deg,hsla(0,0%,100%,.92),#fff .01%,hsla(0,0%,100%,.93) 33.85%,hsla(0,0%,100%,.39));
    transition: opacity .5s linear,height .5s linear;
  }

  .ant-table-body {
    //height: calc(100% - 60px);
    height: ${props => (props.enablePanigation ? 'calc(100% - 60px)' : 'calc(100% - 50px)')};
  }

  .ant-table-placeholder .ant-table-cell {
    border-bottom: none !important;
  }

  .listButton {
    display: none;
    margin-left: -215px;
    background-color: #fff;
    margin-top: 2px;
    padding-left: 10px;
  }

  .ant-table-wrapper {
    border-radius: 16px;
    height: 100%;
    box-shadow: unset;
  }

  .ant-table {
    font-size: ${props => props.theme.fontSizes.small};
    color: #212529;
    font-weight: 400;
  }

  .ant-table-header {
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
  }

  .ant-table-body {
    overflow: auto !important;
  }

  .ant-table-thead > tr > th {
    font-size: 1em;
    background-color: ${props => (props.isTablePopup ? props.theme.colors.table.whiteBlue : props.theme.primaryColor)};
    font-weight: 700;
    height: 50px !important;
    color: ${props => (props.isTablePopup ? '#222d4b' : 'white')};
  }



  .ant-table-thead > tr > th,
  .ant-table-tbody > tr > td,
  .ant-table tfoot > tr > th,
  .ant-table tfoot > tr > td {
    //padding: 4.5px 8px;
    padding: 7.5px 8px;
    line-height: 18px;
    font-size: 14px;
  }

  .ant-table .ant-table-expanded-row-fixed {
    margin: -8.5px -18px;
  }

  .ant-table-pagination {
    display: none;
  }

  .ant-table-body::-webkit-scrollbar {
    height: 5px;
    width: 5px;
    background-color: unset;
    border-radius: 8px;
  }

  .ant-table-body::-webkit-scrollbar-track {
    margin-bottom: 10px;
    margin-left: 10px;
    border-radius: 6px;
    background: white;
  }

  .ant-table-body::-webkit-scrollbar-thumb {
    border-radius: 6px;
    height: 117px;
    background: #c4c4c4;
    border: 1px solid #aaa;
  }

  .ant-table-body::-webkit-scrollbar-thumb:hover {
    background: white;
  }

  .ant-table-body::-webkit-scrollbar-corner {
    display: none;
  }

  .ant-table-body::-webkit-scrollbar-thumb:active {
    background: white};
  }

  .ant-table-body::-webkit-scrollbar-track-piece {
    background-color: rgb(255, 255, 255);
  }

  .ant-table-ping-right:not(.ant-table-has-fix-right)
    .ant-table-container::after {
    box-shadow: none;
  }
  .ant-table-ping-left:not(.ant-table-has-fix-left)
    .ant-table-container::before {
    box-shadow: none;
  }

  .ant-table-cell-scrollbar {
    box-shadow: none;
  }

  .ant-table-thead
    > tr
    > th:not(:last-child):not(.ant-table-selection-column):not(.ant-table-row-expand-icon-cell):not([colspan])::before {
    display: none;
  }

  .icon-row-layout {
    display: none;
  }

  .ant-table-row:hover {
    background: ${props => props.hoverBackgroundColor || TABLE.background.hoverRow};
    box-shadow: 0 2px 10px rgb(0 0 0 / 25%);

    .listButton {
      display: flex;
      justify-content: flex-end;
    }
  }

  .ant-table-tbody > tr.ant-table-row:hover > td,
  .ant-table-tbody > tr > td.ant-table-cell-row-hover {
    background: none;
  }

  .ant-table-row:hover .icon-row-layout {
    margin: -8px 0 -8px -12px;
    display: flex;
  }

  .ant-table-row:hover .text-status-layout {
    display: none;
  }

  .ant-table-tbody > tr {
    cursor:  ${props => (props.isPointer ? 'auto' : 'pointer')};;
  }

  .ant-table-tbody > tr > td > div {
    position: relative;
    width: 100%;
    line-height: 20px;
  }

  .ant-table-tbody > tr > td {
    transition: none;
    //height: 56px;
    //height: 45px;
  }

  .ant-table-tbody > tr:hover > td > div {
    :after {
      background: ${TABLE.background.hoverRow};
    }
  }

  .ant-table-tbody > tr.ant-table-row-selected > td > div {
    :after {
      background: ${TABLE.background.selectedRow};
    }
  }

  .ant-table-tbody > tr.ant-table-row-selected:hover > td > div {
    :after {
      background: ${TABLE.background.hoverSelectedRow};
    }
  }

  .ant-checkbox-wrapper {
    margin: -3px -3px;
  }

  .ant-table-column-sort {
    background: none;
  }
  .ant-table-expanded-row-fixed {
    max-height: max-content !important;
  }

  .ant-table-tbody > tr.ant-table-placeholder:hover > td > div {
    :after {
      background: white;
    }
  }
`;

const CustomTreeSelect = styled(TreeSelect)`
  width: 100%;
  border-radius: 8px;

  .ant-select-selector {
    height: 40px !important;
    border-radius: 8px !important;
  }

  .ant-select-single.ant-select-show-arrow .ant-select-selection-search {
    right: 25px;
    margin-top: 5px;
  }

  &.ant-select:not(.ant-select-customize-input) .ant-select-selector {
    min-height: 40px;
    max-height: ${props => props.heigh || '100px'};
    padding: ${props => props.padding};
    border-radius: 8px;
    overflow: hidden;

    :hover {
      overflow-y: auto;
      scrollbar-width: thin;
    }
  }

  &.ant-select-multiple &.ant-select-selection-item {
    align-items: center !important;
    background: none;
    border-radius: 6px;
    font-size: 14px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  //.ant-select-selection-search-input {
  //  height: 40px !important;
  //}

  //width: 100%;
  height: 40px;
  &.ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
    height: 40px;
    border-radius: 8px;
    padding-right: 20px;
  }

  &.ant-select-multiple .ant-select-selection-item {
    margin-right: 0px !important;
    background: none !important;
    border: none !important;
  }

  .ant-select-selection-placeholder {
    line-height: 40px !important;
  }

  .ant-select-selection-item {
    align-items: center;
    display: flex;
  }
  &.ant-select-item-option-selected:not(.ant-select-item-option-disabled) {
    font-weight: 600;
    background: rgba(33, 37, 41, 0.3);
  }
  &.ant-select-focused:not(.ant-select-disabled).ant-select:not(.ant-select-customize-input) .ant-select-selector {
    box-shadow: none;
  }

  .ant-select-clear {
    position: absolute;
    top: 55%;
    right: 11px;
    z-index: 1;
    display: inline-block;
    width: 12px;
    height: 12px;
    margin-top: -8px !important;
    color: rgba(0, 0, 0, 0.25);
    font-size: 12px;
    font-style: normal;
    line-height: 1;
    text-align: center;
    text-transform: none;
    background: #fff;
    cursor: pointer;
    opacity: 0;
    transition: color 0.3s ease, opacity 0.15s ease;
    text-rendering: auto;
    margin-right: 15px !important;
  }

  .anticon svg {
    display: inline-block;
    fill: #626262;
  }

  //.ant-select-selection-item {
  //  width: 374px !important;
  //}

  .ejHtCK .ant-select-selection-search {
    margin-left: 10px;
    /* width: 100%; */
    right: 25px !important;
    left: 0 !important;
  }

  .ant-select-multiple .ant-select-selection-item {
    align-items: center !important;
  }

  .ant-select-selection-overflow-item {
    max-width: 95% !important;
    height: ${props => (props.heighItem ? '35px' : '')};
    align-items: center;
    display: flex;
  }

  &.ant-select-show-search.ant-select:not(.ant-select-customize-input) .ant-select-selector input {
    height: 36px;
  }

`;

export { FormCustomHS, CustomSelectHS, TabsCustomHS, Icon, LineDiv, Content, TableSave, CustomTreeSelect };
