import IconHome from "@/components/icon/icon-home";
import IconOpenBook from "@/components/icon/icon-open-book";
import IconMenuChat from "@/components/icon/menu/icon-menu-chat";
import IconMenuDashboard from "@/components/icon/menu/icon-menu-dashboard";
import IconMenuInvoice from "@/components/icon/menu/icon-menu-invoice";
import IconMenuMailbox from "@/components/icon/menu/icon-menu-mailbox";
import IconMenuTodo from "@/components/icon/menu/icon-menu-todo";

export const ICONS_MENU = {
  dashboard: (
    <IconMenuDashboard className="shrink-0 group-hover:!text-primary" />
  ),
  home: <IconHome className="shrink-0 group-hover:!text-primary" />,
  profile: <IconMenuTodo className="shrink-0 group-hover:!text-primary" />,
  profileSetting: (
    <IconMenuMailbox className="shrink-0 group-hover:!text-primary" />
  ),
  image: <IconMenuChat className="shrink-0 group-hover:!text-primary" />,
  plus: <IconMenuInvoice className="shrink-0 group-hover:!text-primary" />,
  products: <IconOpenBook className="shrink-0 group-hover:!text-primary" />,
};
