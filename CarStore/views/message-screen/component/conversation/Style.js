import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  conversationHeader: {
    height: 50,
    width: '100%',
  },
  itemContainer: {
    marginHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 70,
    width: '56%',
  },
  itemAvatar: {
    borderRadius: 500,
    height: 50,
    width: 50,
    marginRight: 12,
  },
  itemContent: {
    width: '70%',
  },
  userName: {
    fontWeight: '700',
  },
});
