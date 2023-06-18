## How to run

### Configs

Copy `.env.example` in to `.env` file and set the values

set `email` and `password` for superuser in `docker-entrypoint.sh` line 16

```bash
node cli create:superuser --email=test@gmail.com --password=123456789
```

### Run The App

```bash
docker compose build
```

```bash
docker compose up -d
```
