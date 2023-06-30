import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [stampName, setStampName] = useState("");
  const [isDevMode, setIsDevMode] = useState(true);
  const [isMpac, setIsMpac] = useState(true);

  const stampNameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (stampNameRef.current) {
      stampNameRef.current.focus();
    }
  }, [stampNameRef]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const url = getPortalUrl(stampName, isDevMode, isMpac);

    open(url, "_self");
  };

  return (
    <>
      <form className="form" onSubmit={onSubmit}>
        <div className="inputs-container">
          <label id="stamp-name-label" htmlFor="stamp-name-input">
            Stamp name
          </label>

          <input
            id="stamp-name-input"
            ref={stampNameRef}
            value={stampName}
            onChange={(e) => setStampName(e.target.value)}
          />

          <label id="is-dev-mode-label" htmlFor="is-dev-mode-input">
            Dev mode?
          </label>

          <input
            id="is-dev-mode-input"
            checked={isDevMode}
            type="checkbox"
            onChange={(e) => setIsDevMode(e.target.checked)}
          />

          <label id="is-mpac-label" htmlFor="is-mpac-input">
            MPAC redirect?
          </label>

          <input
            id="is-mpac-input"
            checked={isMpac}
            type="checkbox"
            onChange={(e) => setIsMpac(e.target.checked)}
          />
        </div>

        <button className="submit-button">Go</button>
      </form>
    </>
  );
}

export default App;

// ---- Helpers ---- //

function getPortalUrl(
  stamp: string,
  isDevMode: boolean,
  isMpac: boolean
): string {
  const searchParams = new URLSearchParams();

  if (stamp) {
    searchParams.append("feature.canmodifystamps", "true");
    searchParams.append("Microsoft_Azure_AP5GC", stamp);
  }

  if (isDevMode) {
    searchParams.append("feature.Microsoft_Azure_AP5GC_developermode", "true");
  }

  if (!isMpac) {
    searchParams.append("feature.customportal", "false");
  }

  const url = `${BASE_URL}?${searchParams.toString()}#home`;

  return url;
}

const BASE_URL = "https://portal.azure.com/";
