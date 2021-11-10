import { useState, useEffect } from "react";
import "./RenderMenu.scss";
import arrow from "../../assets/icons/arrow.png";

interface NavItem {
  title: string;
  children?: NavItem[];
}

interface RenderMenuProps {
  items: NavItem[] | undefined;
}

const RenderMenu = ({ items }: RenderMenuProps) => {
  const [activeMenus, setActiveMenus] = useState(([] = Array()));
  const [selectedItem, setSelectedItem] = useState<null | string>(null);

  useEffect(() => {
    console.log(activeMenus);
  }, [activeMenus]);

  const toggleSubMenu = (e: React.SyntheticEvent, item: NavItem) => {
    e.stopPropagation();

    if (!item.children) {
      console.log("item: ", item.title);
      setSelectedItem(item.title);
    }

    const newItems = [...activeMenus];

    if (activeMenus.includes(item.children)) {
      var index = newItems.indexOf(item.children);
      if (index > -1) {
        newItems.splice(index, 1);
      }
    } else {
      if (item.children === undefined) return;
      newItems.push(item.children);
    }

    setActiveMenus(newItems);
  };

  return (
    <ul className={"menu"}>
      {items?.map(({ title, children }: NavItem, index) => (
        <li
          key={index}
          className={`${children ? "hasChildren" : ""} ${
            selectedItem === title ? "selectedItem" : ""
          }`}
          onClick={(e) => items[index] && toggleSubMenu(e, items[index])}
        >
          <div className={"name"}>
            {title}

            {children && (
              <img
                className={activeMenus.includes(children) ? "expanded" : ""}
                src={arrow}
              />
            )}
          </div>

          {activeMenus.includes(items[index].children) ? (
            <RenderMenu items={children} />
          ) : null}
        </li>
      ))}
    </ul>
  );
};

export default RenderMenu;
