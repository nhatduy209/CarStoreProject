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
    width: '80%',
  },
  userName: {
    fontWeight: '700',
  },
  textInput: {
    width: '70%',
    backgroundColor: '#fff',
    borderRadius: 50,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#bcbcbc',
  },
  sendButton: {
    borderRadius: 50,
    backgroundColor: '#fff',
    padding: 12,
  },
  footer: {
    // position: 'absolute',
    width: '100%',
    // zIndex: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
});
