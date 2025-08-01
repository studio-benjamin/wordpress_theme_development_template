## Install

`brew install docker --cask` (Optional)
`pnpm install`

## Run

`docker-compose up -d`
`./watch_sass.sh`

Now you can access the app at `http://localhost:XXXX`

## GitHub Actions

### Local

`act --secret-file .github/act/.secrets
`

### Remote

- `FTP_SERVER`
- `FTP_USERNAME`
- `FTP_PASSWORD`
- `FTP_DIR`

の4つの環境変数を設定してください。
