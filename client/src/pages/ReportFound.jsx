import { useState } from "react";
import { createItem } from "../services/api";
import {toast}  from 'react-hot-toast';

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
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    data.append("type", "found");

    if (image) {
      data.append("image", image);
    }

    try {

      await createItem(data);
      toast.success("Found item reported successfully");
      setFormData({
        title: "",
        description: "",
        location: "",
        date: "",
        contactName: "",
        contactEmail: "",
        contactPhone: ""
      });
      setImage(null);
      
      

    } catch (error) {
      console.error(error);
      toast.error("Error submitting form");
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
          placeholder="Location Found"
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

        <input
          type="file"
          accept="image/png,image/jpeg,image/jpg"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
        />

        <button type="submit">Submit</button>

      </form>

    </div>
  );
}

export default ReportFound;