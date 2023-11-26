/* eslint-disable no-func-assign */
import React, { useEffect, useState } from "react";
import {
	useLazyGetUserReposQuery,
	useSearchUsersQuery,
} from "../store/github/github.api";
import { useDebounce } from "../hooks/debounce";
import RepoCard from "../components/RepoCard";

const HomePage = () => {
	const [search, setSeach] = useState("");
	const [dropDown, setDropDown] = useState(false);
	const debounced = useDebounce(search);
	const { isLoading, isError, data } = useSearchUsersQuery(debounced, {
		skip: debounced.length < 3,
		refetchOnFocus: true,
	});
	const [fetchRepos, { isLoading: areReposLoading, data: repos }] =
		useLazyGetUserReposQuery();

	useEffect(() => {
		setDropDown(debounced.length > 3 && data?.length! > 0);
	}, [debounced, data]);

	function clickHandler(username: string): void {
		fetchRepos(username);
		setDropDown(false);
	}

	return (
		<div className="flex justify-center pt-10 mx-auto h-screen">
			{isError && (
				<p className="text-center text-red-600">Something went wrong</p>
			)}
			<div className="relative w-[560px]">
				<input
					type="text"
					className="border py-2 w-full px-4 h-[42px] mb-2"
					placeholder="Search for GitHub username"
					value={search}
					onChange={(e) => setSeach(e.target.value)}
				/>
				{dropDown && (
					<ul className="list-none absolute top-[42px] overflow-y-scroll left-0 right-0 max-h-[200px] shadow-md bg-white">
						{isLoading && <p className="text-center">Loading...</p>}
						{data?.map((user) => (
							<li
								key={user.id}
								className="flex flex-row py-2 px-4 hover:bg-gray-500
						hover:text-white cursor-pointer border"
								onClick={() => clickHandler(user.login)}
							>
								<img
									className="w-[25px] mr-2"
									src={user.avatar_url}
									alt=""
								/>
								{user.login}
							</li>
						))}
					</ul>
				)}
				<div className="container">
					{areReposLoading && (
						<p className="text-center">Repos are loading...</p>
					)}
					{repos?.map((repo) => (
						<RepoCard repo={repo} key={repo.id} />
					))}
				</div>
			</div>
		</div>
	);
};

export default HomePage;
