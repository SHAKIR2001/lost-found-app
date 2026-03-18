import { useState } from "react";
import { createItem } from "../services/api";
import { toast } from "react-hot-toast";

const initialState = {
  title: "",
  description: "",
  location: "",
  date: "",
  contactName: "",
  contactEmail: "",
  contactPhone: ""
};

function ItemReportForm({ type, title, subtitle }) {
  const [formData, setFormData] = useState(initialState);
  const [image, setImage] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({
      ...previous,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    data.append("type", type);

    if (image) {
      data.append("image", image);
    }

    try {
      await createItem(data);
      toast.success(`${type === "lost" ? "Lost" : "Found"} post submitted.`);
      setFormData(initialState);
      setImage(null);
    } catch (error) {
      console.error(error);
      toast.error("Unable to submit right now. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const locationLabel =
    type === "lost" ? "Where was it lost?" : "Where was it found?";

  return (
    <section className="container">
      <div className="page-head">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>

      <div className="surface-card form-shell">
        <p className="form-helper">
          Add complete details so others can identify the item quickly and contact
          you with confidence.
        </p>

        <form className="form-grid" onSubmit={handleSubmit}>
          <div className="field field-wide">
            <label htmlFor="title">Item title</label>
            <input
              id="title"
              className="input"
              type="text"
              name="title"
              placeholder="Example: Black leather wallet"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="field field-wide">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              className="textarea"
              name="description"
              placeholder="Describe color, brand, marks, and anything unique."
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="location">Location</label>
            <input
              id="location"
              className="input"
              type="text"
              name="location"
              placeholder={locationLabel}
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="date">Date</label>
            <input
              id="date"
              className="input"
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="contactName">Contact name</label>
            <input
              id="contactName"
              className="input"
              type="text"
              name="contactName"
              placeholder="Your full name"
              value={formData.contactName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="contactPhone">Contact phone</label>
            <input
              id="contactPhone"
              className="input"
              type="text"
              name="contactPhone"
              placeholder="Phone number"
              value={formData.contactPhone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="field field-wide">
            <label htmlFor="contactEmail">Contact email</label>
            <input
              id="contactEmail"
              className="input"
              type="email"
              name="contactEmail"
              placeholder="name@example.com"
              value={formData.contactEmail}
              onChange={handleChange}
              required
            />
          </div>

          <div className="field field-wide">
            <label htmlFor="image">Image (optional)</label>
            <input
              id="image"
              className="file-input"
              type="file"
              accept="image/png,image/jpeg,image/jpg"
              onChange={(event) => setImage(event.target.files?.[0] || null)}
            />
            <small className="field-hint">
              Upload a clear photo to improve matching accuracy.
            </small>
          </div>

          <div className="field field-wide">
            <button className="btn btn-primary" type="submit" disabled={submitting}>
              {submitting ? "Submitting..." : "Submit Post"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default ItemReportForm;
