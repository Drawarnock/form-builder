const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

if(!indexedDB) {
    alert('Your browser do not support indexedDB. This might cause an problem with that app');
}

let requestDB = indexedDB.open('formBuilderDatabase', 1), db, transaction, store, index;

requestDB.onupgradeneeded = e => {
    db = requestDB.result;
    store = db.createObjectStore('formStore', { autoIncrement: true }); // {keyPath: formId}
    index = store.createIndex('formText', 'formText', { unique: false});
};

requestDB.onerror = e => {
    console.log('Something wrong with the database. Number error: ',e.target.errorCode);
};

requestDB.onsuccess = async e => {
    db = requestDB.result;
    transaction = db.transaction('formStore', 'readwrite');
    store = transaction.objectStore('formStore');
    index = store.index('formText');

    db.onerror = e => {
        console.log("Error " + e.target.errorCode);        
    }
    // await store.delete(1);
    console.log(this.state.form)
    await store.update(this.state.form);
    
    const data = await store.get(1)
    transaction.oncomplete =() => {
        console.log(data.result);
        db.close();
    }; 
};

export default requestDB;