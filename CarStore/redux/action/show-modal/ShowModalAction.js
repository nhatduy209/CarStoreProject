export const ACTION_NAME  = {
  SHOW_MODAL_NOT_LOGIN : 'SHOW_MODAL_NOT_LOGIN',
  DISMISS_MODAL_NOT_LOGIN : 'DISMISS_MODAL_NOT_LOGIN'
}

export const showModalNotLogin = ( isShow = true ) => {
  return {
    type : ACTION_NAME.SHOW_MODAL_NOT_LOGIN , 
    data : isShow
  }
}