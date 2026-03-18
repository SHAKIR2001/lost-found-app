import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ItemReportForm from "../components/ItemReportForm";

function ReportLost() {
  return (
    <div className="app-shell">
      <Navbar />

      <main className="main-content">
        <ItemReportForm
          type="lost"
          title="Report a lost item"
          subtitle="Share what you lost and where. Your report helps others identify and return it quickly."
        />
      </main>

      <Footer />
    </div>
  );
}

export default ReportLost;
