import Dexie from 'dexie';

const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

if(!indexedDB) {
    alert('Your browser do not support indexedDB. This might cause an problem with that app');
}

export const db = new Dexie("formsDatabase");
db.version(1).stores({
    forms: 'formId,title,description,*inputs'
});

