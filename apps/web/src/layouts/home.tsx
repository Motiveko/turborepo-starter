import { ReactNode } from "react";
import { Link, Outlet } from "react-router";

interface HomeLayoutProps {
  children?: ReactNode;
}
function HomeLayout({ children }: HomeLayoutProps): JSX.Element {
  return (
    <div className="w-[100vw] h-[100vh] flex flex-col">
      <header>
        <nav>
          <Link to="/">Home</Link> | <Link to="/about">About</Link> |{" "}
          <Link to="/Todo">Todo</Link>
        </nav>
      </header>
      <main className="flex-1 flex justify-center items-center">
        {children || <Outlet />}
      </main>
      <footer>
        <p>© 2025 My turborepo-starter</p>
      </footer>
    </div>
  );
}

export default HomeLayout;
