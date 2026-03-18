import { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ItemCard from "../components/ItemCard";
import { getItems } from "../services/api";

function BrowseItems() {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await getItems();
        setItems(response.data || []);
      } catch (fetchError) {
        console.error(fetchError);
        setError("Unable to load posts right now.");
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const filteredItems = useMemo(() => {
    const lowerQuery = query.trim().toLowerCase();

    return items.filter((item) => {
      const passesType = typeFilter === "all" ? true : item.type === typeFilter;
      const passesQuery =
        lowerQuery.length === 0
          ? true
          : [item.title, item.description, item.location]
              .filter(Boolean)
              .some((value) => value.toLowerCase().includes(lowerQuery));

      return passesType && passesQuery;
    });
  }, [items, query, typeFilter]);

  return (
    <div className="flex min-h-screen flex-col bg-[radial-gradient(circle_at_12%_10%,rgba(15,118,110,0.2),transparent_34%),radial-gradient(circle_at_88%_20%,rgba(219,124,47,0.14),transparent_30%),linear-gradient(180deg,#f8fbff_0%,#f4f7fb_62%,#edf2f8_100%)] font-[Manrope] text-[#143247]">
      <Navbar />

      <main className="flex-1 py-[38px] pb-14">
        <section className="mx-auto w-[min(1120px,92vw)]">
          <div className="mb-[18px]">
            <h1 className="m-0 text-[clamp(1.9rem,4vw,3rem)] leading-[1.12]">Browse posts</h1>
            <p className="mt-2.5 max-w-[760px] text-[#5f7384]">
              Search by keyword, filter by report type, and open a post to view
              full details and contact information.
            </p>
          </div>

          <div className="rounded-[18px] border border-[rgba(216,224,232,0.95)] bg-[rgba(255,255,255,0.9)] p-[22px] shadow-[0_14px_40px_rgba(14,37,53,0.08)]">
            <div className="mb-4 grid grid-cols-[2fr_1fr] gap-3 max-[720px]:grid-cols-1">
              <input
                className="w-full rounded-[10px] border border-[#d8e0e8] bg-white px-[13px] py-3 text-[0.97rem] text-[#143247] transition focus:border-[#89b8cc] focus:outline-none focus:ring-4 focus:ring-[rgba(18,111,157,0.15)]"
                type="text"
                placeholder="Search by item title, description, or location"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />

              <select
                className="w-full rounded-[10px] border border-[#d8e0e8] bg-white px-[13px] py-3 text-[0.97rem] text-[#143247] transition focus:border-[#89b8cc] focus:outline-none focus:ring-4 focus:ring-[rgba(18,111,157,0.15)]"
                value={typeFilter}
                onChange={(event) => setTypeFilter(event.target.value)}
              >
                <option value="all">All posts</option>
                <option value="lost">Lost only</option>
                <option value="found">Found only</option>
              </select>
            </div>

            {loading ? (
              <p className="mb-[14px] mt-0 font-semibold text-[#5f7384]">Loading posts...</p>
            ) : error ? (
              <div className="rounded-xl border border-dashed border-[#b6c5d2] bg-[#fbfdff] px-[18px] py-[30px] text-center">
                <p className="m-0 text-[1.1rem]">Something went wrong</p>
                <p className="text-[#5f7384]">{error}</p>
              </div>
            ) : filteredItems.length === 0 ? (
              <div className="rounded-xl border border-dashed border-[#b6c5d2] bg-[#fbfdff] px-[18px] py-[30px] text-center">
                <p className="m-0 text-[1.1rem]">No matching posts found</p>
                <p className="text-[#5f7384]">
                  Try a different search term or choose another filter.
                </p>
              </div>
            ) : (
              <>
                <p className="mb-[14px] mt-0 font-semibold text-[#5f7384]">{filteredItems.length} posts found</p>
                <div className="grid grid-cols-3 gap-3.5 max-[1024px]:grid-cols-2 max-[720px]:grid-cols-1">
                  {filteredItems.map((item) => (
                    <ItemCard key={item._id} item={item} />
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default BrowseItems;