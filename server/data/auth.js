const users = [
  {
    id: 1,
    username: "test",
    password: "1234",
    name: "damin",
    email: "damin@gamil.com",
    url: "https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png",
  },
];

export async function signupCompare(username) {
  const signupComp = users.find((user) => user.username === username);
  return signupComp;
}

export async function loginCompare(username, password) {
  const loginComp = users.find(
    (user) => user.username === username && user.password === password
  );
  return loginComp;
}

export async function addUser(user) {
  users.push(user);
  return users;
}
