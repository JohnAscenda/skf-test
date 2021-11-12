import { useState, useEffect } from "react";
import "./App.scss";
import Rive, { useRive } from "rive-react";
import Header from "./components/Header/Header";
import RenderMenu, { NavItem } from "./components/RenderMenu/RenderMenu";
import axios from "axios";
import logo from "./assets/icons/skf-logo.svg";
import SkeletonLoader from "./components/SkeletonLoader/SkeletonLoader";
//@ts-ignore
import rive from "./assets/rive/birb.riv";

interface MenuResponse {
  data: NavItem[];
}

function App() {
  const [selectedItem, setSelectedItem] = useState<null | string>(null);
  const [menu, setMenu] = useState<NavItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get<MenuResponse>(
        "https://run.mocky.io/v3/c271c3f4-8dfc-4983-9408-45fd8c66c9fb"
      )
      .then((res) => {
        setMenu(res.data.data);
      })
      .catch((err) => {
        console.log(err.toJSON());
      })
      .finally(() => {
        //Faking delay from server, for animation
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
          <Rive src={rive} />
          <h2>{selectedItem}</h2>
        </div>
      </main>
    </div>
  );
}

export default App;
