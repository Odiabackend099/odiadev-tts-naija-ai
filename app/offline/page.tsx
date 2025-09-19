export default function OfflinePage() {
  return (
    <div className=\"container\">
      <section className=\"section\">
        <h1>Offline Emergency Mode</h1>
        <p>Emergency numbers for offline use.</p>
        <div className=\"grid grid-2\">
          <div className=\"card text-center\">
            <h3>Call 112</h3>
            <a href=\"tel:112\" className=\"btn btn-danger\">Emergency</a>
          </div>
          <div className=\"card text-center\">
            <h3>Call 199</h3>
            <a href=\"tel:199\" className=\"btn btn-danger\">Fire Service</a>
          </div>
        </div>
      </section>
    </div>
  );
}