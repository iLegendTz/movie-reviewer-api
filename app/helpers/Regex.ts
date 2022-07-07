export const isEmailValid = (email: string) => {
  const regex = new RegExp(
    "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
  );

  return regex.test(email);
};

export const isUsernameValid = (username: string) => {
  const regex = new RegExp("^[a-zA-Z0-9_.-]{6,32}$");

  return regex.test(username);
};

export const isPasswordValid = (password: string) => {
  const regex = new RegExp("^.{6,}$");

  return regex.test(password);
};
