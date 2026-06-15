import { useState } from "react";

export function ShareSheet({ url }: { url: string }) {
  const [status, setStatus] = useState<"idle" | "ok" | "fail">("idle");
  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setStatus("ok");
    } catch {
      setStatus("fail");
    }
  }
  const wa = `https://wa.me/?text=${encodeURIComponent(url)}`;
  return (
    <div className="share">
      <input className="nes-input" readOnly value={url} onFocus={(e) => e.currentTarget.select()} />
      <div className="row">
        <button className="nes-btn is-primary" onClick={copy}>copy link</button>
        <a className="nes-btn" href={wa} target="_blank" rel="noreferrer">whatsapp</a>
      </div>
      {status === "ok" && <p className="ok">copied! now text it to them 💌</p>}
      {status === "fail" && <p className="muted">couldn’t copy — select the link above and copy it manually.</p>}
    </div>
  );
}
