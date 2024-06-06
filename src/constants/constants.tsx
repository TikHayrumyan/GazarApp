import {BannerType, CarouselType, ProductType} from '../types';
import Images from '../assets/Images';
import {svg} from '../../src/assets/svg';
import {theme} from './theme';

const history = [
  {
    id: 1,
    number: 648752,
    date: 'Feb 25, 2023 at 8:32 PM',
    total: 281.85,
    status: 'Shipping',
    delivery: 15,
    discount: 29.65,
    products: [
      {
        id: 1,
        name: 'Small leather backpack, blue',
        quantity: 1,
        price: 167.5,
      },
      {
        id: 2,
        name: 'Shor summer dress, red, S',
        filling: 'vanilla',
        quantity: 1,
        price: 129.0,
      },
    ],
  },
  {
    id: 2,
    number: 648752,
    date: 'Feb 25, 2023 at 8:32 PM',
    total: 281.85,
    status: 'Delivered',
    delivery: 15,
    discount: 29.65,
    products: [
      {
        id: 1,
        name: 'Small leather backpack, blue',
        quantity: 1,
        price: 167.5,
      },
      {
        id: 2,
        name: 'Shor summer dress, red, S',
        filling: 'vanilla',
        quantity: 1,
        price: 129.0,
      },
    ],
  },
  {
    id: 1,
    number: 648752,
    date: 'Feb 25, 2023 at 8:32 PM',
    total: 281.85,
    status: 'Canceled',
    delivery: 15,
    discount: 29.65,
    products: [
      {
        id: 1,
        name: 'Small leather backpack, blue',
        quantity: 1,
        price: 167.5,
      },
      {
        id: 2,
        name: 'Shor summer dress, red, S',
        filling: 'vanilla',
        quantity: 1,
        price: 129.0,
      },
    ],
  },
];

const notifications = [
  {
    id: 1,
    icon: svg.WarningSvg,
    title: 'Please confirm your email.',
    description:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    date: 'Feb 26, 2023 at 12:36 PM',
  },
  {
    id: 2,
    icon: svg.SuccessSvg,
    title: 'Your support ticket №78912365',
    date: 'Feb 29, 2023 at 12:36 PM',
  },
  {
    id: 3,
    icon: svg.NotificationGiftSvg,
    title: 'Black Friday Sales!',
    image: Images.NotifyImage1,
    description:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    date: 'Feb 29, 2023 at 12:36 PM',
  },
];

const onboardingData = [
  {
    id: 1,
    title: 'Welcome\nto Gazar!',
    description: 'Labore sunt culpa excepteur\nculpa occaecat ex nisi mollit.',
    image: Images.Onboarding1,
    color: theme.colors.white,
  },
  {
    id: 2,
    title: 'Easy Track\nyour Order!',
    description: 'Labore sunt culpa excepteur\nculpa occaecat ex nisi mollit.',
    image: Images.Onboarding2,
    color: theme.colors.black,
  },
  {
    id: 3,
    title: 'Door to Door\nDelivery!',
    description: 'Labore sunt culpa excepteur\nculpa occaecat ex nisi mollit.',
    image: Images.Onboarding3,
    color: theme.colors.black,
  },
];

const categories_1 = [
  {id: 1, title: 'Grapes'},
  {id: 2, title: 'Kiwi'},
  {id: 3, title: 'Donut Peach'},
  {id: 4, title: 'Dragon Fruit'},
  {id: 5, title: 'Pamelo'},
  {id: 6, title: 'Apple & pears'},
];

const listCategories = [
  {id: 1, title: 'GRAPES'},
  {id: 2, title: 'BERRIES'},
  {id: 3, title: 'APPLE'},
  {id: 4, title: 'BRUSHES'},
  {id: 5, title: 'EXOTIC '},
];

