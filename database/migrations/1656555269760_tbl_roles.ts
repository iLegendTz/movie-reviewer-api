import BaseSchema from '@ioc:Adonis/Lucid/Schema'

import Role from '../../app/Models/Role';

export default class extends BaseSchema {
  protected tableName = 'tbl_roles'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable().unique()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })

    const roles = Role.createMany([{ name: 'owner' }, { name: 'moderator' }, { name: 'member' }])
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
