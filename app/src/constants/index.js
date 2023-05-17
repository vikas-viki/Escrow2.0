import { createCampaign, dashboard, profile, approve, cart, hiw } from '../assets';

export const navlinks = [
  {
    name: 'dashboard',
    imgUrl: dashboard,
    link: '/home',
  },
  {
    name: 'list',
    imgUrl: createCampaign,
    link: '/home/list',
  },
  {
    name: 'cart',
    imgUrl: cart,
    link: '/home/cart'
  },
  {
    name: 'approve',
    imgUrl: approve,
    link: '/home/approve'
  },
  {
    name: 'profile',
    imgUrl: profile,
    link: '/home/profile',
  },
  {
    name: 'How_it_works',
    imgUrl: hiw,
    link: '/home/How_it_works',
  },
];
