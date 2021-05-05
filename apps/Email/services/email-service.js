import { utilService } from '../../../services/util-service.js';
import { storageService } from '../../../services/storage-service.js';
const KEY = 'emails';
var box = 'inbox';
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

function getEmailById(id) {
  var email = gEmails.find((email) => {
    return email.id === id;
  });
  return Promise.resolve(email);
}

function setReadState(bool, id) {
  var idx = gEmails.findIndex((email) => {
    return email.id === id;
  });
  gEmails[idx].isRead = !bool;
  storageService.saveToStorage(KEY, gEmails);
}

function setEmailBox(string) {
  box = string;
}

export const emailService = {
  gEmails,
  query,
  getEmailById,
  setReadState,
  setEmailBox,
};
function query() {
  var emails;
  if (box === 'inbox') emails = gEmails;
  else if (box === 'outbox') emails = outboxEmails;
  return Promise.resolve(emails);
}
