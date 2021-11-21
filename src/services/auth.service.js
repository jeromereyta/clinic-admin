import {axiosInstance} from "boot/axios";

const API = `http://localhost:80/api`;

class AuthService {
  login(user) {
    return axiosInstance
      .post(`admin/login`, {
        email: user.email,
        password: user.password
      })
      .then(response => {
        if (response.data.data.access_token) {
          localStorage.setItem('user', JSON.stringify(response.data.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }
}

export default new AuthService();
