
const user = JSON.parse(localStorage.getItem('user'));

export default function () {
  return {
    status: {
      loggedIn: !!user,
      user: user
    }
  }
}
