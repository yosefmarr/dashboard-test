const dbName = 'JWTDashboardDatabase';
const storeName = 'JWT';

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, 1);

    request.onupgradeneeded = function (event) {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: 'id' });
      }
    };

    request.onsuccess = function (event) {
      resolve(event.target.result);
    };

    request.onerror = function (event) {
      reject('Error opening database: ' + event.target.errorCode);
    };
  });
}

async function getJWTToken() {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([storeName]);
    const objectStore = transaction.objectStore(storeName);
    const request = objectStore.get('token');
    request.onsuccess = function () {
      resolve(request.result ? request.result.jwt : null);
    };
    request.onerror = function () {
      reject('Error getting token: ' + request.error);
    };
  });
}

async function setJWTToken(token) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([storeName], 'readwrite');
    const objectStore = transaction.objectStore(storeName);
    const request = objectStore.put({ id: 'token', jwt: token });
    request.onsuccess = function () {
      resolve();
    };
    request.onerror = function () {
      reject('Error setting token: ' + request.error);
    };
  });
}

async function deleteJWTToken() {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([storeName], 'readwrite');
    const objectStore = transaction.objectStore(storeName);
    const request = objectStore.delete('token');
    request.onsuccess = function () {
      resolve();
    };
    request.onerror = function () {
      reject('Error deleting token: ' + request.error);
    };
  });
}

export { getJWTToken, setJWTToken, deleteJWTToken };
