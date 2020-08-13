const Menu = [
  { header: "Apps" },
  {
    title: "Dashboard",
    group: "apps",
    icon: "mdi-view-dashboard",
    name: "Dashboard",
    href: "/admin",
    roles: "Admin|Gestor"
  },
  { header: "Sistema" },

  {
    title: "Users and Accounts",
    group: "sys",
    component: "sys",
    icon: "mdi-account-multiple",

    items: [
      {
        name: "users",
        title: "Users",
        href: "/admin/users",
        roles: "Admin|Gestor"
      }
    ]
  },

  { header: "Negócio" },

  {
    title: "Minha Empresa",
    group: "buisnis",
    component: "buisnis",
    icon: "mdi-domain",
    items: [
      {
        name: "companies",
        title: "Company",
        href: "/admin/companies",
        roles: "Admin|Gestor"
      },
      {
        name: "properties",
        title: "Preperties",
        href: "/admin/properties",
        roles: "Admin|Gestor"
      }
    ]
  },

  { header: "UI Elements" },

  { divider: true },
  { header: "Extras" },
  {
    title: "Login",
    group: "extra",
    icon: "mdi-login",
    href: "/",
    roles: "Admsin|Gesetor"
  }
];
// reorder menu
Menu.forEach(item => {
  if (item.items) {
    item.items.sort((x, y) => {
      let textA = x.title.toUpperCase();
      let textB = y.title.toUpperCase();
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    });
  }
});

export default Menu;
