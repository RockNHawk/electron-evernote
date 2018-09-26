# Electron-Evernote 

![electron-evernote](https://img.shields.io/badge/electron--evernote-1.0.0-blue.svg) ![MIT](https://img.shields.io/github/license/mashape/apistatus.svg) ![node-version](https://img.shields.io/badge/node-%3E%3D8.7.0-green.svg)

A third party electron client based on evernote api

![](https://github.com/Electron-evernote/electron-evernote/blob/master/screenshot/electron-evernote.png)

# Features

- [x] create notebook

- [x] create note

- [x] move note

- [x] remote note

- [x] markdown support

- [ ] search note

- [ ] i18n

# Settings

## About Development

before you create your own evernote, you are supported to set params in <code>common.js</code>

    1. Common.CONSUMER_KEY
    2. Common.CONSUMER_SECRET

>note:if you not in China, just make <code>Common.CHINA</code> to <code>false</code>

## Usage

1. apply you own developer token
2. create <code>.ee.json</code> under <code>`${getUserHome()}`</code>

```json
{
  "accessToken": "your own Token"
}
```

# Thanks

great thanks for [tui.editor](https://github.com/nhnent/tui.editor) (GFM Markdown WYSIWYG Editor - Productive and Extensible) and [electron](https://github.com/electron/electron) (Build cross-platform desktop apps with JavaScript, HTML, and CSS)