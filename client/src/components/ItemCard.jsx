import { Link } from "react-router-dom";

const placeholderImage =
	"https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=900&q=80";

const formatDate = (value) => {
	if (!value) return "Date not available";

	const parsed = new Date(value);
	if (Number.isNaN(parsed.getTime())) return "Date not available";

	return parsed.toLocaleDateString(undefined, {
		year: "numeric",
		month: "short",
		day: "numeric"
	});
};

function ItemCard({ item }) {
	const typeClass = item.type === "lost" ? "pill pill-lost" : "pill pill-found";

	return (
		<Link className="item-card" to={`/item/${item._id}`}>
			<img
				className="item-media"
				src={item.image || placeholderImage}
				alt={item.title || "Item"}
				loading="lazy"
			/>

			<div className="item-body">
				<div className="item-topline">
					<span className={typeClass}>{item.type}</span>
				</div>

				<h3 className="item-title">{item.title}</h3>
				<p className="item-meta">{item.location}</p>
				<p className="item-meta">{formatDate(item.date)}</p>
			</div>
		</Link>
	);
}

export default ItemCard;
