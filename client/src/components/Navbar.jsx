import { NavLink } from "react-router-dom";

const links = [
	{ to: "/", label: "Home", end: true },
	{ to: "/browse", label: "Browse Posts" },
	{ to: "/report-lost", label: "Report Lost" },
	{ to: "/report-found", label: "Report Found" }
];

function Navbar() {
	return (
		<header className="sticky top-0 z-20 border-b border-[#d8e0e8cc] bg-[rgba(255,255,255,0.84)] backdrop-blur-[14px]">
			<div className="mx-auto flex h-[76px] w-[min(1120px,92vw)] items-center justify-between gap-3.5 max-[720px]:h-auto max-[720px]:flex-col max-[720px]:items-start max-[720px]:py-3">
				<NavLink
					to="/"
					className="inline-flex items-center gap-2.5 text-[1.15rem] font-extrabold tracking-[0.02em]"
					aria-label="Lost and Found home"
				>
					<span className="h-3 w-3 rounded-full bg-[linear-gradient(130deg,#db7c2f,#0f766e)] shadow-[0_0_0_4px_rgba(15,118,110,0.14)]" />
					Lost and Found Desk
				</NavLink>

				<nav className="flex flex-wrap items-center justify-end gap-2 max-[720px]:w-full max-[720px]:justify-start" aria-label="Main navigation">
					{links.map((link) => (
						<NavLink
							key={link.to}
							to={link.to}
							end={link.end}
							className={({ isActive }) =>
								[
									"rounded-full border px-3.5 py-2.5 text-sm font-semibold transition-all duration-200",
									isActive
										? "border-transparent bg-[linear-gradient(130deg,#0f766e,#126f9d)] text-white shadow-[0_8px_20px_rgba(15,118,110,0.28)]"
										: "border-transparent text-[#5f7384] hover:border-[#d8e0e8] hover:bg-[rgba(255,255,255,0.75)] hover:text-[#143247]"
								].join(" ")
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
