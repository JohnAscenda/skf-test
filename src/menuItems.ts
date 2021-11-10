interface NavItem {
  title: string;
  children?: NavItem[];
}

const NavItems: NavItem[] = [
  {
    title: "Item 1",
    children: [
      {
        title: "Item 1.1",
        children: [
          {
            title: "Item 1.1.1" /* , children: [{ title: "Item 1.1.1.1" }]  */,
          },
        ],
      },
      { title: "Item 1.2" },
    ],
  },
  {
    title: "Item 2",
    children: [
      {
        title: "Item 2.1",
        children: [
          {
            title: "Item 2.1.1",
            children: [
              {
                title: "Item 2.1.1.1",
                children: [
                  {
                    title: "Item 2.1.1.1.1",
                    children: [
                      {
                        title: "Item 2.1.1.1.1.1",
                        children: [
                          {
                            title: "Item 2.1.1.1.1.1.1.bajs",
                            children: [{ title: "Item 2.1.1.1.1.1.1.1.korv" }],
                          },
                        ],
                      },
                    ],
                  },
                ],
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
