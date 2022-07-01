import { Exception } from '@adonisjs/core/build/standalone'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from '../Models/User';

/*
|--------------------------------------------------------------------------
| Exception
|--------------------------------------------------------------------------
|
| The Exception class imported from `@adonisjs/core` allows defining
| a status code and error code for every exception.
|
| @example
| new UserException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class UserException extends Exception {
  /**
   * The handle method allows you to self handle the exception and
   * return an HTTP response.
   *
   * This is how it works under the hood.
   *
   * - You raise this exception
   * - The exception goes uncatched/unhandled through out the entire HTTP request cycle.
   * - Just before making the response. AdonisJS will call the `handle` method.
   *   Giving you a chance to convert the exception to response.
   *
   */
  public async handle(error: this, ctx: HttpContextContract) {

    const body = ctx.request.body();

    switch (error.code) {
      case "ER_NO_DEFAULT_FOR_FIELD":
        return ctx.response.status(error.status || 500)
          .send({ message: 'Uno o mas campos son invalidos' })

      case "ER_DUP_ENTRY":
        let emailExists = await User.findBy('email', body.email)

        if (emailExists) {
          return ctx.response.status(error.status || 500)
            .send({ message: 'Ya existe un registro con este email' })
        } else {
          return ctx.response.status(error.status || 500)
            .send({ message: 'Ya existe un registro con este username' })
        }


      default:
        return ctx.response.status(500).send({ message: 'Error al momento de completar el registro' })
    }
  }
}
