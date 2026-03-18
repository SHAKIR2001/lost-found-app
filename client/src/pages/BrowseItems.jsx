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
    <div className="app-shell">
      <Navbar />

      <main className="main-content">
        <section className="container">
          <div className="page-head">
            <h1>Browse posts</h1>
            <p>
              Search by keyword, filter by report type, and open a post to view
              full details and contact information.
            </p>
          </div>

          <div className="surface-card panel">
            <div className="filter-row">
              <input
                className="input"
                type="text"
                placeholder="Search by item title, description, or location"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />

              <select
                className="select"
                value={typeFilter}
                onChange={(event) => setTypeFilter(event.target.value)}
              >
                <option value="all">All posts</option>
                <option value="lost">Lost only</option>
                <option value="found">Found only</option>
              </select>
            </div>

            {loading ? (
              <p className="result-count">Loading posts...</p>
            ) : error ? (
              <div className="empty-state">
                <p className="empty-title">Something went wrong</p>
                <p className="empty-note">{error}</p>
              </div>
            ) : filteredItems.length === 0 ? (
              <div className="empty-state">
                <p className="empty-title">No matching posts found</p>
                <p className="empty-note">
                  Try a different search term or choose another filter.
                </p>
              </div>
            ) : (
              <>
                <p className="result-count">{filteredItems.length} posts found</p>
                <div className="items-grid">
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