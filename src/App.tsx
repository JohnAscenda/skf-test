import { useState, useEffect } from "react";
import "./App.scss";
import Header from "./components/Header/Header";
import RenderMenu, { NavItem } from "./components/RenderMenu/RenderMenu";
import axios from "axios";
import musicBird from "./assets/images/music_bird.png";
import logo from "./assets/icons/skf-logo.svg";
import SkeletonLoader from "./components/SkeletonLoader/SkeletonLoader";

interface MenuResponse {
  data: NavItem[];
}

function App() {
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
        //Faking delay from server as it's local, for animation
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      });
  }, []);

  return (
    <div className="app">
      <Header className="header" />
      <div className={"menuContainer"}>
        <img src={logo} alt="logo for skf" />
        {loading ? (
          <SkeletonLoader />
        ) : (
          <RenderMenu
            topLevel={true}
            items={menu}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
          />
        )}
      </div>
      <main>
        <div>
          <img src={musicBird} alt="bird" />
          <h2>{selectedItem}</h2>
        </div>
      </main>
    </div>
  );
}

export default App;
