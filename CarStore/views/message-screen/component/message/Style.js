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
    backgroundColor: '#7e83c2',
    textAlign: 'left',
  },
  mine: {
    backgroundColor: 'rgb(240, 240, 240)',
    textAlign: 'right',
  },
  itemAvatar: {
    borderRadius: 500,
    height: 50,
    width: 50,
    marginRight: 12,
  },
  imageSharedItem: {
    borderRadius: 20,
    height: 150,
    width: 150,
  },
  messageSharedItem: {
    //
  },
  itemContent: {
    //
  },
  userName: {
    fontWeight: '700',
  },
});