const categories = [
  {
    id: 1,
    title: 'Category 1',
    listcateforyId: 4,
    image: Images.Category2Product1,
    quantity: 36,
    isTopCategory: true,
  },
  {
    id: 2,
    title: 'Category 2',
    listcateforyId: 4,
    image: Images.Category2Product2,
    quantity: 621,
    isTopCategory: true,
  },
  {
    id: 3,
    title: 'Category 3',
    listcateforyId: 5,
    image: Images.Category2Product3,
    quantity: 150,
    isTopCategory: true,
  },
  {
    id: 4,
    title: 'Category 4',
    listcateforyId: 5,
    image: Images.Category2Product4,
    quantity: 54,
    isTopCategory: true,
  },
  {
    id: 5,
    title: 'Category 5',
    listcateforyId: 1,
    image: Images.Category2Product5,
    quantity: 112,
    isTopCategory: true,
  },
  {
    id: 6,
    title: 'Category 6',
    listcateforyId: 1,
    image: Images.Category2Product6,
    quantity: 98,
    isTopCategory: true,
  },
  {
    id: 7,
    title: 'Category 7',
    listcateforyId: 1,
    image: Images.category1_V1,
    quantity: 36,
    isTopCategory: false,
  },
  {
    id: 8,
    title: 'Category 8',
    listcateforyId: 1,
    image: Images.category2_V1,
    quantity: 621,
    isTopCategory: true,
  },
  {
    id: 9,
    title: 'Category 9',
    listcateforyId: 2,
    image: Images.FeaturedProduct1,
    quantity: 621,
    isTopCategory: false,
  },
  {
    id: 10,
    title: 'Category 10',
    listcateforyId: 2,
    image: Images.FeaturedProduct2,
    quantity: 621,
    isTopCategory: false,
  },
  {
    id: 11,
    title: 'Category 11',
    listcateforyId: 2,
    image: Images.BestSeller2,
    quantity: 621,
    isTopCategory: false,
  },
  {
    id: 12,
    title: 'Category 12',
    listcateforyId: 3,
    image: Images.category9_V1,
    quantity: 621,
    isTopCategory: true,
  },
  {
    id: 13,
    title: 'Category 13',
    listcateforyId: 3,
    image: Images.category7_V1,
    quantity: 621,
    isTopCategory: false,
  },
  {
    id: 14,
    title: 'Category 14',
    listcateforyId: 2,
    image: Images.category8_V1,
    quantity: 621,
    isTopCategory: true,
  },
];

const categories_2 = [
  {
    id: 1,
    title: 'Dresses',
    image: Images.Category2Product1,
    quantity: 36,
    category: 'men',
  },
  {
    id: 2,
    title: 'Pants',
    image: Images.Category2Product2,
    quantity: 621,
    category: 'men',
  },
  {
    id: 3,
    title: 'Accessories',
    image: Images.Category2Product3,
    quantity: 150,
    category: 'men',
  },
  {
    id: 4,
    title: 'Shoes',
    image: Images.Category2Product4,
    quantity: 54,
    category: 'men',
  },
  {
    id: 5,
    title: 'T - shirts',
    image: Images.Category2Product5,
    quantity: 112,
    category: 'men',
  },
  {
    id: 6,
    title: 'Suits',
    image: Images.Category2Product6,
    quantity: 98,
    category: 'men',
  },
];

const categories_3 = [
  {
    id: 1,
    title: 'Men',
    image: Images.category1_V1,
    quantity: 36,
  },
  {
    id: 2,
    title: 'Women',
    image: Images.category2_V1,
    quantity: 621,
  },
  {
    id: 3,
    title: 'Kids',
    image: Images.category3_V1,
    quantity: 112,
  },
  {
    id: 4,
    title: 'Sport',
    image: Images.category4_V1,
    quantity: 150,
  },
  {
    id: 5,
    title: 'Accessories',
    image: Images.category5_V1,
    quantity: 54,
  },
  {
    id: 6,
    title: 'Decor',
    image: Images.category6_V1,
    quantity: 98,
  },
];

