import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

// components
import { ModeToggle } from "@/components/shared/ModeToggle";
import Cookies from "js-cookie";
import axios from "axios";
import { checkIsLoggedIn } from "@/utils/helper"
import { useEffect, useState } from "react";


  const Navigation = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
  
	useEffect(() => {
	  const fetchLoginStatus = async () => {
		const loggedIn = await checkIsLoggedIn();
		setIsLoggedIn(loggedIn);
	  };
  
	  fetchLoginStatus();
	}, [isLoggedIn]);
  
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
  
	return (
	  <div>
		<div className="p-2 flex gap-2">
		  <ModeToggle />
		  <div className="flex justify-center items-center gap-2">
			<Link to="/">
			  Home
			</Link>
			<Link to="/dashboard">
			  Dashboard
			</Link>
			{isLoggedIn ? (
			  <button onClick={onClickLogout}>Logout</button>
			) : (
			  <Link to="/login">
				Login
			  </Link>
			)}
		  </div>
		</div>
		<hr />
		<Outlet />
		<TanStackRouterDevtools />
	  </div>
	);
  };

export const Route = createRootRoute({
	component: Navigation 
});