import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database';
import Mail from '@ioc:Adonis/Addons/Mail';
import Env from '@ioc:Adonis/Core/Env';
import jwt from 'jsonwebtoken'

import User from 'App/Models/User'
import UserException from '../../Exceptions/UserException';

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
      const newUserId = await trx.insertQuery()
        .table('tbl_users')
        .insert({ username: username, email: email, password: password });

      const token = jwt.sign({ email }, Env.get('APP_KEY'), { expiresIn: '2h' })

      if (!token) {
        throw new UserException("No token")
      }

      await trx.insertQuery()
        .table('tbl_tokens')
        .insert({ token: token, user_id: newUserId })

      await Mail.send((message) => {
        message
          .from('no-reply@moviereviewer')
          .to(email)
          .subject('Welcome to Movie Reviewer')
          .htmlView('emails/welcome', { username: username, url: `${Env.get('SITE_URL')}/token=${token}` })
      })

      await trx.commit()

      return response.status(200).send({ message: "Registro completado con exito, se te ha enviado un correo con las instrucciones para activar tu cuenta" })
    } catch (error) {
      console.log(error)
      await trx.rollback()
      throw new UserException(error.message, 422, error.code)
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

  public async activeUser({ }: HttpContextContract) {
    /* Active user */
  }
}
