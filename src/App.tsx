import { useState, useEffect } from "react";
import "./App.scss";
import Header from "./components/Header/Header";
import MenuItems from "./menuItems";

import arrow from "./assets/icons/arrow.png";

interface NavItem {
  title: string;
  children?: NavItem[];
}

interface RenderMenuProps {
  items: NavItem[] | undefined;
}

function App() {
  const [activeMenus, setActiveMenus] = useState(Array());
  const [selectedItem, setSelectedItem] = useState<null | string>(null);

  const RenderMenu = ({ items }: RenderMenuProps) => {
    const applyTopNodeStyle = () => {
      var x = document.querySelector("ul");
      var y = x?.children;
      if (y) {
        for (var i = 0; i < y.length; i++) {
          y[i].classList.add("topNode");
        }
      }
    };

    useEffect(() => {
      applyTopNodeStyle();
    }, []);

    return (
      <ul className={"menu"}>
        {items?.map(({ title, children }: NavItem, index) => (
          <li
            key={index}
            className={`${children ? "hasChildren" : ""} ${
              selectedItem === title ? "selectedItem" : ""
            } ${items[index].children === undefined ? "hasNoChildren" : ""} `}
            onClick={(e) => items[index] && toggleSubMenu(e, items[index])}
          >
            <div className={"name"}>
              {title}

              {children && (
                <img
                  className={activeMenus.includes(children) ? "expanded" : ""}
                  src={arrow}
                  alt={""}
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

  const toggleSubMenu = (e: React.SyntheticEvent, item: NavItem) => {
    e.stopPropagation();

    if (!item.children) {
      setSelectedItem(item.title);
    }

    console.log(item.title);

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
    <div className={"app"}>
      <Header className="header" />
      <div className="menuContainer">
        <img src="#" alt="skf" style={{ marginBottom: "120px" }} />
        <RenderMenu items={MenuItems} />
      </div>
      <main style={{ display: "grid", placeItems: "center" }}>
        <h2>{selectedItem}</h2>
      </main>
    </div>
  );
}

export default App;
