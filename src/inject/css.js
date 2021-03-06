/**
 * Create by Leetao
 */

'use strict'

const Common = require('../common')

class CssInjector {

}

CssInjector.noteCss = `
 html,
 body {
     height: 700px;
     max-height:800px;
     overflow:hidden
 }

 .row,
 .container-fluid {
     height: 100%;
 }

 #wrapper-div {
     overflow: hidden;
 }

 .loading-container {
     display: flex;
     justify-content: center;
     align-items: center;
     height: 100vh;
     overflow: hidden;
     animation-delay: 1s;
 }

 .item-1 {
     width: 20px;
     height: 20px;
     background: #f583a1;
     border-radius: 50%;
     background-color: #eed968;
     margin: 7px;
     display: flex;
     justify-content: center;
     align-items: center;
 }

 @keyframes scale {
     0% {
         transform: scale(1);
     }
     50%,
     75% {
         transform: scale(2.5);
     }
     78%,
     100% {
         opacity: 0;
     }
 }

 .item-1:before {
     content: '';
     width: 20px;
     height: 20px;
     border-radius: 50%;
     background-color: #eed968;
     opacity: 0.7;
     animation: scale 2s infinite cubic-bezier(0, 0, 0.49, 1.02);
     animation-delay: 200ms;
     transition: 0.5s all ease;
     transform: scale(1);
 }

 .item-2 {
     width: 20px;
     height: 20px;
     background: #f583a1;
     border-radius: 50%;
     background-color: #eece68;
     margin: 7px;
     display: flex;
     justify-content: center;
     align-items: center;
 }

 @keyframes scale {
     0% {
         transform: scale(1);
     }
     50%,
     75% {
         transform: scale(2.5);
     }
     78%,
     100% {
         opacity: 0;
     }
 }

 .item-2:before {
     content: '';
     width: 20px;
     height: 20px;
     border-radius: 50%;
     background-color: #eece68;
     opacity: 0.7;
     animation: scale 2s infinite cubic-bezier(0, 0, 0.49, 1.02);
     animation-delay: 400ms;
     transition: 0.5s all ease;
     transform: scale(1);
 }

 .item-3 {
     width: 20px;
     height: 20px;
     background: #f583a1;
     border-radius: 50%;
     background-color: #eec368;
     margin: 7px;
     display: flex;
     justify-content: center;
     align-items: center;
 }

 @keyframes scale {
     0% {
         transform: scale(1);
     }
     50%,
     75% {
         transform: scale(2.5);
     }
     78%,
     100% {
         opacity: 0;
     }
 }

 .item-3:before {
     content: '';
     width: 20px;
     height: 20px;
     border-radius: 50%;
     background-color: #eec368;
     opacity: 0.7;
     animation: scale 2s infinite cubic-bezier(0, 0, 0.49, 1.02);
     animation-delay: 600ms;
     transition: 0.5s all ease;
     transform: scale(1);
 }

 .item-4 {
     width: 20px;
     height: 20px;
     background: #f583a1;
     border-radius: 50%;
     background-color: #eead68;
     margin: 7px;
     display: flex;
     justify-content: center;
     align-items: center;
 }

 @keyframes scale {
     0% {
         transform: scale(1);
     }
     50%,
     75% {
         transform: scale(2.5);
     }
     78%,
     100% {
         opacity: 0;
     }
 }

 .item-4:before {
     content: '';
     width: 20px;
     height: 20px;
     border-radius: 50%;
     background-color: #eead68;
     opacity: 0.7;
     animation: scale 2s infinite cubic-bezier(0, 0, 0.49, 1.02);
     animation-delay: 800ms;
     transition: 0.5s all ease;
     transform: scale(1);
 }

 .item-5 {
     width: 20px;
     height: 20px;
     background: #f583a1;
     border-radius: 50%;
     background-color: #ee8c68;
     margin: 7px;
     display: flex;
     justify-content: center;
     align-items: center;
 }

 @keyframes scale {
     0% {
         transform: scale(1);
     }
     50%,
     75% {
         transform: scale(2.5);
     }
     78%,
     100% {
         opacity: 0;
     }
 }

 .item-5:before {
     content: '';
     width: 20px;
     height: 20px;
     border-radius: 50%;
     background-color: #ee8c68;
     opacity: 0.7;
     animation: scale 2s infinite cubic-bezier(0, 0, 0.49, 1.02);
     animation-delay: 1000ms;
     transition: 0.5s all ease;
     transform: scale(1);
 }

 .evernote-sidebar {
     margin-left: 10px;
     background-color: #f8f8f8;
     text-align: center;
     min-width: 80px;
     position: fixed;
 }

 .evernote-menu-item {
     margin-top: 20%;
 }

 .evernote-add-note:hover {
     content: url('../../../assets/imgs/add-note-hover.png')
 }

 .evernote-search-note:hover {
     content: url('../../../assets/imgs/search-note-hover.png')
 }

 .evernote-note:hover {
     content: url('../../../assets/imgs/note-hover.png')
 }

 .evernote-notebook:hover {
     content: url('../../../assets/imgs/notebook-hover.png')
 }

 .evernote-tags:hover {
     content: url('../../../assets/imgs/tags-hover.png')
 }


 .list-group-item {
    position: relative;
    display: block;
    padding: .75rem 1.25rem;
    margin-bottom: 0;
    background-color: inherit;
    border: 1px solid rgba(0, 0, 0, .125);
}

 .list-group-item:hover {
     z-index: 2;
     color: #fff;
     background-color: #62eb92;
     border-color: #62eb92;
 }

 .list-group-item.active {
    z-index: 2;
    color: #495057;
    background-color: #ececec;
    border-color: #ececec;
}

 .note-list, .notebook-list {
     background-color: #fff;
     border-right: 3px solid rgba(236, 236, 236, 0.7);
     position: fixed;
     min-width: 230px;
     height: 100%;
     left: 100px;
     max-width: 250px;
 }

 .note-list h5, .notebook-list h5 {
     color: #878787;
     padding: 21px 24px 32px;
 }

 .add-note-btn-active img {
     content: url('../../../assets/imgs/add-note-active.png')
 }

 .search-note-btn-active img {
     content: url('../../../assets/imgs/search-note-active.png')
 }

 .note-btn-active img {
     content: url('../../../assets/imgs/note-active.png')
 }

 .notebook-btn-active img {
     content: url('../../../assets/imgs/notebook-active.png')
 }

 .tags-btn-active img {
     content: url('../../../assets/imgs/tags-active.png')
 }
 .CodeMirror {
     height:90%;
 }

.card-header {
    background-color: #393d41;
    color: white;
    text-align: center;
}
 `

 module.exports = CssInjector;