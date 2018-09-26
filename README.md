# Electron-Evernote 

![electron-evernote](https://img.shields.io/badge/electron--evernote-1.0.0-blue.svg) ![MIT](https://img.shields.io/github/license/mashape/apistatus.svg) ![node-version](https://img.shields.io/badge/node-%3E%3D8.7.0-green.svg)

A third party electron client based on evernote api

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