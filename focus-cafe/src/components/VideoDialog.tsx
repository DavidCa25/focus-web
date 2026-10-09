import { useRef } from "react";
import type { ReactNode } from "react";
import "./VideoDialog.css";

interface VideoDialogProps {
  src: string | null;
  poster: string;
  title: string;
  className?: string;
  /** Contenido del botón que abre el video. */
  children: ReactNode;
}

export function VideoDialog({ src, poster, title, className, children }: VideoDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const open = () => {
    dialogRef.current?.showModal();
    videoRef.current?.play().catch(() => {});
  };
  const close = () => dialogRef.current?.close();

  return (
    <>
      <button type="button" className={className} onClick={open} aria-label={`Reproducir: ${title}`}>
        {children}
      </button>

      <dialog
        ref={dialogRef}
        className="vdialog"
        aria-label={title}
        onClick={(e) => e.target === e.currentTarget && close()}
        onClose={() => videoRef.current?.pause()}
      >
        <button type="button" className="vdialog__close" onClick={close} aria-label="Cerrar video">
          ✕
        </button>
        <div className="vdialog__frame">
          {src ? (
            <video ref={videoRef} src={src} poster={poster} controls playsInline />
          ) : (
            <div className="vdialog__empty" style={{ backgroundImage: `url(${poster})` }}>
              <span>Muy pronto: el video de Focus</span>
            </div>
          )}
        </div>
      </dialog>
    </>
  );
}
