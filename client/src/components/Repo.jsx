import React from 'react';

let Repo = ({repo}) => {
	return (
		<div>
			<a href={repo.html_url}>
				{repo.full_name}: {repo.forks} fork\(s\)
			</a>
		</div>
		);
};

export default Repo;