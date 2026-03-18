import { Link, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getItemById } from "../services/api";

const placeholderImage =
  "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=900&q=80";

function ItemDetails() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchItem = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await getItemById(id);
        setItem(response.data);
      } catch (fetchError) {
        console.error(fetchError);
        setError("Unable to load this post.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchItem();
    }
  }, [id]);

  const formattedDate = useMemo(() => {
    if (!item?.date) return "Date not available";

    const parsed = new Date(item.date);
    if (Number.isNaN(parsed.getTime())) return "Date not available";

    return parsed.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  }, [item]);

  return (
    <div className="flex min-h-screen flex-col bg-[radial-gradient(circle_at_12%_10%,rgba(15,118,110,0.2),transparent_34%),radial-gradient(circle_at_88%_20%,rgba(219,124,47,0.14),transparent_30%),linear-gradient(180deg,#f8fbff_0%,#f4f7fb_62%,#edf2f8_100%)] font-[Manrope] text-[#143247]">
      <Navbar />

      <main className="flex-1 py-[38px] pb-14">
        <section className="mx-auto w-[min(1120px,92vw)]">
          <div className="mb-[18px]">
            <h1 className="m-0 text-[clamp(1.9rem,4vw,3rem)] leading-[1.12]">Post details</h1>
            <p className="mt-2.5 max-w-[760px] text-[#5f7384]">Review complete information and contact details for this post.</p>
          </div>

          {loading ? (
            <div className="rounded-[18px] border border-[rgba(216,224,232,0.95)] bg-[rgba(255,255,255,0.9)] p-[22px] shadow-[0_14px_40px_rgba(14,37,53,0.08)]">
              <p className="mb-[14px] mt-0 font-semibold text-[#5f7384]">Loading details...</p>
            </div>
          ) : error || !item ? (
            <div className="rounded-[18px] border border-[rgba(216,224,232,0.95)] bg-[rgba(255,255,255,0.9)] p-[22px] shadow-[0_14px_40px_rgba(14,37,53,0.08)]">
              <div className="rounded-xl border border-dashed border-[#b6c5d2] bg-[#fbfdff] px-[18px] py-[30px] text-center">
                <p className="m-0 text-[1.1rem]">Post not available</p>
                <p className="text-[#5f7384]">{error || "This post does not exist."}</p>
                <Link
                  className="inline-flex items-center justify-center rounded-xl border border-[#d8e0e8] bg-white px-[18px] py-3 font-bold text-[#143247] transition duration-150 hover:-translate-y-px"
                  to="/browse"
                >
                  Back to browse
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-[1.15fr_0.85fr] gap-[18px] max-[1024px]:grid-cols-1">
              <article className="rounded-[18px] border border-[rgba(216,224,232,0.95)] bg-[rgba(255,255,255,0.9)] p-[22px] shadow-[0_14px_40px_rgba(14,37,53,0.08)]">
                <img
                  className="h-[330px] w-full rounded-xl object-cover bg-[linear-gradient(160deg,#dce7f2,#f4f8fb)] max-[720px]:h-[240px]"
                  src={item.image || placeholderImage}
                  alt={item.title || "Item"}
                />

                <div className="mt-[18px]">
                  <div className="mb-2 mt-3.5 flex items-center justify-between gap-2.5">
                    <span
                      className={
                        item.type === "lost"
                          ? "inline-flex items-center rounded-full bg-[#fce8e4] px-2.5 py-[5px] text-[0.78rem] font-bold uppercase tracking-[0.03em] text-[#9a2516]"
                          : "inline-flex items-center rounded-full bg-[#dff4f0] px-2.5 py-[5px] text-[0.78rem] font-bold uppercase tracking-[0.03em] text-[#0d5f58]"
                      }
                    >
                      {item.type}
                    </span>
                  </div>
                  <h2 className="my-0 mb-1.5 mt-2 text-[1.6rem] font-bold">{item.title}</h2>
                  <p className="m-0">{item.description}</p>
                </div>
              </article>

              <aside className="rounded-[18px] border border-[rgba(216,224,232,0.95)] bg-[rgba(255,255,255,0.9)] p-[22px] shadow-[0_14px_40px_rgba(14,37,53,0.08)]">
                <div>
                  <p className="mb-1.5 mt-0 text-[0.88rem] font-semibold uppercase tracking-[0.04em] text-[#5f7384]">Location</p>
                  <p className="m-0">{item.location}</p>
                </div>

                <div className="mt-[18px]">
                  <p className="mb-1.5 mt-0 text-[0.88rem] font-semibold uppercase tracking-[0.04em] text-[#5f7384]">Date</p>
                  <p className="m-0">{formattedDate}</p>
                </div>

                <div className="mt-[18px]">
                  <p className="mb-1.5 mt-0 text-[0.88rem] font-semibold uppercase tracking-[0.04em] text-[#5f7384]">Contact</p>
                  <div className="rounded-xl border border-[#d8e0e8] bg-[#f7fafc] p-3.5">
                    <p className="m-0"><strong>{item.contactName}</strong></p>
                    <p className="m-0">{item.contactEmail}</p>
                    <p className="m-0">{item.contactPhone}</p>
                  </div>
                </div>

                <div className="mt-[18px]">
                  <Link
                    className="inline-flex items-center justify-center rounded-xl border border-[#d8e0e8] bg-white px-[18px] py-3 font-bold text-[#143247] transition duration-150 hover:-translate-y-px"
                    to="/browse"
                  >
                    Back to browse
                  </Link>
                </div>
              </aside>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default ItemDetails;