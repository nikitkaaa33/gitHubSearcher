import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
	return (
		<nav className="flex justify-between items-center h-[50px] px-5 shadow-md bg-gray-500 text-white">
			<h3 className="font-bold">GitHub search by nikitkaaa33</h3>
			<span>
				<Link to="/" className="mr-2">
					HomePage
				</Link>
				<Link to="favourites">Favoutites</Link>
			</span>
		</nav>
	);
};

export default Navigation;
