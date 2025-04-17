import { DataSource } from "typeorm";
import * as _ from "lodash";
import { BaseEntity } from "@api/entities/base";
import { Config } from "@api/config/env";
import { User } from "@api/entities/user";
import { AuthProvider } from "@api/entities/auth-provider";
import { Todo } from "@api/entities/todo";

let datasource: DataSource;
export const getDatasource = () => {
  if (!datasource) {
    datasource = new DataSource({
      name: "default",
      type: "postgres",
      username: Config.TYPEORM_USERNAME,
      password: Config.TYPEORM_PASSWORD,
      host: Config.TYPEORM_HOST,
      database: Config.TYPEORM_DATABASE,
      schema: Config.TYPEORM_SCHEMA,
      port: _.toNumber(Config.TYPEORM_PORT),
      // entities: ["dist/entities/*.js"],
      entities: [BaseEntity, User, AuthProvider, Todo],
      migrations: ["dist/migrations/**/*.js"],
      logging: ["error"],
      synchronize: Boolean(Config.TYPEORM_SYNCHRONIZE),
    });
  }

  return datasource;
};
