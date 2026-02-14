"use client";

import { useState, useRef } from "react";
import { cn } from "@/lib/utils";

interface FormFileUploadProps {
  name: string;
  accept?: string;
  required?: boolean;
  helpText?: string;
  showPreview?: boolean;
  className?: string;
}

export function FormFileUpload({
  name,
  accept = "image/jpeg,image/png,image/webp",
  required,
  helpText,
  showPreview = false,
  className,
}: FormFileUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      if (showPreview) {
        const url = URL.createObjectURL(file);
        setPreview(url);
      }
    } else {
      setFileName(null);
      setPreview(null);
    }
  }

  return (
    <div className={cn("space-y-2", className)}>
      <input
        ref={inputRef}
        type="file"
        name={name}
        accept={accept}
        required={required}
        onChange={handleChange}
        className="sr-only"
      />

      <div className="flex items-center gap-4">
        {showPreview && preview && (
          <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0 border-2 border-white/30">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
          </div>
        )}

        <div className="flex flex-col gap-1">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-medium text-white hover:bg-white/20 cursor-pointer transition-colors"
          >
            {fileName ? "Change file" : "Choose file"}
          </button>
          {fileName && (
            <span className="text-xs text-purple-200 truncate max-w-[200px]">{fileName}</span>
          )}
        </div>
      </div>

      {helpText && (
        <p className="text-xs text-purple-300/60">{helpText}</p>
      )}
    </div>
  );
}
