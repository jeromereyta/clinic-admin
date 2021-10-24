import AuthService from '../../services/auth.service';

export function login({commit}, user) {
  return AuthService.login(user).then(
    user => {
      commit('loginSuccess', user);
      return Promise.resolve(user);
    },
    error => {
      commit('loginFailure');
      return Promise.reject(error);
    }
  );
}

export function logout({commit}) {
    AuthService.logout();
    commit('logout');
}
