import React from "react";
import { demoPages } from "../data/demoPortal";

export default function DemoPage({ section }) {
  const page = demoPages[section] || demoPages.patients;
  return <section className="demo-page dashboard-card">
    <div className="demo-page-header"><div><span className="eyebrow">DEMO WORKSPACE</span><h2>{page.title}</h2><p>{page.description}</p></div><span className="demo-badge">Sample data</span></div>
    <div className="demo-toolbar"><input placeholder={`Search ${page.title.toLowerCase()}...`} /><button className="secondary">Export preview</button><button className="primary compact">Add {page.title.replace(/s$/, "")}</button></div>
    <div className="demo-table-wrap"><table><thead><tr>{page.columns.map((column) => <th key={column}>{column}</th>)}</tr></thead><tbody>{page.rows.map((row) => <tr key={row.join("-")}>{row.map((cell, index) => <td key={`${cell}-${index}`}>{index === row.length - 1 ? <span className="status-pill green">{cell}</span> : cell}</td>)}</tr>)}</tbody></table></div>
  </section>;
}
