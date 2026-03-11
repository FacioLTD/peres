import { useState, useEffect, useRef, useCallback } from 'react';

const WS_PROTOCOL = window.location.protocol === 'https:' ? 'wss' : 'ws';
const WS_URL = `${WS_PROTOCOL}://${window.location.host}`;

export function useStats() {
  const [stats, setStats]         = useState(null);
  const [connected, setConnected] = useState(false);
  const [newFlash, setNewFlash]   = useState(false);
  const ws         = useRef(null);
  const flashTimer = useRef(null);

  const triggerFlash = useCallback(() => {
    setNewFlash(true);
    clearTimeout(flashTimer.current);
    flashTimer.current = setTimeout(() => setNewFlash(false), 1800);
  }, []);

  useEffect(() => {
    function connect() {
      ws.current = new WebSocket(WS_URL);
      ws.current.onopen  = () => setConnected(true);
      ws.current.onclose = () => { setConnected(false); setTimeout(connect, 2000); };
      ws.current.onerror = () => ws.current.close();
      ws.current.onmessage = (e) => {
        const msg = JSON.parse(e.data);
        if (msg.type === 'INIT')             setStats(msg.payload);
        if (msg.type === 'NEW_SUBMISSION') { setStats(msg.payload); triggerFlash(); }
      };
    }
    connect();
    return () => { ws.current?.close(); clearTimeout(flashTimer.current); };
  }, [triggerFlash]);

  return { stats, connected, newFlash };
}
