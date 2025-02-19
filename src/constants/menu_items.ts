export const MENU_ITEMS = [
  {
    name: "Dashboard",
    icon: "dashboard",
    link: "/",
  },
  {
    name: "Home",
    icon: "home",
    link: "/home",
  },
  {
    name: "Profile",
    icon: "profile",
    children: [
      {
        name: "Setting",
        icon: "profileSetting",
        link: "/profile",
      },
      {
        name: "Image",
        icon: "image",
        link: "/profile/image",
      },
    ],
  },
  {
    name: "Create",
    icon: "plus",
    link: "/create",
  },
  {
    name: "Products",
    icon: "products",
    children: [
      {
        name: "Product",
        icon: "Product",
        link: "/product",
      },
      {
        name: "Category",
        icon: "productCategory",
        link: "/product/category",
      },
    ],
  },
];