const addresses = [
  {
    id: '1',
    type: 'Home',
    address: '8000 S Kirkland Ave, Chicago, IL 6065...',
    icon: svg.HomeSvg,
  },
  {
    id: '2',
    type: 'Work',
    address: '8000 S Kirkland Ave, Chicago, IL 6066...',
    icon: svg.BriefcaseSvg,
  },
  {
    id: '3',
    type: 'Other',
    address: '8000 S Kirkland Ave, Chicago, IL 6067...',
    icon: svg.MapPinSvg,
  },
];

const promocodes = [
  {
    id: 1,
    name: '20lamplight',
    discount: '20',
    status: 'active',
    valid_till: 'Expire Dec 31, 2023',
  },
  {
    id: 2,
    name: '25%fridaysale',
    discount: '25',
    status: 'active',
    valid_till: 'Expire Dec 31, 2023',
  },
  {
    id: 3,
    name: '10%rooms23',
    discount: '10',
    status: 'expired',
    valid_till: 'Expire in 3 days',
  },
];

const tabs = [
  {
    name: 'Home',
    icon: svg.HomeTabSvg,
  },
  // {
  //   name: 'Categories',
  //   icon: svg.SearchTabSvg,
  // },
  {
    name: 'Order',
    icon: svg.BasketTabSvg,
  },
  {
    name: 'Shop',
    icon: svg.ShopTabSvg,
  },
  {
    name: 'Profile',
    icon: svg.UserTabSvg,
  },
];

const sortingBy = [
  {id: 1, title: 'Best match'},
  {id: 2, title: 'Price: low to high'},
  {id: 3, title: 'Price: high to low'},
  // {id: 4, title: 'Newest'},
  // {id: 5, title: 'Customer rating'},
  // {id: 6, title: 'Most popular'},
];

const payments = [
  {
    id: 1,
    type: 'Card',
    name: 'Card',
  },
  {
    id: 2,
    type: 'Cash',
    name: 'Cash',
  },
  {
    id: 3,
    type: 'Pos',
    name: 'Pos',
  },
  {
    id: 4,
    type: 'Transfer',
    name: 'Transfer',
  },
  {
    id: 5,
    type: 'Idram',
    name: 'Idram',
  },
];

const bannersData: BannerType[] = [
  {
    id: 1,
    image: Images.Banner4_V1,
    title1: 'Spring Discounts',
    title2: 'up to 30% off',
    btnText: 'shop now',
  },
  {
    id: 2,
    image: Images.Banner1_V2,
    title1: 'Spring Discounts',
    title2: 'up to 30% off',
    btnText: 'shop now',
  },
  {
    id: 2,
    image: Images.Banner5,
    title1: 'Spring Discounts',
    title2: 'up to 30% off',
    btnText: 'shop now',
  },
];

const productsData: any = [];

const paymentMethods = [
  {
    id: 1,
    type: 'visa',
    number: ' **** 4864',
    edit: true,
    icon: Images.PaymentVissa,
  },
  {
    id: 2,
    type: 'mastercard',
    number: ' **** 3597',
    edit: true,
    icon: Images.PaymentMastercard,
  },
  {
    id: 3,
    type: 'google-pay',
    plus: true,
    icon: Images.PaymentGooglepay,
  },
  {
    id: 4,
    type: 'apple-pay',
    edit: true,
    icon: Images.PaymentApplepay,
  },
  {
    id: 5,
    type: 'paypal',
    plus: true,
    icon: Images.PaymentPaypal,
  },
];

export {
  bannersData,
  productsData,
  // carouselData,
  history,
  onboardingData,
  categories_1,
  categories_2,
  categories_3,
  addresses,
  promocodes,
  notifications,
  tabs,
  sortingBy,
  payments,
  listCategories,
  categories,
  paymentMethods,
};
