import React from 'react';
import PropTypes from 'prop-types';
import Workbook from 'react-excel-workbook';
import { CloudDownloadOutlined } from '@material-ui/icons';
import { Button } from '@material-ui/core';
import { classesType } from 'types/global';

const ParticipantListExcel = ({ participantList, checkList, classes }) => {
  const data = checkList.map(userId => participantList.find(user => user.id === userId));

  return (
    <Workbook
      filename="participant-list.xlsx"
      element={(
        <Button disabled={checkList.length === 0} className={classes.downloadBtn}>
          <CloudDownloadOutlined className={classes.downloadIcon} />
          Export participants
        </Button>
      )}
    >
      <Workbook.Sheet data={data} name="Participant list">
        <Workbook.Column label="First name" value="firstname" />
        <Workbook.Column label="Last name" value="lastname" />
        <Workbook.Column label="Phone number" value="phoneNumber" />
      </Workbook.Sheet>
    </Workbook>
  );
};

ParticipantListExcel.propTypes = {
  participantList: PropTypes.arrayOf(PropTypes.object).isRequired,
  classes: classesType.isRequired,
  checkList: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ParticipantListExcel;
