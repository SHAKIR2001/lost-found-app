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
    <section className="mx-auto w-[min(1120px,92vw)]">
      <div className="mb-[18px]">
        <h1 className="m-0 text-[clamp(1.9rem,4vw,3rem)] leading-[1.12]">{title}</h1>
        <p className="mt-2.5 max-w-[760px] text-[#5f7384]">{subtitle}</p>
      </div>

      <div className="rounded-[18px] border border-[rgba(216,224,232,0.95)] bg-[rgba(255,255,255,0.9)] p-[22px] shadow-[0_14px_40px_rgba(14,37,53,0.08)]">
        <p className="mb-4 mt-0 text-[#5f7384]">
          Add complete details so others can identify the item quickly and contact
          you with confidence.
        </p>

        <form className="grid grid-cols-2 gap-3 max-[720px]:grid-cols-1" onSubmit={handleSubmit}>
          <div className="col-span-2 flex flex-col gap-[7px] max-[720px]:col-span-1">
            <label className="text-[0.9rem] font-bold" htmlFor="title">Item title</label>
            <input
              id="title"
              className="w-full rounded-[10px] border border-[#d8e0e8] bg-white px-[13px] py-3 text-[0.97rem] text-[#143247] transition focus:border-[#89b8cc] focus:outline-none focus:ring-4 focus:ring-[rgba(18,111,157,0.15)]"
              type="text"
              name="title"
              placeholder="Example: Black leather wallet"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-span-2 flex flex-col gap-[7px] max-[720px]:col-span-1">
            <label className="text-[0.9rem] font-bold" htmlFor="description">Description</label>
            <textarea
              id="description"
              className="min-h-32 w-full resize-y rounded-[10px] border border-[#d8e0e8] bg-white px-[13px] py-3 text-[0.97rem] text-[#143247] transition focus:border-[#89b8cc] focus:outline-none focus:ring-4 focus:ring-[rgba(18,111,157,0.15)]"
              name="description"
              placeholder="Describe color, brand, marks, and anything unique."
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col gap-[7px]">
            <label className="text-[0.9rem] font-bold" htmlFor="location">Location</label>
            <input
              id="location"
              className="w-full rounded-[10px] border border-[#d8e0e8] bg-white px-[13px] py-3 text-[0.97rem] text-[#143247] transition focus:border-[#89b8cc] focus:outline-none focus:ring-4 focus:ring-[rgba(18,111,157,0.15)]"
              type="text"
              name="location"
              placeholder={locationLabel}
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col gap-[7px]">
            <label className="text-[0.9rem] font-bold" htmlFor="date">Date</label>
            <input
              id="date"
              className="w-full rounded-[10px] border border-[#d8e0e8] bg-white px-[13px] py-3 text-[0.97rem] text-[#143247] transition focus:border-[#89b8cc] focus:outline-none focus:ring-4 focus:ring-[rgba(18,111,157,0.15)]"
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col gap-[7px]">
            <label className="text-[0.9rem] font-bold" htmlFor="contactName">Contact name</label>
            <input
              id="contactName"
              className="w-full rounded-[10px] border border-[#d8e0e8] bg-white px-[13px] py-3 text-[0.97rem] text-[#143247] transition focus:border-[#89b8cc] focus:outline-none focus:ring-4 focus:ring-[rgba(18,111,157,0.15)]"
              type="text"
              name="contactName"
              placeholder="Your full name"
              value={formData.contactName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col gap-[7px]">
            <label className="text-[0.9rem] font-bold" htmlFor="contactPhone">Contact phone</label>
            <input
              id="contactPhone"
              className="w-full rounded-[10px] border border-[#d8e0e8] bg-white px-[13px] py-3 text-[0.97rem] text-[#143247] transition focus:border-[#89b8cc] focus:outline-none focus:ring-4 focus:ring-[rgba(18,111,157,0.15)]"
              type="text"
              name="contactPhone"
              placeholder="Phone number"
              value={formData.contactPhone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-span-2 flex flex-col gap-[7px] max-[720px]:col-span-1">
            <label className="text-[0.9rem] font-bold" htmlFor="contactEmail">Contact email</label>
            <input
              id="contactEmail"
              className="w-full rounded-[10px] border border-[#d8e0e8] bg-white px-[13px] py-3 text-[0.97rem] text-[#143247] transition focus:border-[#89b8cc] focus:outline-none focus:ring-4 focus:ring-[rgba(18,111,157,0.15)]"
              type="email"
              name="contactEmail"
              placeholder="name@example.com"
              value={formData.contactEmail}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-span-2 flex flex-col gap-[7px] max-[720px]:col-span-1">
            <label className="text-[0.9rem] font-bold" htmlFor="image">Image (optional)</label>
            <input
              id="image"
              className="w-full rounded-[10px] border border-[#d8e0e8] bg-white px-[13px] py-3 text-[0.97rem] text-[#143247] transition focus:border-[#89b8cc] focus:outline-none focus:ring-4 focus:ring-[rgba(18,111,157,0.15)]"
              type="file"
              accept="image/png,image/jpeg,image/jpg"
              onChange={(event) => setImage(event.target.files?.[0] || null)}
            />
            <small className="text-[#5f7384]">
              Upload a clear photo to improve matching accuracy.
            </small>
          </div>

          <div className="col-span-2 flex flex-col gap-[7px] max-[720px]:col-span-1">
            <button
              className="inline-flex items-center justify-center rounded-xl border border-transparent bg-[linear-gradient(130deg,#0f766e,#126f9d)] px-[18px] py-3 font-bold text-white shadow-[0_12px_28px_rgba(15,118,110,0.25)] transition duration-150 hover:-translate-y-px hover:shadow-[0_16px_30px_rgba(15,118,110,0.34)] disabled:cursor-not-allowed disabled:opacity-70"
              type="submit"
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Submit Post"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default ItemReportForm;
