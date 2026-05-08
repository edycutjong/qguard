"use client";

import { useState, useEffect, useRef } from "react";

interface ScrambleTextProps {
  text: string;
  speed?: number;
  className?: string;
  scrambleChars?: string;
}

export function ScrambleText({ text, speed = 30, className = "", scrambleChars = "!<>-_\\/[]{}—=+*^?#_01" }: ScrambleTextProps) {
  const [display, setDisplay] = useState("");
  const frameRef = useRef(0);

  useEffect(() => {
    let frame = 0;
    const totalFrames = text.length + 10;

    const interval = setInterval(() => {
      frame++;
      frameRef.current = frame;

      let output = "";
      for (let i = 0; i < text.length; i++) {
        if (i < frame - 5) {
          output += text[i];
        } else if (i < frame) {
          output += scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
        } else {
          output += " ";
        }
      }
      setDisplay(output);

      if (frame >= totalFrames) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, scrambleChars]);

  return <span className={`font-mono ${className}`}>{display}</span>;
}
