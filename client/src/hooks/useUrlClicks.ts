import { useState, useEffect } from "react";

interface ClickUpdateData {
  urlId: string;
  shortUrl: string;
  destination: string;
  clickCount: number;
  timestamp: Date;
}

export const useUrlClicks = (urlId: string, initialClicks: number) => {
  const [clickCount, setClickCount] = useState(initialClicks);

  useEffect(() => {
    const initSocket = async () => {
      try {
        const { io } = await import("socket.io-client");

        const socket = io(import.meta.env.VITE_BACKEND_URL);

        const handleClickUpdate = (data: ClickUpdateData) => {
          if (data.urlId === urlId) {
            setClickCount(data.clickCount);
            console.log(
              `Updated clicks for ${data.shortUrl}: ${data.clickCount}`
            );
          }
        };

        socket.on("click-update", handleClickUpdate);

        return () => {
          socket.disconnect();
        };
      } catch (error) {
        console.error("Failed to initialize WebSocket:", error);
      }
    };

    initSocket();
  }, [urlId]);

  useEffect(() => {
    setClickCount(initialClicks);
  }, [initialClicks]);

  return clickCount;
};
