import BaseSchema from '@ioc:Adonis/Lucid/Schema'

import User from 'App/Models/User'

export default class extends BaseSchema {
  protected tableName = 'tbl_users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('username', 32).notNullable().unique()
      table.string('email', 254).notNullable().unique()
      table.string('password', 254).notNullable()
      table.integer('role_id').unsigned().references('id').inTable('tbl_roles').defaultTo(3)

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })

    const owner = User.create({
      username: 'owner', password: '123', email: 'correo@correo.com', roleId: 1
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
