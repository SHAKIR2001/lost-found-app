import { NavLink } from "react-router-dom";

const links = [
	{ to: "/", label: "Home", end: true },
	{ to: "/browse", label: "Browse Posts" },
	{ to: "/report-lost", label: "Report Lost" },
	{ to: "/report-found", label: "Report Found" }
];

function Navbar() {
	return (
		<header className="site-header">
			<div className="container header-inner">
				<NavLink to="/" className="brand" aria-label="Lost and Found home">
					<span className="brand-dot" />
					Lost and Found Desk
				</NavLink>

				<nav className="main-nav" aria-label="Main navigation">
					{links.map((link) => (
						<NavLink
							key={link.to}
							to={link.to}
							end={link.end}
							className={({ isActive }) =>
								`nav-link${isActive ? " active" : ""}`
							}
						>
							{link.label}
						</NavLink>
					))}
				</nav>
			</div>
		</header>
	);
}

export default Navbar;
