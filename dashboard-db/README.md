# Dashboard DB

## Build Image

```
  $ docker build -t dashboard-db .
```

## Run Image

```
  $ docker run --rm -p 3307:3306 --name dashboard-db -e MYSQL_ROOT_PASSWORD=admin dashboard-db
```

## Start DB

```
$ docker-compose up -d
```

## Stop DB

```
$ docker-compose down
```
