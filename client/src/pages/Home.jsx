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
    <div className="app-shell">
      <Navbar />

      <main className="main-content">
        <section className="container hero">
          <h1>Report, browse, and reconnect lost belongings faster.</h1>
          <p>
            A simple and trustworthy space for your community to post lost or
            found items and help each other recover what matters.
          </p>

          <div className="hero-actions">
            <Link className="btn btn-primary" to="/report-lost">
              Report Lost Item
            </Link>
            <Link className="btn btn-secondary" to="/report-found">
              Report Found Item
            </Link>
            <Link className="btn btn-secondary" to="/browse">
              Browse Posts
            </Link>
          </div>

          <div className="stats-grid">
            <article className="stat">
              <strong>{items.length}</strong>
              <span>Total posts</span>
            </article>
            <article className="stat">
              <strong>{lostCount}</strong>
              <span>Lost reports</span>
            </article>
            <article className="stat">
              <strong>{foundCount}</strong>
              <span>Found reports</span>
            </article>
          </div>
        </section>

        <section className="container" style={{ marginTop: "22px" }}>
          <div className="page-head">
            <h1 style={{ fontSize: "1.65rem" }}>Recent posts</h1>
            <p>Latest activity from the lost and found feed.</p>
          </div>

          <div className="surface-card panel">
            {loading ? (
              <p className="result-count">Loading posts...</p>
            ) : latestItems.length > 0 ? (
              <div className="items-grid">
                {latestItems.map((item) => (
                  <ItemCard key={item._id} item={item} />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p className="empty-title">No posts yet</p>
                <p className="empty-note">
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