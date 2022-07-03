import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database';
import Mail from '@ioc:Adonis/Addons/Mail';

import Env from '@ioc:Adonis/Core/Env';
import jwt from 'jsonwebtoken'

import User from 'App/Models/User'
import Token from '../../Models/Token';
import UserRegisterException from 'App/Exceptions/UserRegisterException';
import UserActivateException from '../../Exceptions/UserActivateException';

export default class UsersController {
  public async index({ }: HttpContextContract) {
    /* List all users */
    return User.all();
  }

  public async create({ }: HttpContextContract) {
    /* Display a form to create a user */
  }

  public async store({ request, response }: HttpContextContract) {
    /* Handle user creation form request */
    const { username, email, password } = request.body();

    const trx = await Database.transaction();

    try {
      const user = new User();
      user.username = username;
      user.email = email;
      user.password = password;
      user.useTransaction(trx);
      await user.save();

      const token = new Token();
      token.token = jwt.sign({ email: email }, Env.get('APP_KEY'), { expiresIn: '2h' });
      token.token_type_id = 1;
      token.user_id = user.id;
      token.useTransaction(trx);
      await token.save();

      await Mail.send((message) => {
        message
          .from('no-reply@moviereviewer')
          .to(email)
          .subject('Welcome to Movie Reviewer')
          .htmlView('emails/welcome', { username: username, url: `${Env.get('SITE_URL')}/users/activate-user?token=${token.token}` })
      })

      await trx.commit();

      return response
        .status(200)
        .send({ message: "Registro completado con exito, se te ha enviado un correo con las instrucciones para activar tu cuenta" })
    } catch (error) {
      await trx.rollback()
      throw new UserRegisterException(error.message, 422, error.code)
    }
  }

  public async show({ }: HttpContextContract) {
    /* Return a single user */
  }

  public async edit({ }: HttpContextContract) {
    /* Display a form to edit a user */
  }

  public async update({ }: HttpContextContract) {
    /* Handle user update form submission */
  }

  public async destroy({ }: HttpContextContract) {
    /* Delete user */
  }

  public async activateUser({ request, response }: HttpContextContract) {
    /* activate user */
    const { token } = request.qs();

    const trx = await Database.transaction();

    try {
      jwt.verify(token, Env.get('APP_KEY'));
      const tokenDB = await Token.findByOrFail('token', token)
      tokenDB.useTransaction(trx)
      await tokenDB.delete()

      const userDB = await User.findByOrFail('id', tokenDB.user_id)
      userDB.activated = true
      userDB.useTransaction(trx)
      await userDB.save()

      await Token.query()
        .where('user_id', userDB.id)
        .where('token_type_id', 1)
        .useTransaction(trx)
        .delete()

      trx.commit()

      return response
        .status(200)
        .send({ message: "Cuenta activada con exito" })
    }
    catch (error) {
      await trx.rollback()
      throw new UserActivateException(error.message)
    }
  };
}
