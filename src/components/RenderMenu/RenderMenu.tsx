import { useState } from "react";
import arrow from "../../assets/icons/arrow.png";
import "./RenderMenu.scss";

export interface NavItem {
  name: string;
  children: NavItem[] | undefined;
}

interface RenderMenuProps {
  items: NavItem[] | undefined;
  topLevel?: boolean;
  selectedItem: string | null;
  setSelectedItem: React.Dispatch<React.SetStateAction<string | null>>;
}

const RenderMenu = ({
  items,
  topLevel = false,
  selectedItem,
  setSelectedItem,
}: RenderMenuProps) => {
  const [activeMenus, setActiveMenus] = useState<String[]>(([] = Array()));

  const toggleSubMenu = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    item: NavItem
  ) => {
    e.stopPropagation();

    if (!item.children) {
      setSelectedItem(item.name);
    }

    console.log(item.name);

    const newItems = [...activeMenus];

    if (activeMenus.includes(item.name)) {
      var index = newItems.indexOf(item.name);
      if (index > -1) {
        newItems.splice(index, 1);
      }
    } else {
      if (item.children === undefined) return;
      newItems.push(item.name);
    }

    setActiveMenus(newItems);
  };

  return (
    <ul className="menu">
      {items?.map(({ name, children }: NavItem, index) => (
        <li
          key={index}
          className={`${topLevel ? "topNode" : ""} ${
            selectedItem === name ? "selectedItem" : ""
          }`}
          onClick={(e) => items[index] && toggleSubMenu(e, items[index])}
        >
          <div className="name">
            {name}

            {children && (
              <img
                className={activeMenus.includes(name) ? "expanded" : ""}
                src={arrow}
                alt=""
              />
            )}
          </div>

          {children && activeMenus.includes(name) ? (
            <RenderMenu
              items={children}
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
            />
          ) : null}
        </li>
      ))}
    </ul>
  );
};

export default RenderMenu;
