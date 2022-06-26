import {Dimensions, StyleSheet} from 'react-native';

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
    backgroundColor: '#ccc',
    textAlign: 'left',
  },
  mine: {
    backgroundColor: '#7e83c2',
    textAlign: 'right',
    color: '#fff',
  },
  itemAvatar: {
    borderRadius: 500,
    height: 50,
    width: 50,
    marginRight: 12,
  },
  imageSharedItem: {
    borderRadius: 10,
    height: 100,
    width: 100,
    backgroundColor: '#fff',
  },
  messageSharedItem: {
    width: Dimensions.get('screen').width,
    flexDirection: 'row',
  },
  textSharedItem: {
    marginLeft: 12,
  },
  itemContent: {
    //
  },
  userName: {
    fontWeight: '700',
  },
});
