import "./App.scss";
import Header from "./components/Header/Header";
import RenderMenu from "./components/RenderMenu/RenderMenu";
import MenuItems from "./menuItems";

function App() {
  return (
    <div className={"app"}>
      <Header />
      <RenderMenu items={MenuItems} />
    </div>
  );
}

export default App;
