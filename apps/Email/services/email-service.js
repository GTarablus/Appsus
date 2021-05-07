import { utilService } from '../../../services/util-service.js';
import { storageService } from '../../../services/storage-service.js';
const KEY = 'emails';
var gEmails = getEmails();

function getEmails() {
  var fromStorage = storageService.loadFromStorage(KEY);
  if (fromStorage) return fromStorage;
  else {
    var emails = [
      {
        id: utilService.makeId(),
        sender: 'Kratos of Sparta',
        from: 'godofwar@olympus.gov',
        subject: 'Email 1',
        to: 'r&d@apssus.com',
        body:
          'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente praesentium impedit quasi at omnis. Ducimus omnis amet nihil officiis suscipit.',
        isRead: false,
        sentAt: 1525074698,
        sentTime: utilService.getTimeFromStamp(1525074698),
        sentDate: utilService.getDateFromStamp(1525074698),
      },
      {
        id: utilService.makeId(),
        sender: 'Peter Parker',
        from: 'underoos@starkindustries.com',
        subject: 'Email 2',
        to: 'r&d@apssus.com',

        body:
          'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente praesentium impedit quasi at omnis. Ducimus omnis amet nihil officiis suscipit.',
        isRead: false,
        sentAt: 1549312452,
        sentTime: utilService.getTimeFromStamp(1549312452),
        sentDate: utilService.getDateFromStamp(1549312452),
      },
      {
        id: utilService.makeId(),
        sender: 'Argaorn, son of Arathorn',
        from: 'king@gondor.me',
        subject: 'Email 3',
        to: 'r&d@apssus.com',

        body:
          'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente praesentium impedit quasi at omnis. Ducimus omnis amet nihil officiis suscipit.',
        isRead: false,
        sentAt: 1569312452,
        sentTime: utilService.getTimeFromStamp(1569312452),
        sentDate: utilService.getDateFromStamp(1569312452),
      },
      {
        id: utilService.makeId(),
        sender: 'Nemo Bemo',
        from: 'hungry@feedme.now',
        subject: 'Email 4',
        to: 'r&d@apssus.com',
        body:
          'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente praesentium impedit quasi at omnis. Ducimus omnis amet nihil officiis suscipit.',
        isRead: false,
        sentAt: 1599645452,
        sentTime: utilService.getTimeFromStamp(1599645452),
        sentDate: utilService.getDateFromStamp(1599645452),
      },
      {
        id: utilService.makeId(),
        sender: 'Tal Tarablus',
        from: 'fatfuck@siblings.com',
        subject: 'Email 5',
        to: 'r&d@apssus.com',
        body:
          'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente praesentium impedit quasi at omnis. Ducimus omnis amet nihil officiis suscipit.',
        isRead: false,
        sentAt: 3136253789,
        sentTime: utilService.getTimeFromStamp(3136253789),
        sentDate: utilService.getDateFromStamp(3136253789),
      },
    ];
    storageService.saveToStorage(KEY, emails);
    return emails;
  }
}

function _getIdxById(id) {
  return gEmails.findIndex((email) => email.id === id);
}

function query(filterBy) {
  if (filterBy) {
    const filteredEmails = filterEmails(filterBy);
    return Promise.resolve(filteredEmails);
  }
  return Promise.resolve(gEmails);
}

function filterEmails(filterBy) {
  var { sender, date, showRead } = filterBy;
  if (!sender) sender = '';
  if (!date) date = '';
  var filteredEmails = gEmails.filter((email) => {
    return email.sender.toLowerCase().includes(sender.toLowerCase()) &&
      email.sentDate
      ? email.sentDate.includes(date)
      : true;
  });
  if (showRead === 'showAll') return filteredEmails;
  else {
    var bool = showRead === 'read' ? true : false;
    filteredEmails = filteredEmails.filter((email) => {
      return email.isRead === bool;
    });
    return filteredEmails;
  }
}

function getEmailById(id) {
  var email = gEmails.find((email) => {
    return email.id === id;
  });
  return Promise.resolve(email);
}

function deleteEmail(id) {
  const idx = _getIdxById(id);
  if (gEmails[idx].isTrash) gEmails.splice(idx, 1);
  else gEmails[idx].isTrash = true;
  storageService.saveToStorage(KEY, gEmails);
  return Promise.resolve();
}

function restoreEmail(id) {
  const idx = _getIdxById(id);
  gEmails[idx].isTrash = false;
  storageService.saveToStorage(KEY, gEmails);
  return Promise.resolve();
}

function setReadState(id) {
  const idx = _getIdxById(id);
  gEmails[idx].isRead = !gEmails[idx].isRead;
  storageService.saveToStorage(KEY, gEmails);
  return Promise.resolve();
}

function starEmail(id) {
  const idx = _getIdxById(id);
  if (gEmails[idx].isStarred) gEmails[idx].isStarred = false;
  else gEmails[idx].isStarred = true;
  storageService.saveToStorage(KEY, gEmails);
  return Promise.resolve();
}

function saveToDrafts(email) {
  var idx = _getIdxById(email.id);
  if (idx !== -1) {
    gEmails.splice(idx, 1);
  }
  gEmails.push(email);
  storageService.saveToStorage(KEY, gEmails);
}
function saveToEmails(email) {
  gEmails.push(email);
  storageService.saveToStorage(KEY, gEmails);
}

export const emailService = {
  gEmails,
  query,
  getEmailById,
  setReadState,
  deleteEmail,
  restoreEmail,
  starEmail,
  saveToDrafts,
  saveToEmails,
};
