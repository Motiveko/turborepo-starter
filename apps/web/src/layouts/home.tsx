import { API } from "@web/api";
import { Button } from "@web/components/ui/button";
import type { ReactNode } from "react";
import { Link, Outlet } from "react-router";

interface HomeLayoutProps {
  children?: ReactNode;
}

function Divider() {
  return <span className="mx-2">|</span>;
}
function HomeLayout({ children }: HomeLayoutProps): JSX.Element {
  return (
    <div className="w-[100vw] h-[100vh] flex flex-col">
      <header className="flex justify-between py-2 px-5">
        <nav className="p-2">
          <Link to="/">Home</Link> <Divider />
          <Link to="/about">About</Link> <Divider />
          <Link to="/Todo">Todo</Link> <Divider />
          <Link to="/Login">Login</Link>
        </nav>
        <div>
          <Button onClick={API.user.logout}>Logout</Button>
        </div>
      </header>
      <main className="flex-1 flex justify-center items-center">
        {children || <Outlet />}
      </main>
      <footer className="flex justify-center items-center p-2">
        <p>© 2025 My turborepo-starter</p>
      </footer>
    </div>
  );
}

export default HomeLayout;
