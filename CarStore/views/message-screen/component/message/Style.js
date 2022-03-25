import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
    width: '100%',
    flexDirection: 'row',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    maxWidth: '60%',
    borderRadius: 12,
  },
  otherSide: {
    backgroundColor: '#faa',
    textAlign: 'left',
  },
  mine: {
    backgroundColor: '#bda',
    textAlign: 'right',
  },
  itemAvatar: {
    borderRadius: 500,
    height: 50,
    width: 50,
    marginRight: 12,
  },
  itemContent: {
    //
  },
  userName: {
    fontWeight: '700',
  },
});
