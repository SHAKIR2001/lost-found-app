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
	const typeClass =
		item.type === "lost"
			? "inline-flex items-center rounded-full bg-[#fce8e4] px-2.5 py-[5px] text-[0.78rem] font-bold uppercase tracking-[0.03em] text-[#9a2516]"
			: "inline-flex items-center rounded-full bg-[#dff4f0] px-2.5 py-[5px] text-[0.78rem] font-bold uppercase tracking-[0.03em] text-[#0d5f58]";

	return (
		<Link
			className="block overflow-hidden rounded-xl border border-[#d8e0e8] bg-white transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_15px_26px_rgba(16,44,62,0.12)]"
			to={`/item/${item._id}`}
		>
			<img
				className="h-[180px] w-full object-cover bg-[linear-gradient(160deg,#dce7f2,#f4f8fb)] max-[720px]:h-[240px]"
				src={item.image || placeholderImage}
				alt={item.title || "Item"}
				loading="lazy"
			/>

			<div className="p-3.5">
				<div className="mb-2 flex items-center justify-between gap-2.5">
					<span className={typeClass}>{item.type}</span>
				</div>

				<h3 className="m-0 text-[1.05rem] leading-[1.25]">{item.title}</h3>
				<p className="mt-2 text-[0.91rem] text-[#5f7384]">{item.location}</p>
				<p className="mt-2 text-[0.91rem] text-[#5f7384]">{formatDate(item.date)}</p>
			</div>
		</Link>
	);
}

export default ItemCard;
