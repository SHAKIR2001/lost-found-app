import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
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
    <div className="app-shell">
      <Navbar />

      <main className="main-content">
        <section className="container">
          <div className="page-head">
            <h1>Post details</h1>
            <p>Review complete information and contact details for this post.</p>
          </div>

          {loading ? (
            <div className="surface-card panel">
              <p className="result-count">Loading details...</p>
            </div>
          ) : error || !item ? (
            <div className="surface-card panel">
              <div className="empty-state">
                <p className="empty-title">Post not available</p>
                <p className="empty-note">{error || "This post does not exist."}</p>
                <Link className="btn btn-secondary" to="/browse">
                  Back to browse
                </Link>
              </div>
            </div>
          ) : (
            <div className="details-layout">
              <article className="surface-card panel">
                <img
                  className="detail-image"
                  src={item.image || placeholderImage}
                  alt={item.title || "Item"}
                />

                <div className="detail-block">
                  <div className="item-topline" style={{ marginTop: "14px" }}>
                    <span
                      className={
                        item.type === "lost" ? "pill pill-lost" : "pill pill-found"
                      }
                    >
                      {item.type}
                    </span>
                  </div>
                  <h2 style={{ margin: "8px 0 6px" }}>{item.title}</h2>
                  <p className="detail-value">{item.description}</p>
                </div>
              </article>

              <aside className="surface-card panel">
                <div className="detail-block">
                  <p className="detail-label">Location</p>
                  <p className="detail-value">{item.location}</p>
                </div>

                <div className="detail-block">
                  <p className="detail-label">Date</p>
                  <p className="detail-value">{formattedDate}</p>
                </div>

                <div className="detail-block">
                  <p className="detail-label">Contact</p>
                  <div className="contact-card">
                    <p className="detail-value"><strong>{item.contactName}</strong></p>
                    <p className="detail-value">{item.contactEmail}</p>
                    <p className="detail-value">{item.contactPhone}</p>
                  </div>
                </div>

                <div className="detail-block">
                  <Link className="btn btn-secondary" to="/browse">
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