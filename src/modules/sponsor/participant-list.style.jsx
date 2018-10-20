const participantListStyle = {
  disabledDownload: {},
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    '&$disabledDownload > span': {
      pointerEvents: 'none',
    },
  },
  downloadIcon: {},
  downloadBtn: {
    marginTop: 15,
    '& $downloadIcon': {
      margin: 0,
      marginRight: 10,
    },
  },
};

export default participantListStyle;
