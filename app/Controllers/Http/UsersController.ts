import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'

export default class UsersController {
  public async index({ }: HttpContextContract) {
    /* List all users */
    return User.all();
  }

  public async create({ }: HttpContextContract) {
    /* Display a form to create a user */
  }

  public async store({ }: HttpContextContract) {
    /* Handle user creation form request */
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
