import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ItemCard from "../components/ItemCard";
import { getItems } from "../services/api";

function Home() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await getItems();
        setItems(response.data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const lostCount = useMemo(
    () => items.filter((item) => item.type === "lost").length,
    [items]
  );
  const foundCount = useMemo(
    () => items.filter((item) => item.type === "found").length,
    [items]
  );
  const latestItems = useMemo(() => items.slice(0, 3), [items]);

  return (
    <div className="flex min-h-screen flex-col bg-[radial-gradient(circle_at_12%_10%,rgba(15,118,110,0.2),transparent_34%),radial-gradient(circle_at_88%_20%,rgba(219,124,47,0.14),transparent_30%),linear-gradient(180deg,#f8fbff_0%,#f4f7fb_62%,#edf2f8_100%)] font-[Manrope] text-[#143247]">
      <Navbar />

      <main className="flex-1 py-[38px] pb-14">
        <section className="mx-auto w-[min(1120px,92vw)] rounded-[28px] border border-[rgba(200,213,224,0.95)] bg-[linear-gradient(135deg,rgba(255,255,255,0.92),rgba(242,250,249,0.9)),radial-gradient(circle_at_84%_0%,rgba(18,111,157,0.2),transparent_38%)] p-[42px] shadow-[0_14px_40px_rgba(14,37,53,0.08)] max-[720px]:p-6">
          <h1 className="m-0 text-[clamp(1.9rem,4vw,3rem)] leading-[1.12]">Report, browse, and reconnect lost belongings faster.</h1>
          <p className="mb-7 mt-3.5 max-w-[740px] text-[1.05rem] text-[#5f7384]">
            A simple and trustworthy space for your community to post lost or
            found items and help each other recover what matters.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              className="inline-flex items-center justify-center rounded-xl border border-transparent bg-[linear-gradient(130deg,#0f766e,#126f9d)] px-[18px] py-3 font-bold text-white shadow-[0_12px_28px_rgba(15,118,110,0.25)] transition duration-150 hover:-translate-y-px hover:shadow-[0_16px_30px_rgba(15,118,110,0.34)]"
              to="/report-lost"
            >
              Report Lost Item
            </Link>
            <Link
              className="inline-flex items-center justify-center rounded-xl border border-[#d8e0e8] bg-white px-[18px] py-3 font-bold text-[#143247] transition duration-150 hover:-translate-y-px"
              to="/report-found"
            >
              Report Found Item
            </Link>
            <Link
              className="inline-flex items-center justify-center rounded-xl border border-[#d8e0e8] bg-white px-[18px] py-3 font-bold text-[#143247] transition duration-150 hover:-translate-y-px"
              to="/browse"
            >
              Browse Posts
            </Link>
          </div>

          <div className="mt-[26px] grid grid-cols-3 gap-3.5 max-[720px]:grid-cols-1">
            <article className="rounded-xl border border-[#d8e0e8] bg-white p-3.5">
              <strong className="mb-0.5 block text-[1.35rem]">{items.length}</strong>
              <span>Total posts</span>
            </article>
            <article className="rounded-xl border border-[#d8e0e8] bg-white p-3.5">
              <strong className="mb-0.5 block text-[1.35rem]">{lostCount}</strong>
              <span>Lost reports</span>
            </article>
            <article className="rounded-xl border border-[#d8e0e8] bg-white p-3.5">
              <strong className="mb-0.5 block text-[1.35rem]">{foundCount}</strong>
              <span>Found reports</span>
            </article>
          </div>
        </section>

        <section className="mx-auto mt-[22px] w-[min(1120px,92vw)]">
          <div className="mb-[18px]">
            <h1 className="m-0 text-[1.65rem] leading-[1.12]">Recent posts</h1>
            <p className="mt-2.5 max-w-[760px] text-[#5f7384]">Latest activity from the lost and found feed.</p>
          </div>

          <div className="rounded-[18px] border border-[rgba(216,224,232,0.95)] bg-[rgba(255,255,255,0.9)] p-[22px] shadow-[0_14px_40px_rgba(14,37,53,0.08)]">
            {loading ? (
              <p className="mb-[14px] mt-0 font-semibold text-[#5f7384]">Loading posts...</p>
            ) : latestItems.length > 0 ? (
              <div className="grid grid-cols-3 gap-3.5 max-[1024px]:grid-cols-2 max-[720px]:grid-cols-1">
                {latestItems.map((item) => (
                  <ItemCard key={item._id} item={item} />
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-[#b6c5d2] bg-[#fbfdff] px-[18px] py-[30px] text-center">
                <p className="m-0 text-[1.1rem]">No posts yet</p>
                <p className="text-[#5f7384]">
                  Be the first to add a report and help someone recover an item.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Home;