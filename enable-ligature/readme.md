# Obsidian Publish Enable-Ligature

Obsidian Publishのコードスニペットで特定のフォントで有効なリガチャを有効にします。

リガチャによってどのような表記になるかは[Fira Code](https://github.com/tonsky/FiraCode)を参照してください。

## 導入条件

- Obsidian Publishであること
- カスタムドメイン化していること ([publish.js](https://help.obsidian.md/publish/customize)が配置できること)

## 導入方法

publish.jsに次のコードを追加してください。適切なタイミングでTwemojiが読み込まれるように考慮が入っているので、DOMContentLoadedイベントを待つ必要はありません。

```js
document.head.appendChild(Object.assign(document.createElement('script'), {
    async: true,
    src: 'https://obsidian-cdn.plasticheart.info/publish/enable-ligature/app.js'
}))
```
