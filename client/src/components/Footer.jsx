import { Link } from "react-router-dom";

function Footer() {
	return (
		<footer className="footer">
			<div className="container footer-inner">
				<p className="footer-copy">A safer way to reunite people with their items.</p>

				<div className="footer-links" aria-label="Footer links">
					<Link to="/browse">Browse</Link>
					<Link to="/report-lost">Report Lost</Link>
					<Link to="/report-found">Report Found</Link>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
