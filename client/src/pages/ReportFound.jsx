import { useState } from "react";
import { createItem } from "../services/api";

function ReportFound() {

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
    contactName: "",
    contactEmail: "",
    contactPhone: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await createItem({
        ...formData,
        type: "found"
      });

      alert("Found item reported successfully");

    } catch (error) {
      console.error(error);
      alert("Error submitting form");
    }
  };

  return (
    <div>

      <h2>Report Found Item</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="title"
          placeholder="Item Name"
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="location"
          placeholder="Location Found"
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="date"
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="contactName"
          placeholder="Your Name"
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="contactEmail"
          placeholder="Email"
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="contactPhone"
          placeholder="Phone"
          onChange={handleChange}
          required
        />

        <button type="submit">Submit</button>

      </form>

    </div>
  );
}

export default ReportFound;