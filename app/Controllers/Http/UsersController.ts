import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

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
    const body = request.body();
    const { username, email, password } = body;

    await User
      .create({ username: username, email: email, password: password })
      .then((user) => {
        return response.status(200).send({ id: user.id })
      })
      .catch((error) => {
        throw new UserException(error.message, 422, error.code)
      });
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
}
