export default function LegalPage({
  title,
  lastUpdated,
  sections,
}: {
  title: string;
  lastUpdated: string;
  sections: { heading: string; text: string }[];
}) {
  return (
    <div className="policy-page">
      <div className="container">
        <h1>{title}</h1>
        <p className="updated">{lastUpdated}</p>
        {sections.map((section, i) => (
          <div key={i}>
            <h2>{section.heading}</h2>
            <p>{section.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
