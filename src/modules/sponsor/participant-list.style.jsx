import { StyleSheet } from '@react-pdf/renderer';

const participantListStyle = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  downloadIcon: {},
  downloadBtn: {
    marginTop: 15,
    '& $downloadIcon': {
      margin: 0,
      marginRight: 10,
    },
  },
  disabledDownload: {
    pointerEvents: 'none',
  },
};

export const docStyles = StyleSheet.create({
  docPage: {
    padding: 40,
  },
  docRow: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});

export default participantListStyle;
