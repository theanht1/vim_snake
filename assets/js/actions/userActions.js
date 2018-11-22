

export const login = () => (dispatch) => {
  global.gapi.load('auth2', () => {
    const GoogleAuth = global.gapi.auth2.init();
    GoogleAuth.signIn()
      .then((res) => {
        console.log(res, res.getAuthResponse().id_token);
      });
  });
};
