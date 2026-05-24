import React, { useState } from 'react';
import { useLibrary } from '../contexts/LibraryContext';
import { X, Cloud, Copy, Check, RefreshCw, Unlink, ExternalLink, AlertTriangle, HelpCircle } from 'lucide-react';

interface SyncModalProps {
  onClose: () => void;
}

export const SyncModal: React.FC<SyncModalProps> = ({ onClose }) => {
  const {
    syncCode,
    syncStatus,
    lastSyncedAt,
    enableSync,
    linkSyncCode,
    disableSync
  } = useLibrary();

  const [inputCode, setInputCode] = useState('');
  const [isLinking, setIsLinking] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  // Generate shareable link
  const getShareLink = () => {
    if (!syncCode) return '';
    return `${window.location.origin}${window.location.pathname}?sync=${syncCode}`;
  };

  const handleCopyLink = async () => {
    const link = getShareLink();
    try {
      await navigator.clipboard.writeText(link);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch (err) {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = link;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
      } catch (e) {
        console.error('Failed to copy', e);
      }
      document.body.removeChild(textArea);
    }
  };

  const handleCopyCode = async () => {
    if (!syncCode) return;
    try {
      await navigator.clipboard.writeText(syncCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } catch (err) {
      const textArea = document.createElement('textarea');
      textArea.value = syncCode;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setCopiedCode(true);
        setTimeout(() => setCopiedCode(false), 2000);
      } catch (e) {
        console.error('Failed to copy code', e);
      }
      document.body.removeChild(textArea);
    }
  };

  const handleEnableSync = async () => {
    setIsLinking(true);
    setErrorMessage('');
    try {
      await enableSync();
    } catch (err) {
      setErrorMessage('Failed to generate cloud sync room. Please retry.');
    } finally {
      setIsLinking(false);
    }
  };

  const handleLinkCode = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = inputCode.trim().toUpperCase();
    if (!cleanCode) {
      setErrorMessage('Please enter a valid code');
      return;
    }

    setIsLinking(true);
    setErrorMessage('');
    try {
      const success = await linkSyncCode(cleanCode);
      if (success) {
        setInputCode('');
      } else {
        setErrorMessage('Invalid sync code. Please check and try again.');
      }
    } catch (err) {
      setErrorMessage('Connection error. Please check your web access.');
    } finally {
      setIsLinking(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div 
        className="w-full max-w-lg bg-white rounded-3xl border border-earth-sand overflow-hidden shadow-2xl flex flex-col max-h-[90vh] animate-scale-up"
        id="sync-modal-panel"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-earth-sand bg-earth-cream/10 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 bg-earth-sage-light flex items-center justify-center rounded-xl text-earth-olive">
              <Cloud className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-earth-charcoal font-serif">Cloud Synchronization</h2>
              <p className="text-xs text-earth-warm-gray">Sync across your devices without login credentials</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="h-8 w-8 rounded-full border border-earth-sand flex items-center justify-center hover:bg-earth-sand hover:text-earth-charcoal transition text-earth-warm-gray cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content Scroll Area */}
        <div className="p-6 overflow-y-auto space-y-6">
          {syncCode ? (
            /* ACTIVE SYNC CODE VIEW */
            <div className="space-y-6">
              <div className="rounded-2xl border border-earth-olive/30 bg-earth-sage-light/20 p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-earth-olive flex items-center gap-1.5 uppercase tracking-wider">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    Cloud Synced Room Active
                  </span>
                  
                  {/* Status pills */}
                  <div className="flex items-center gap-2 text-[11px] font-bold">
                    {syncStatus === 'syncing' ? (
                      <span className="text-earth-clay flex items-center gap-1">
                        <RefreshCw className="h-3 w-3 animate-spin" /> Syncing...
                      </span>
                    ) : syncStatus === 'error' ? (
                      <span className="text-red-600 flex items-center gap-1">
                        <AlertTriangle className="h-3 w-3" /> Error
                      </span>
                    ) : (
                      <span className="text-earth-olive">✓ Updated</span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center py-4 bg-white/60 border border-earth-sand rounded-xl space-y-2.5">
                  <span className="text-[10px] uppercase font-bold text-earth-warm-gray tracking-widest">Your Private Sync Code</span>
                  <div className="flex items-center gap-2">
                    <span className="text-2.5xl font-mono font-extrabold text-earth-charcoal tracking-wide bg-earth-cream/40 px-3.5 py-1.5 rounded-lg border border-earth-sand/50">
                      {syncCode}
                    </span>
                    <button
                      onClick={handleCopyCode}
                      className="p-3 bg-white border border-earth-sand rounded-xl hover:bg-earth-cream/25 active:scale-95 transition text-earth-charcoal cursor-pointer"
                      title="Copy room code"
                    >
                      {copiedCode ? <Check className="h-4.5 w-4.5 text-emerald-600" /> : <Copy className="h-4.5 w-4.5" />}
                    </button>
                  </div>
                  {lastSyncedAt && (
                    <span className="text-[11px] text-earth-warm-gray flex items-center gap-1">
                      <RefreshCw className="h-3 w-3 text-earth-sage" /> Last synced: <strong>{lastSyncedAt}</strong>
                    </span>
                  )}
                </div>

                <p className="text-xs text-earth-warm-gray leading-relaxed text-center">
                  Any additions, checklist marks, or modifications made on this browser are automatically backed up and synced to this code.
                </p>
              </div>

              {/* Shareable Link Block */}
              <div className="bg-earth-cream/20 rounded-2xl border border-earth-sand p-5 space-y-3.5">
                <h3 className="text-xs font-bold text-earth-charcoal uppercase tracking-wider">Access on other devices</h3>
                <p className="text-xs text-earth-warm-gray">
                  Simply share this special link to open and manage this room instantly on your phone, tablet, or secondary computer without login:
                </p>
                <div className="flex items-center gap-2 bg-white rounded-xl border border-earth-sand p-2 pl-3.5">
                  <span className="text-xs font-mono text-earth-warm-gray truncate flex-1 select-all">
                    {getShareLink()}
                  </span>
                  <button
                    onClick={handleCopyLink}
                    className="shrink-0 flex items-center gap-1 px-3.5 py-2.5 bg-earth-olive hover:bg-earth-olive-light rounded-lg text-white font-bold text-xs transition active:scale-95 cursor-pointer"
                  >
                    {copiedLink ? (
                      <>
                        <Check className="h-3.5 w-3.5" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy Link</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Unsync Action */}
              <div className="pt-3 border-t border-earth-sand flex items-center justify-between">
                <div className="text-[11px] text-earth-warm-gray max-w-[65%] leading-normal">
                  Want to stop syncing to this cloud room? All your current menus will remain safely on this device.
                </div>
                <button
                  onClick={disableSync}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-red-600 border border-red-200 hover:bg-red-50 active:scale-95 transition cursor-pointer"
                >
                  <Unlink className="h-3.5 w-3.5" />
                  <span>Stop Syncing</span>
                </button>
              </div>
            </div>
          ) : (
            /* OFF-SYNC PANEL (CHOOSE OPTION) */
            <div className="space-y-6">
              <div className="bg-earth-cream/25 rounded-2xl border border-earth-sand/60 p-5 flex items-start gap-3">
                <HelpCircle className="h-5 w-5 text-earth-olive shrink-0 mt-0.5" />
                <p className="text-xs text-earth-warm-gray leading-relaxed">
                  By default, your recipe book and meals are stored locally in your browser. Enabling cloud sync creates a master version online, letting you view and update recipes collaboratively in real-time.
                </p>
              </div>

              {/* Split Bento Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* OPTION A: GENERATE BRAND NEW ROOM */}
                <div className="rounded-2xl border border-earth-sand p-5 flex flex-col justify-between space-y-4 bg-white hover:border-earth-olive/40 hover:shadow-sm transition">
                  <div className="space-y-1.5">
                    <span className="text-[10px] text-earth-olive font-extrabold tracking-widest uppercase">Option A</span>
                    <h3 className="text-sm font-bold text-earth-charcoal font-serif">Enable New Cloud Sync</h3>
                    <p className="text-xs text-earth-warm-gray leading-relaxed">
                      Generate a brand new sync room. Your current culinary library will be uploaded immediately.
                    </p>
                  </div>
                  <button
                    onClick={handleEnableSync}
                    disabled={isLinking}
                    className="w-full inline-flex md:h-11 items-center justify-center gap-1.5 rounded-xl bg-earth-olive hover:bg-earth-olive-light disabled:bg-earth-olive/50 text-white font-bold text-xs.5 py-2.5 transition active:scale-95 cursor-pointer"
                  >
                    {isLinking ? (
                      <>
                        <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                        <span>Initializing...</span>
                      </>
                    ) : (
                      <>
                        <Cloud className="h-3.5 w-3.5" />
                        <span>Start New Sync</span>
                      </>
                    )}
                  </button>
                </div>

                {/* OPTION B: JOIN EXISTING */}
                <div className="rounded-2xl border border-earth-sand p-5 flex flex-col justify-between space-y-4 bg-white hover:border-earth-olive/40 hover:shadow-sm transition">
                  <div className="space-y-1.5">
                    <span className="text-[10px] text-earth-olive font-extrabold tracking-widest uppercase">Option B</span>
                    <h3 className="text-sm font-bold text-earth-charcoal font-serif">Link Existing Device</h3>
                    <p className="text-xs text-earth-warm-gray leading-relaxed">
                      Sync this device to an active meal planner code from your other phone or computer.
                    </p>
                  </div>
                  <form onSubmit={handleLinkCode} className="space-y-2">
                    <input
                      type="text"
                      placeholder="e.g. PUNK-AXX9"
                      value={inputCode}
                      onChange={(e) => setInputCode(e.target.value)}
                      className="w-full text-center font-mono font-bold rounded-xl border border-earth-sand py-2 text-xs.5 bg-earth-cream/10 focus:border-earth-sage transition uppercase"
                      disabled={isLinking}
                      maxLength={14}
                    />
                    <button
                      type="submit"
                      disabled={isLinking || !inputCode.trim()}
                      className="w-full inline-flex md:h-11 items-center justify-center gap-1.5 rounded-xl border border-earth-olive text-earth-olive hover:bg-earth-sage-light/25 disabled:opacity-50 font-bold text-xs.5 py-2.5 transition active:scale-95 cursor-pointer"
                    >
                      {isLinking ? (
                        <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <span>Link Room Code</span>
                      )}
                    </button>
                  </form>
                </div>
              </div>

              {errorMessage && (
                <div className="rounded-xl bg-red-50 text-red-700 font-semibold text-xs py-3 px-4 border border-red-200 flex items-center gap-2">
                  <AlertTriangle className="h-4.5 w-4.5 shrink-0 text-red-500" />
                  <span>{errorMessage}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
