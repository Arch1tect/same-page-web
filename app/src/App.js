import React, { useState, useEffect } from "react"
import "antd/dist/antd.css"
import "./App.css"

import { Input, Button } from "antd"

import { localIframe } from "./config"

const Search = Input.Search

let iframeSrc = "chatbox/index.html"

if (localIframe) iframeSrc = "https://localhost:3000"

const defaultUrl = "https://www.google.com/"

function App() {
  const [url, setUrl] = useState(defaultUrl)
  const [display, setDisplay] = useState("block")
  useEffect(() => {
    window.addEventListener(
      "message",
      e => {
        if (!e || !e.data) return
        if (e.data === "minimize") {
          setDisplay("none")
        }
      },
      false
    )
  }, [])
  return (
    <div>
      <div style={{ padding: 20, maxWidth: 500 }}>
        <div style={{ color: "white", marginBottom: 5 }}>
          请输入你想要模拟所在的网址。
        </div>
        <Search
          placeholder={defaultUrl}
          enterButton="更新!"
          size="large"
          defaultValue={url}
          onSearch={val => setUrl(val)}
        />
      </div>
      {display === "none" && (
        <Button
          style={{ position: "fixed", top: "45%" }}
          size="large"
          icon="message"
          onClick={() => {
            setDisplay("block")
          }}
        />
        // <Icon width={50} height={50} type="message" />
      )}
      <iframe
        // ref={this.iframeRef}
        style={{ display: display }}
        className="sp-chatbox-iframe"
        src={iframeSrc + "?" + url}
      />
    </div>
  )
}

export default App
