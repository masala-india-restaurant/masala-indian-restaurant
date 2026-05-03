"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { type FieldDiff, formatPreview } from "./diff";

export function PublishConfirmDialog({
  open,
  onOpenChange,
  diff,
  onConfirm,
  busy,
  locale,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  diff: FieldDiff[];
  onConfirm: () => void;
  busy: boolean;
  locale: string;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="dark max-h-[calc(100dvh-2rem)] w-[calc(100vw-2rem)] overflow-y-auto border-zinc-800 bg-zinc-950 text-white sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Publish to {locale.toUpperCase()}?</DialogTitle>
          <DialogDescription className="text-zinc-400">
            These changes will go live to customers on the{" "}
            {locale.toUpperCase()}{" "}
            site. This is reversible — you can restore an earlier version from
            history.
          </DialogDescription>
        </DialogHeader>

        <div className="max-h-80 overflow-y-auto rounded-md border border-zinc-800 divide-y divide-zinc-800">
          {diff.length === 0
            ? <p className="p-4 text-sm text-zinc-500">No changes detected.</p>
            : (
              diff.map((d) => (
                <div key={d.field} className="p-3 space-y-1.5">
                  <p className="text-xs uppercase tracking-wide text-zinc-400">
                    {d.field}
                  </p>
                  <div className="grid gap-3 text-sm sm:grid-cols-2">
                    <div className="text-zinc-500">
                      <p className="text-[10px] uppercase text-zinc-600 mb-0.5">
                        Before
                      </p>
                      <p className="wrap-break-word">
                        {formatPreview(d.before)}
                      </p>
                    </div>
                    <div className="text-amber-300">
                      <p className="text-[10px] uppercase text-amber-500/70 mb-0.5">
                        After
                      </p>
                      <p className="wrap-break-word">
                        {formatPreview(d.after)}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
        </div>

        <DialogFooter className="border-zinc-800 bg-zinc-950">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={busy}
            className="border-zinc-600 bg-zinc-900 text-zinc-100 hover:bg-zinc-800 hover:text-white focus-visible:border-zinc-500 focus-visible:ring-zinc-500/25"
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            disabled={busy || diff.length === 0}
            className="bg-green-700 text-white hover:bg-green-600 focus-visible:border-green-500/40 focus-visible:ring-green-500/20"
          >
            {busy ? "Publishing…" : "Publish"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
