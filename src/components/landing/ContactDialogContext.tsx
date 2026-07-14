import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { contact } from "@/data/site";

interface Ctx {
  open: () => void;
  close: () => void;
  isOpen: boolean;
}

const ContactDialogCtx = createContext<Ctx | null>(null);

export function useContactDialog() {
  const ctx = useContext(ContactDialogCtx);
  if (!ctx) throw new Error("useContactDialog must be used inside ContactDialogProvider");
  return ctx;
}

export function ContactDialogProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLElement | null>(null);
  const hasQr = Boolean(contact.wechatQrSrc);

  const open = useCallback(() => {
    triggerRef.current = (typeof document !== "undefined" ? (document.activeElement as HTMLElement | null) : null);
    setIsOpen(true);
  }, []);
  const close = useCallback(() => setIsOpen(false), []);

  // restore focus to the trigger when the dialog closes
  useEffect(() => {
    if (!isOpen && triggerRef.current) {
      const t = triggerRef.current;
      // defer so Radix has finished unmounting
      const id = window.setTimeout(() => t.focus?.(), 0);
      return () => window.clearTimeout(id);
    }
  }, [isOpen]);

  return (
    <ContactDialogCtx.Provider value={{ open, close, isOpen }}>
      {children}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          className="w-[min(92vw,26rem)] gap-6 border-white/10 bg-card/95 p-6 backdrop-blur-xl sm:p-8"
        >
          <DialogHeader className="text-center sm:text-center">
            <DialogTitle className="font-display text-2xl font-normal tracking-tight text-foreground">
              联系 {contact.name}
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              {hasQr
                ? "扫码添加微信，沟通合作与创作交流。"
                : "微信二维码待补充，稍后开放。"}
            </DialogDescription>
          </DialogHeader>

          <div className="mx-auto w-full max-w-[16rem]">
            {hasQr ? (
              <div className="relative aspect-square overflow-hidden rounded-lg border border-white/10 bg-white p-3">
                <img
                  src={contact.wechatQrSrc}
                  alt={contact.wechatQrAlt}
                  width={512}
                  height={512}
                  className="h-full w-full object-contain"
                />
              </div>
            ) : (
              <div
                className="relative flex aspect-square items-center justify-center rounded-lg border border-dashed border-white/15 bg-white/[0.02] p-6 text-center text-sm leading-relaxed text-muted-foreground"
                role="status"
                aria-live="polite"
              >
                微信二维码待补充
                <br />
                稍后由 Jiang 更新
              </div>
            )}
          </div>

          {hasQr ? (
            <p className="text-center font-mono-tight text-gold/80">
              WeChat · {contact.name}
            </p>
          ) : null}
        </DialogContent>
      </Dialog>
    </ContactDialogCtx.Provider>
  );
}