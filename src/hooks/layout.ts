import { create } from "zustand";

type TLayoutStore = {
  sidebarOpen: boolean;
  minimizeSidebar: boolean;
  minimizeSubMenu: string[];
};

const layoutStore = create<TLayoutStore>((set) => ({
  sidebarOpen: true,
  minimizeSidebar: false,
  minimizeSubMenu: [],
}));

export const useLayout = () => {
  const { ...layout } = layoutStore((e) => e);

  const setSidebarOpen = (open: boolean) => {
    layoutStore.setState({ sidebarOpen: open });
  };
  const setMinimizeSidebar = (set: boolean) => {
    layoutStore.setState({ minimizeSidebar: set });
  };
  const setMinimizeSubMenu = (name: string) => {
    if (layout.minimizeSubMenu.includes(name)) {
      layoutStore.setState({
        minimizeSubMenu: layout.minimizeSubMenu.filter((e) => e !== name),
      });
    } else {
      layoutStore.setState({
        minimizeSubMenu: [...layout.minimizeSubMenu, name],
      });
    }
  };
  return { ...layout, setSidebarOpen, setMinimizeSidebar, setMinimizeSubMenu };
};
