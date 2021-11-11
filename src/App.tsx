import { useState, useEffect } from "react";
import "./App.scss";
import Header from "./components/Header/Header";
import axios from "axios";
import arrow from "./assets/icons/arrow.png";
import logo from "./assets/icons/skf-logo.svg";
import musicBird from "./assets/images/music_bird.png";

interface NavItem {
  name: string;
  children: NavItem[] | undefined;
}

interface MenuResponse {
  data: NavItem[];
}

interface RenderMenuProps {
  items: NavItem[] | undefined;
  topLevel?: boolean;
}

function App() {
  const [activeMenus, setActiveMenus] = useState<String[]>(Array());
  const [selectedItem, setSelectedItem] = useState<null | string>(null);
  const [menu, setMenu] = useState<NavItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get<MenuResponse>("./backend/menu.json")
      .then((res) => {
        setMenu(res.data.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const RenderMenu = ({ items, topLevel = false }: RenderMenuProps) => {
    return (
      <ul className="menu">
        {items?.map(({ name, children }: NavItem, index) => (
          <li
            key={index}
            className={`
              ${topLevel && "topNode"} 
              ${children && "hasChildren"} 
              ${selectedItem === name ? "selectedItem" : ""}  
            `}
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
              <RenderMenu items={children} />
            ) : null}
          </li>
        ))}
      </ul>
    );
  };

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
    <div className="app">
      <Header className="header" />
      <div className="menuContainer">
        <img src={logo} alt="" />
        {!loading && <RenderMenu items={menu} topLevel={true} />}
      </div>
      <main style={{ display: "grid", placeItems: "center" }}>
        <div>
          <img src={musicBird} alt="" />
          <h2>{selectedItem}</h2>
        </div>
      </main>
    </div>
  );
}

export default App;
