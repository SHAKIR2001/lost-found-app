import { Link } from "react-router-dom";

function Footer() {
	return (
		<footer className="border-t border-[rgba(216,224,232,0.9)] bg-[rgba(255,255,255,0.8)]">
			<div className="mx-auto flex w-[min(1120px,92vw)] flex-wrap items-center justify-between gap-2.5 py-4">
				<p className="text-[#5f7384]">A safer way to reunite people with their items.</p>
			</div>
		</footer>
	);
}

export default Footer;
