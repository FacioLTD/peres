import { useState, useEffect, useRef, useCallback, useMemo } from 'react';

const WS_PROTOCOL = window.location.protocol === 'https:' ? 'wss' : 'ws';

export function useStats(deck = 'foundations') {
  const [stats, setStats]         = useState(null);
  const [connected, setConnected] = useState(false);
  const [newFlash, setNewFlash]   = useState(false);
  const ws         = useRef(null);
  const flashTimer = useRef(null);

  const wsUrl = useMemo(() => {
    // In Vite dev mode the UI runs on :5173 and backend WS lives on :3001.
    const base = import.meta.env.DEV
      ? `${WS_PROTOCOL}://${window.location.hostname}:3001`
      : `${WS_PROTOCOL}://${window.location.host}`;
    return `${base}?deck=${deck}`;
  }, [deck]);

  const triggerFlash = useCallback(() => {
    setNewFlash(true);
    clearTimeout(flashTimer.current);
    flashTimer.current = setTimeout(() => setNewFlash(false), 1800);
  }, []);

  useEffect(() => {
    function connect() {
      ws.current = new WebSocket(wsUrl);
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
  }, [wsUrl, triggerFlash]);

  return { stats, connected, newFlash };
}
