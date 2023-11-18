# Sequelize migration

This project uses [sequelize migrations](https://sequelize.org/docs/v6/other-topics/migrations/) to keep track of the database state, this is like a version control for the database

## Requirements

1. [sequelize-cli](https://github.com/sequelize/cli) installed

## Create a new migration

To create a new migration you can run the following command on the root folder:

```
$ npm run migrate:create -- <name_of_migration>
```

For the name of the migration, please use the following notation:

```
notation: <action>-<description>-<table_name>

<action>: create | update | delete (required)
<description>: description_separate_by_underscore (optional)
<table_name>: table_name_deparate_by_underscore (required)

examples:

  1. npm run migrate:create -- create-dashboard
  2. npm run migrate:create -- update-role_description-role
```
