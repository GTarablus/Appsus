import { utilService } from '../../../services/util-service.js';

var gEmails = [
  {
    sender: 'Kratos of Sparta',
    subject: 'Email 1',
    body:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente praesentium impedit quasi at omnis. Ducimus omnis amet nihil officiis suscipit.',
    isRead: false,
    sentAt: 1549312452,
  },
  {
    sender: 'Peter Parker',
    subject: 'Email 2',
    body:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente praesentium impedit quasi at omnis. Ducimus omnis amet nihil officiis suscipit.',
    isRead: false,
    sentAt: 1599312452,
  },
  {
    sender: 'Argaorn, son of Arathorn',
    subject: 'Email 3',
    body:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente praesentium impedit quasi at omnis. Ducimus omnis amet nihil officiis suscipit.',
    isRead: false,
    sentAt: 1649312452,
  },
  {
    sender: 'Nemo Bemo',
    subject: 'Email 4',
    body:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente praesentium impedit quasi at omnis. Ducimus omnis amet nihil officiis suscipit.',
    isRead: false,
    sentAt: 1879312452,
  },
  {
    sender: 'Tal Tarablus',
    subject: 'Email 5',
    body:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente praesentium impedit quasi at omnis. Ducimus omnis amet nihil officiis suscipit.',
    isRead: false,
    sentAt: 1909312452,
  },
];

export const emailService = {
  query,
};
function query() {
  return Promise.resolve(gEmails);
}

utilService.getTimeFromStamp(gEmails[0].sentAt);
