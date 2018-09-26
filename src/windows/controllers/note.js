/**
 * created by Leetao
 */

'use strict'

const path = require('path')
const fs = require('fs')
const Common = require('../../common')
const CSSInjector = require('../../inject/css')
const AppConfig = require('../../configuration')
const Client = require('../../evernote_client')


const { BrowserWindow } = require('electron')


class NoteWindow {

    constructor() {
        this.isShown = false
        this.createWindow()
        // css 注入存在问题
        // this.initWindowWebContent()
    }

    createWindow() {
        this.noteWindow = new BrowserWindow({
            title: Common.ELECTRONIC_EVERNOTE,
            width: Common.WINDOW_SIZE.width,
            height: Common.WINDOW_SIZE.height,
            resizable: true,
            center: true,
            show: false,
            frame: true,
            autoHideMenuBar: true,
            icon: path.join(__dirname, '../../../assets/icon.ico')
        })

        if (AppConfig.readSettings('accessToken')) {
            this.getNoteList(AppConfig.readSettings('accessToken'))
        } else {
            this.noteWindow.loadURL(`file://${path.join(__dirname, '/../views/oauth.html')}`)
        }

        if (Common.DEBUG_MODE) {
            this.noteWindow.webContents.openDevTools()
        }
    }

    show() {

        this.noteWindow.show()
        this.noteWindow.focus()
        this.noteWindow.webContents.send('show-note-window');
        this.isShown = true
    }

    hide() {
        this.noteWindow.hide()
        this.noteWindow.webContents.send('hide-note-window');
        this.isShown = false
    }

    loadURL(url) {
        this.noteWindow.loadURL(url)
    }

    initWindowWebContent() {
        var that = this;
        // TODO 剔除不需要的css
        fs.readFile(__dirname + "/../../../assets/css/electron-evernote.css", "utf-8", function (error, data) {
            if (!error) {
                var allCss = data + " " + CSSInjector.noteCss
                var formatedCss = allCss.replace(/\s{2,10}/g, ' ').trim()
                that.noteWindow.webContents.on('dom-ready', () => {
                    that.noteWindow.webContents.insertCSS(formatedCss);
                })
            }
        })
    }

    getNoteList(accessToken) {
        let NoteClient = Client.noteClient(accessToken)
        let noteStore = NoteClient.getNoteStore()
        this.noteWindow.loadURL(`file://${path.join(__dirname, '/../views/notes.html')}`)
        var that = this
        noteStore.listNotebooks()
            .then(function (notebooks) {
                that.noteWindow.webContents.on('did-finish-load', () => {
                    that.noteWindow.webContents.send('notebooks', notebooks)
                })
                that.noteWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription, validatedUR, isMainFrame) => {
                    console.log(event, errorCode, errorDescription, validatedUR, isMainFrame)
                })
            })
            .catch(error => {
                console.log('caught', JSON.stringify(error))
            })
    }
}

module.exports = NoteWindow