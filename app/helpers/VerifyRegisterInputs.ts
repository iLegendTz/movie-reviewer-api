import { isUsernameValid, isEmailValid, isPasswordValid } from './Regex';
import UserRegisterException from '../Exceptions/UserRegisterException';

interface Fields {
    username: string,
    email: string,
    password: string
}

export const verifyRegisterInputs = ({ username, email, password }: Fields) => {
    if (!isUsernameValid(username)) {
        return new UserRegisterException("Invalid username", 422, "ER_USERNAME_NO_VALID")
    }

    if (!isEmailValid(email)) {
        return new UserRegisterException("Invalid email", 422, "ER_EMAIL_NO_VALID")
    }

    if (!isPasswordValid(password)) {
        return new UserRegisterException("Invalid password", 422, "ER_PASSWORD_NO_VALID")
    }
}