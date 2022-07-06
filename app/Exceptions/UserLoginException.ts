import { Exception } from '@adonisjs/core/build/standalone'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

/*
|--------------------------------------------------------------------------
| Exception
|--------------------------------------------------------------------------
|
| The Exception class imported from `@adonisjs/core` allows defining
| a status code and error code for every exception.
|
| @example
| new UserLoginException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class UserLoginException extends Exception {
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
    switch (error.code) {
      case "ER_NOT_ACTIVATED":
        return ctx.response.status(error.status || 500).send({ message: "Tu cuenta aun no esta activada, activala para poder iniciar sesion", code: error.code })

      default:
        return ctx.response.status(error.status || 500).send({ message: "Credenciales incorrectas", code: "WRONG_CREDENTIALS" })
    }
  }
}
