# Obsidian Publish Twemoji

Obsidian Publishで絵文字をTwemoji(TwitterやDiscordで使用されている絵文字)に変換するスクリプトです。

これを導入することで、環境に依存せず同じ絵文字を表示できるようになります。
Twemojiの詳細は[こちら](https://github.com/jdecked/twemoji)を参照してください。

## 導入条件

- Obsidian Publishであること
- カスタムドメイン化していること ([publish.js](https://help.obsidian.md/publish/customize)が配置できること)

## 導入方法

publish.jsに次のコードを追加してください。適切なタイミングでTwemojiが読み込まれるように考慮が入っているので、DOMContentLoadedイベントを待つ必要はありません。

```js
document.head.appendChild(Object.assign(document.createElement('script'), {
    async: true,
    src: 'https://obsidian-cdn.plasticheart.info/publish/twemoji/app.js'
}))
```
