import { createCampaign, dashboard, refund, profile, withdraw, approve, cart, listings } from '../assets';

export const navlinks = [
  {
    name: 'dashboard',
    imgUrl: dashboard,
    link: '/home',
  },
  {
    name: 'campaign',
    imgUrl: createCampaign,
    link: '/home/list',
  },
  {
    name: 'listings',
    imgUrl: listings,
    link: '/home/listings'
  },
  {
    name: 'cart',
    imgUrl: cart,
    link: '/cart'
  },
  {
    name: 'approve',
    imgUrl: approve,
    link: '/approve'
  },
  {
    name: 'profile',
    imgUrl: profile,
    link: '/profile',
  }
];
