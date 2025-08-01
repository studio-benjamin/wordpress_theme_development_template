## Install

`brew install docker --cask` (Optional)
`pnpm install`

## Run

`docker-compose up -d` (自動でポートが開きます)
`pnpm run dev`

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

## Development

`pnpm run dev`

このコマンドは下のコマンドを並列で実行します。

### `./watch_sass.sh`

scssを監視して、変更があればcssに変換します。

### `./watch_img.ts`

imgを監視して、変更があればwebpに変換します。  
対象拡張子:

```ts
const IMAGE_EXTENSIONS = [
  ".jpg",
  ".jpeg",
  ".png",
  ".gif",
  ".webp",
  ".bmp",
  ".tiff",
];
```
