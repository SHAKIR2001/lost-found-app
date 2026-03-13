import { useState } from "react";
import { createItem } from "../services/api";
import {toast}  from 'react-hot-toast';

function ReportLost() {

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
        type: "lost"
      });

      toast.success("Lost item reported successfully");

      setFormData({
        title: "",
        description: "",
        location: "",
        date: "",
        contactName: "",
        contactEmail: "",
        contactPhone: ""
      });

    } catch (error) {
      console.error(error);
      toast.error("Error submitting form");
    }
  };

  return (
    <div>
      <h2>Report Lost Item</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="title"
          placeholder="Item Name"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="location"
          placeholder="Location Lost"
          value={formData.location}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="contactName"
          placeholder="Your Name"
          value={formData.contactName}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="contactEmail"
          placeholder="Email"
          value={formData.contactEmail}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="contactPhone"
          placeholder="Phone"
          value={formData.contactPhone}
          onChange={handleChange}
          required
        />

        <button type="submit">Submit</button>

      </form>
    </div>
  );
}

export default ReportLost;