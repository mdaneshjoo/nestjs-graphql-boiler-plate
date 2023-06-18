## How to run

### Configs

Copy `.env.example` in to `.env` file and set the values

set `email` and `password` for superuser in `docker-entrypoint.sh` line 16

```bash
node cli create:superuser --email=test@gmail.com --password=123456789
```

### Run The App

```bash
$ docker compose build
```

```bash
$ docker compose up -d
```

#### How to use database uml

```bash
$ npm install -g dbdocs
```

after installing dbdocs in your local machine you need to login

```bash
$ dbdocs login
```

```
? Choose a login method: Email
? Your email: <your email address>
✔ Request email authentication
? Please input OTP code sent to the email:
```

after login you can update uml with this command

```bash
$ npm run dbdoc:update
```
