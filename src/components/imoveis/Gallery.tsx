import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export function Gallery({ fotos, alt }: { fotos: string[]; alt: string }) {
  const [emblaRef, embla] = useEmblaCarousel({ loop: true });
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  useEffect(() => {
    if (!embla) return;
    const onSel = () => setIndex(embla.selectedScrollSnap());
    embla.on("select", onSel);
    onSel();
    return () => { embla.off("select", onSel); };
  }, [embla]);

  const goTo = useCallback((i: number) => embla?.scrollTo(i), [embla]);

  return (
    <>
      <div className="card-soft overflow-hidden">
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {fotos.map((src, i) => (
                <div key={i} className="relative min-w-0 flex-[0_0_100%]">
                  <div className="aspect-[16/9] bg-muted">
                    <img src={src} alt={`${alt} — foto ${i + 1}`} className="h-full w-full object-cover" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => embla?.scrollPrev()}
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-background/90 p-2 shadow-md hover:bg-background"
            aria-label="Anterior"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => embla?.scrollNext()}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-background/90 p-2 shadow-md hover:bg-background"
            aria-label="Próximo"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          <button
            onClick={() => setLightbox(true)}
            className="absolute right-3 top-3 rounded-md bg-background/90 px-2.5 py-1.5 text-xs font-medium shadow-md hover:bg-background"
          >
            <Maximize2 className="mr-1 inline h-3.5 w-3.5" /> Ver tudo
          </button>
          <div className="absolute bottom-3 right-3 rounded-md bg-foreground/80 px-2 py-1 font-mono text-[11px] text-background">
            {index + 1} / {fotos.length}
          </div>
        </div>

        <div className="scrollbar-thin flex gap-2 overflow-x-auto p-3">
          {fotos.map((src, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={cn(
                "h-16 w-24 shrink-0 overflow-hidden rounded-md border-2 transition-all",
                i === index ? "border-primary" : "border-transparent opacity-70 hover:opacity-100",
              )}
            >
              <img src={src} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      <Dialog open={lightbox} onOpenChange={setLightbox}>
        <DialogContent className="max-w-6xl border-0 bg-black/95 p-0">
          <button
            onClick={() => setLightbox(false)}
            className="absolute right-4 top-4 z-10 rounded-full bg-background/20 p-2 text-background hover:bg-background/40"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="flex h-[80vh] items-center justify-center">
            <img src={fotos[index]} alt={alt} className="max-h-full max-w-full object-contain" />
          </div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-md bg-background/20 px-3 py-1 text-xs text-background">
            {index + 1} / {fotos.length}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
