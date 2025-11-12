interface Props {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}

import css from '@/components/SidebarNotes/SidebarNotes.module.css'

const Sidebar = ({ sidebar, children }: Props) => {

  return (
    <section className={css.both}>
      <aside>{sidebar}</aside>
      <div className={css.notes}>{children}</div>
    </section>
  );
};

export default Sidebar;
