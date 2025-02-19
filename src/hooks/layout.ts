import { create } from "zustand";
import toast from "react-hot-toast";

type TLayoutStore = {
  sidebarOpen: boolean;
  minimizeSidebar: boolean;
  minimizeSubMenu: string[];
};

const layoutStore = create<TLayoutStore>(() => ({
  sidebarOpen: true,
  minimizeSidebar: false,
  minimizeSubMenu: [],
}));

export const useLayout = () => {
  const { ...layout } = layoutStore((e) => e);

  const setToast = ({
    success,
    error,
    massage,
  }: {
    success?: boolean;
    error?: boolean;
    massage: string;
  }) => {
    if (success) toast.success(massage);
    if (error) toast.error(massage);
  };

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
  return {
    ...layout,
    setSidebarOpen,
    setMinimizeSidebar,
    setMinimizeSubMenu,
    setToast,
  };
};
