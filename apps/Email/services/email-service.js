import { utilService } from '../../../services/util-service.js';
import { storageService } from '../../../services/storage-service.js';
const KEY = 'emails';
var gEmails = getEmails();
var outboxEmails = [
  {
    id: utilService.makeId(),
    sender: 'Kratos of Sparta',
    subject: 'OutBoxTest',
    body:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente praesentium impedit quasi at omnis. Ducimus omnis amet nihil officiis suscipit.',
    isRead: false,
    sentAt: 1549312452,
  },
];

function getEmails() {
  var fromStorage = storageService.loadFromStorage(KEY);
  if (fromStorage) return fromStorage;
  else {
    var emails = [
      {
        id: utilService.makeId(),
        sender: 'Kratos of Sparta',
        subject: 'Email 1',
        body:
          'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente praesentium impedit quasi at omnis. Ducimus omnis amet nihil officiis suscipit.',
        isRead: false,
        sentAt: 1549312452,
      },
      {
        id: utilService.makeId(),
        sender: 'Peter Parker',
        subject: 'Email 2',
        body:
          'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente praesentium impedit quasi at omnis. Ducimus omnis amet nihil officiis suscipit.',
        isRead: false,
        sentAt: 1599312452,
      },
      {
        id: utilService.makeId(),
        sender: 'Argaorn, son of Arathorn',
        subject: 'Email 3',
        body:
          'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente praesentium impedit quasi at omnis. Ducimus omnis amet nihil officiis suscipit.',
        isRead: false,
        sentAt: 1649312452,
      },
      {
        id: utilService.makeId(),
        sender: 'Nemo Bemo',
        subject: 'Email 4',
        body:
          'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente praesentium impedit quasi at omnis. Ducimus omnis amet nihil officiis suscipit.',
        isRead: false,
        sentAt: 1879312452,
      },
      {
        id: utilService.makeId(),
        sender: 'Tal Tarablus',
        subject: 'Email 5',
        body:
          'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente praesentium impedit quasi at omnis. Ducimus omnis amet nihil officiis suscipit.',
        isRead: false,
        sentAt: 1909312452,
      },
    ];
    storageService.saveToStorage(KEY, emails);
    return emails;
  }
}

function _getIdxById(id) {
  return gEmails.findIndex((email) => email.id === id);
}

function query() {
  return Promise.resolve(gEmails);
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

function setReadState(id) {
  const idx = _getIdxById(id);
  gEmails[idx].isRead = !gEmails[idx].isRead;
  storageService.saveToStorage(KEY, gEmails);
  return Promise.resolve();
}

export const emailService = {
  gEmails,
  query,
  getEmailById,
  setReadState,
  deleteEmail,
};
