interface NavItem {
  title: string;
  children?: NavItem[];
}

const NavItems: NavItem[] = [
  {
    title: "Dashboard",
    children: [
      {
        title: "Skills",
        children: [
          {
            title: "React",
            children: [{ title: "Hooks" }],
          },
          {
            title: "HTML",
          },
          {
            title: "CSS",
          },
        ],
      },
    ],
  },
  {
    title: "Profiles",
    children: [
      {
        title: "John",
        children: [
          {
            title: "Work",
            children: [
              {
                title: "Ascenda AA",
              },
              {
                title: "Ascenda AB",
              },
              {
                title: "Ascenda AC",
              },
              {
                title: "Ascenda AD",
              },
            ],
          },
        ],
      },
    ],
  },
  { title: "Item 3" },
];

export default NavItems;
