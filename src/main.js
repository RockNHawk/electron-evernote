'use strict'
const AppConfig = require('./configuration')
const Common = require('./common')
const ENML = require('enml-js')

const Client = require('./evernote_client')
const OAuthClient = Client.oauthClient()
const Evernote = require('evernote')

const h2m = require('h2m')
const path = require('path')
const {
    app,
    ipcMain,
    dialog
} = require('electron');

const NoteWindow = require('./windows/controllers/note')


class ElectronicEvernote {
    constructor() {
        this.noteWindow = null
        this.currentNote = null
    }

    init() {
        if (this.checkInstance()) {
            this.initApp()
            this.initIPC()
        } else {
            app.quit()
        }
    }

    checkInstance() {
        return !app.makeSingleInstance((commandLine, workingDirectory) => {
            if (this.noteWindow) {
                this.noteWindow.show()
            }
        })
    }

    initApp() {
        app.on('ready', () => {
            this.createNoteWindow()
        })
        app.on('activate', () => {
            if (this.noteWindow == null) {
                this.createNoteWindow()
            } else {
                this.noteWindow.show()
            }
        })
    }

    createNoteWindow() {
        this.noteWindow = new NoteWindow()
        this.noteWindow.show()
    }

    getAccessToken(oauthVerifier) {
        let oauthToken = AppConfig.readSettings('oauthToken')
        let oauthTokenSecret = AppConfig.readSettings('oauthTokenSecret')
        var that = this
        OAuthClient.getAccessToken(oauthToken, oauthTokenSecret, oauthVerifier,
            function (error, accessToken, oauthTokenSecret, results) {
                if (error) {
                    console.log(error)
                } else {
                    AppConfig.saveSettings('accessToken', accessToken)
                    that.noteWindow.getNoteList(accessToken)
                }
            })
    }
    initIPC() {
        var that = this

        ipcMain.on('oauth_call_back', (event, message) => {
            if (/oauth_verifier/.test(message) === false) {
                dialog.showMessageBox({
                    type: 'warning',
                    button: ['确认并退出应用'],
                    title: "授权失败",
                    message: "很遗憾授权失败..>o<..",
                    callback: function (response, checkboxChecked) {
                        app.quit()
                    }
                })
            } else {
                this.noteWindow.loadURL(`file://${path.join(__dirname, '/windows/views/loading.html')}`)
                let groups = message.match(/&oauth_verifier=(.+)&/)
                this.getAccessToken(groups[1])
            }
        })

        ipcMain.on('createNoteBook', (event, title) => {
            let accessToken = AppConfig.readSettings('accessToken') // 获取 accessToken
            let NoteClient = Client.noteClient(accessToken)
            let noteStore = NoteClient.getNoteStore()
            let noteBook = new Evernote.Types.Notebook({
                name: title
            })
            noteStore.createNotebook(noteBook)
                .then(function (notebook) {
                    event.sender.send('createNotebookStatus', notebook.guid);
                })
                .catch(error => {
                    console.log(error)
                    event.sender.send('createNotebookStatus', error);
                })
        })

        ipcMain.on('notebook-id', (event, id) => {

            let accessToken = AppConfig.readSettings('accessToken') // 获取 accessToken
            let NoteClient = Client.noteClient(accessToken)
            let noteStore = NoteClient.getNoteStore()
            let filter = new Evernote.NoteStore.NoteFilter({
                notebookGuid: id,
                ascending: true,
            })
            let spec = new Evernote.NoteStore.NotesMetadataResultSpec({
                includeTitle: true,
                includeContentLength: true,
                includeCreated: true,
                includeUpdated: true,
                includeDeleted: true,
                includeUpdateSequenceNum: true,
                includeNotebookGuid: true,
                includeTagGuids: true,
                includeAttributes: true,
                includeLargestResourceMime: true,
                includeLargestResourceSize: true,
            });

            noteStore.findNotesMetadata(filter, 0, 100, spec)
                .then(function (notelist) {
                    event.sender.send('note-list', notelist)
                })
                .catch(error => {
                    console.log('caught', JSON.stringify(error))
                })
        })


        ipcMain.on('note-id', (event, noteid) => {
            let accessToken = AppConfig.readSettings('accessToken') // 获取 accessToken
            let NoteClient = Client.noteClient(accessToken)
            let noteStore = NoteClient.getNoteStore()
            noteStore.getNote(noteid, true, true, true, true)
                .then(function (note) {
                    that.currentNote = note
                    event.sender.send('note-detail', {"content": Common.getNote(note.content), "notebook-guid":note.notebookGuid});
                })
                .catch(error => {
                    console.log(error)
                })
        })

        ipcMain.on('updateNote', (event, content) => {
            let accessToken = AppConfig.readSettings('accessToken') // 获取 accessToken
            let NoteClient = Client.noteClient(accessToken)
            let noteStore = NoteClient.getNoteStore()
            if (content.hasOwnProperty('notebook-guid')) {
                that.currentNote.notebookGuid = content['notebook-guid'];
                that.currentNote.content = Common.makeNote(content['content'])
            } else {
                that.currentNote.content = Common.makeNote(content)
            }
            noteStore.updateNote(that.currentNote)
                .then(function (metaData) {
                    event.sender.send('updateNoteStatus', true);
                })
                .catch(error => {
                    console.log('caught', JSON.stringify(error))
                    event.sender.send('updateNoteStatus', false);
                })
        })

        ipcMain.on('createNote', (event, notebookObj) => {
            let accessToken = AppConfig.readSettings('accessToken') // 获取 accessToken
            let NoteClient = Client.noteClient(accessToken)
            let noteStore = NoteClient.getNoteStore()
            let note = new Evernote.Types.Note({
                title: notebookObj.title,
                content: Common.makeNote(notebookObj.content),
                notebookGuid: notebookObj.notebookGuid
            })
            noteStore.createNote(note)
                .then(function (note) {
                    event.sender.send('createNoteStatus', note.guid);
                })
                .catch(error => {
                    console.log(error);
                    event.sender.send('createNoteStatus', false);
                })
        })

        ipcMain.on('deleteNote', (event, notebookId) => {
            let accessToken = AppConfig.readSettings('accessToken') // 获取 accessToken
            let NoteClient = Client.noteClient(accessToken)
            let noteStore = NoteClient.getNoteStore()
            noteStore.deleteNote(notebookId)
                .then(function (updateSequenceNumber) {
                    event.sender.send('deleteNoteStatus', true);
                })
                .catch(error => {
                    event.sender.send('deleteNoteStatus', false);
                })
        })

        ipcMain.on('actShortCut', (event, shortcut_status) => {
            let accessToken = AppConfig.readSettings('accessToken') // 获取 accessToken
            let NoteClient = Client.noteClient(accessToken)
            let noteStore = NoteClient.getNoteStore()
            if (shortcut_status === false) {
                noteStore.setNoteApplicationDataEntry(this.currentNote.guid)
            } else {
                noteStore.unsetNoteApplicationDataEntry(this.currentNote.guid)
            }
        })
    }
}

new ElectronicEvernote().init()