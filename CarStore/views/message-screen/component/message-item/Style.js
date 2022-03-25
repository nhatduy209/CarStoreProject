import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  itemContainer: {
    marginHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 70,
  },
  itemAvatar: {
    borderRadius: 500,
    height: 70,
    width: 70,
  },
  itemContent: {
    width: '70%',
  },
  userName: {
    fontWeight: '700',
  },
  lastOnline: {},
});
