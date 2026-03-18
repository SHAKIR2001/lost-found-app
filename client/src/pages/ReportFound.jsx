import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ItemReportForm from "../components/ItemReportForm";

function ReportFound() {
  return (
    <div className="flex min-h-screen flex-col bg-[radial-gradient(circle_at_12%_10%,rgba(15,118,110,0.2),transparent_34%),radial-gradient(circle_at_88%_20%,rgba(219,124,47,0.14),transparent_30%),linear-gradient(180deg,#f8fbff_0%,#f4f7fb_62%,#edf2f8_100%)] font-[Manrope] text-[#143247]">
      <Navbar />

      <main className="flex-1 py-[38px] pb-14">
        <ItemReportForm
          type="found"
          title="Report a found item"
          subtitle="Add details about the item you found so the rightful owner can identify and claim it."
        />
      </main>

      <Footer />
    </div>
  );
}

export default ReportFound;