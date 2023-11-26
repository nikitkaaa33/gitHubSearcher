import React, { useState } from "react";
import { IRepo } from "../models/models";
import { useActions } from "../hooks/actions";
import { useAppSelector } from "../hooks/redux";

const RepoCard = ({ repo }: { repo: IRepo }) => {
	const { addFavourite, removeFavourite } = useActions();
	const { favourites } = useAppSelector((state) => state.github);

	const [isFav, setIsFav] = useState(favourites.includes(repo.html_url));

	const addToFavourite = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		setIsFav(true);
		addFavourite(repo.html_url);
	};

	const removeFromFavourite = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setIsFav(false);

		removeFavourite(repo.html_url);
	};

	return (
		<a href={repo.html_url} target="_blank">
			<div className="border py-3 px-5 rounded mb-1 hover:shadow-md hover:bg-cyan-100 transition-all">
				<h2 className="text-lg font-bold">{repo.full_name}</h2>
				<p className="text-sm">
					Forks: <span className="font-bold mr-2">{repo.forks}</span>
					Watchers: <span className="font-bold">{repo.watchers}</span>
				</p>
				<p className="text-sm font-thin">{repo?.description}</p>
				<p className="text-sm font-thin">
					Updated at: {repo.updated_at.slice(0, -1)}
				</p>
				<p className="text-sm font-thin">
					Language:{" "}
					<span className="font-bold">{repo.language!}</span>
				</p>
			</div>
			{!isFav && (
				<button
					className="py-2 px-6 mb-2 bg-blue-400 mr-2 rounded hover:shadow-md transition-all"
					onClick={addToFavourite}
				>
					Add to favoutite
				</button>
			)}
			{isFav && (
				<button
					className="py-2 px-2 mb-2 bg-red-400 rounded hover:shadow-md transition-all"
					onClick={removeFromFavourite}
				>
					Remove
				</button>
			)}
		</a>
	);
};

export default RepoCard;
