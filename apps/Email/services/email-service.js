import { utilService } from '../../../services/util-service.js';

var gEmails = [
  {
    subject: 'Email 1',
    body:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente praesentium impedit quasi at omnis. Ducimus omnis amet nihil officiis suscipit.',
    isRead: false,
    sentAt: 1549312452,
  },
  {
    subject: 'Email 2',
    body:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente praesentium impedit quasi at omnis. Ducimus omnis amet nihil officiis suscipit.',
    isRead: false,
    sentAt: 1599312452,
  },
  {
    subject: 'Email 3',
    body:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente praesentium impedit quasi at omnis. Ducimus omnis amet nihil officiis suscipit.',
    isRead: false,
    sentAt: 1649312452,
  },
  {
    subject: 'Email 4',
    body:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente praesentium impedit quasi at omnis. Ducimus omnis amet nihil officiis suscipit.',
    isRead: false,
    sentAt: 1879312452,
  },
  {
    subject: 'Email 5',
    body:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente praesentium impedit quasi at omnis. Ducimus omnis amet nihil officiis suscipit.',
    isRead: false,
    sentAt: 1909312452,
  },
];

utilService.getTimeFromStamp(gEmails[0].sentAt);
