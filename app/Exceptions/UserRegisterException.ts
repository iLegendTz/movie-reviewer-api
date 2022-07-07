import { Exception } from '@adonisjs/core/build/standalone'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User';

/*
|--------------------------------------------------------------------------
| Exception
|--------------------------------------------------------------------------
|
| The Exception class imported from `@adonisjs/core` allows defining
| a status code and error code for every exception.
|
| @example
| new UserRegisterException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class UserRegisterException extends Exception {
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
          .send({ message: 'Uno o mas campos son invalidos', code: error.code })

      case "ER_DUP_ENTRY":
        let emailExists = await User.findBy('email', body.email)

        if (emailExists) {
          return ctx.response.status(error.status || 500)
            .send({ message: 'Ya existe un registro con este email', code: error.code })
        } else {
          return ctx.response.status(error.status || 500)
            .send({ message: 'Ya existe un registro con este username', code: error.code })
        }

      case "ER_USERNAME_NO_VALID":
        return ctx.response.status(error.status || 500)
          .send({ message: "Introduce un username valido.\nTu username solo puede contener letras, numeros y guiones.\nCon un minimo de 6 caracteres.\nCon un maximo de 32 caracteres.", code: error.code })

      case "ER_EMAIL_NO_VALID":
        return ctx.response.status(error.status || 500)
          .send({ message: "Direccion de email invalido, introduce un email valido", code: error.code })

      case "ER_PASSWORD_NO_VALID":
        return ctx.response.status(error.status || 500)
          .send({ message: "Password no valido\nTu password debe contener al menos 6 caracteres", code: error.code })

      default:
        return ctx.response.status(500).send({ message: 'Error al momento de completar el registro', code: "ER_REGISTER_FAILED" })
    }
  }
}
