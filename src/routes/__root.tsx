import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

// components
import { ModeToggle } from "@/components/shared/ModeToggle";
import Cookies from "js-cookie";
import axios from "axios";

const onClickLogout = async () => {
	try {
	  // Menghapus token dari cookie
	  Cookies.remove('token');
	  
	  await axios.post('http://localhost:3000/auth/logout');
  
	  window.location.href = '/login'; 
	} catch (error) {
	  console.error('Logout failed:', error);
	}
  };

export const Route = createRootRoute({
	component: () => (
		<>
			<div className="p-2 flex gap-2">
				<ModeToggle />
				<div className="flex justify-center items-center gap-2">
					<Link to="/dashboard">
						dashboard
					</Link>
					<Link to="/login">
						Login
					</Link>
					<button onClick={onClickLogout}>Logout</button>
				</div>
			</div>
			<hr />
			<Outlet />
			<TanStackRouterDevtools />
		</>
	),
});
