import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();


// const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

// if(!indexedDB) {
//     alert('Your browser do not support indexedDB. This might cause an problem with that app');
// }

// let requestDB = indexedDB.open('formBuilderDatabase', 1), db, transaction, store, index;

// requestDB.onupgradeneeded = e => {
//     db = requestDB.result;
//     store = db.createObjectStore('formStore', { autoIncrement: true }); // {keyPath: formId}
//     index = store.createIndex('formText', 'formText', { unique: false});
// };

// requestDB.onerror = e => {
//     console.log('Something wrong with the database. Number error: ',e.target.errorCode);
// };

// requestDB.onsuccess = e => {
//     db = requestDB.result;
//     transaction = db.transaction('formStore', 'readwrite');
//     store = transaction.objectStore('formStore');
//     index = store.index('formText');

//     db.onerror = e => {
//         console.log("Error " + e.target.errorCode);        
//     }

//     store.put({ xd: 'Lol'});

//     transaction.complete = () => {
//         db.close();
//     };
// };

// export default requestDB;
