import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { DOMMessage, DOMMessageResponse } from "./types";
import { Face } from "./components/Face";

function App() {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState("");
  const [headlines, setHeadlines] = useState<string[]>([]);

  useEffect(() => {
    if (!chrome.tabs) return;
    /**
     * We can't use "chrome.runtime.sendMessage" for sending messages from React.
     * For sending messages from React we need to specify which tab to send it to.
     */
    chrome.tabs.query(
      {
        active: true,
        currentWindow: true,
      },
      (tabs) => {
        /**
         * Sends a single message to the content script(s) in the specified tab,
         * with an optional callback to run when a response is sent back.
         *
         * The runtime.onMessage event is fired in each content script running
         * in the specified tab for the current extension.
         */
        chrome.tabs.sendMessage(
          tabs[0].id || 0,
          { type: "GET_DOM" } as DOMMessage,
          (response: DOMMessageResponse) => {
            setTitle(response.title);
            setHeadlines(response.headlines);
          }
        );
      }
    );

    chrome.runtime.onMessage.addListener((message, sender) => {
      console.log(message, sender);
    });
  }, []);

  return (
    <div className="App">
      <div className="wrapper">
        <h1 className="text-stone-400">TIMER</h1>
        <Face />
      </div>
    </div>
  );
}

export default App;
