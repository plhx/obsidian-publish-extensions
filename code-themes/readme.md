# Obsidian Code Themes

Obsidian Publish用のコードスニペットのカラーテーマです。

## 導入条件

- Obsidian Publishであること
- カスタムドメイン化していること ([publish.js](https://help.obsidian.md/publish/customize)が配置できること)

## 導入方法

publish.jsに次のコードを追加してください。現在は次の4テーマが使用できます。

- ayu.css
- monokai.css
- one-dark.css
- solarized.css

```js
document.head.appendChild(Object.assign(document.createElement('link'), {
    rel: 'stylesheet',
    href: 'https://obsidian-cdn.plasticheart.info/publish/code-themes/ayu.css'
}))
```
