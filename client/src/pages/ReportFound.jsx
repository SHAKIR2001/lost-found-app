import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ItemReportForm from "../components/ItemReportForm";

function ReportFound() {
  return (
    <div className="app-shell">
      <Navbar />

      <main className="main-content">
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