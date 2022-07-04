import BaseSchema from '@ioc:Adonis/Lucid/Schema'

import TokenType from '../../app/Models/TokenType';

export default class extends BaseSchema {
  protected tableName = 'tbl_token_types'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name', 100)
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })

    TokenType.createMany([{ name: 'activation' }, { name: 'session' }])
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
