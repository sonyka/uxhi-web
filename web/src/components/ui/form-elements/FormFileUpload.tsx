"use client";

import { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { FormHelpText } from "./FormHelpText";
import { FieldError } from "../FormFeedback";

interface FormFileUploadProps {
  name: string;
  accept?: string;
  required?: boolean;
  helpText?: string;
  showPreview?: boolean;
  /**
   * Largest file the form may send. An image over it is scaled down in the
   * browser rather than refused — phone cameras routinely produce 5–10MB, and
   * a request over the server's body limit never reaches the action's own
   * size check, so the visitor got the crash page instead of a message.
   */
  maxBytes?: number;
  className?: string;
}

/** Long edge after shrinking: well past any avatar or card it is shown in. */
const SHRINK_MAX_EDGE = 2000;

/**
 * Redraws an image as a JPEG that fits under maxBytes, or returns null when it
 * cannot — an unreadable file, or one still too large at the lowest quality.
 */
async function shrinkImage(file: File, maxBytes: number): Promise<File | null> {
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, SHRINK_MAX_EDGE / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    // JPEG has no transparency; without a fill a transparent PNG turns black.
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close();

    for (const quality of [0.85, 0.7, 0.55]) {
      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, "image/jpeg", quality),
      );
      if (blob && blob.size <= maxBytes) {
        const base = file.name.replace(/\.[^.]+$/, "");
        return new File([blob], `${base}.jpg`, { type: "image/jpeg" });
      }
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * 9_777_567 → "9.8MB". Decimal megabytes, the unit Finder and phones show, so
 * the number matches what the visitor sees beside the file. One decimal so a
 * small resized photo isn't "0MB".
 */
function formatMB(bytes: number): string {
  return `${(bytes / 1_000_000).toFixed(1)}MB`;
}

export function FormFileUpload({
  name,
  accept = "image/jpeg,image/png,image/webp",
  required,
  helpText,
  showPreview = false,
  maxBytes,
  className,
}: FormFileUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  // Said out loud rather than done silently: the visitor chose one file and
  // is sending another, and should know that before they submit.
  const [note, setNote] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const input = e.currentTarget;
    let file = input.files?.[0];
    setError(null);
    setNote(null);

    if (file && maxBytes && file.size > maxBytes) {
      const original = file;
      const limit = formatMB(maxBytes).replace(".0MB", "MB");
      // Emptied while it shrinks, so a quick submit can't send the original.
      input.value = "";
      file = original.type.startsWith("image/")
        ? (await shrinkImage(original, maxBytes)) ?? undefined
        : undefined;
      if (file) {
        const files = new DataTransfer();
        files.items.add(file);
        input.files = files.files;
        setNote(`Resized from ${formatMB(original.size)} to ${formatMB(file.size)} to fit the ${limit} limit.`);
      } else {
        const kind = original.type.startsWith("image/") ? "photo" : "file";
        setError(
          `This ${kind} is ${formatMB(original.size)} and couldn't be made smaller than ${limit}. Please choose a smaller one.`,
        );
      }
    }

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
      <label htmlFor={`file-${name}`} className="sr-only">
        Upload {name}
      </label>
      <input
        ref={inputRef}
        id={`file-${name}`}
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
            <span className="text-xs text-purple-30 truncate max-w-[200px]">{fileName}</span>
          )}
        </div>
      </div>

      {error && <FieldError errors={{ [name]: [error] }} field={name} className="mt-0" />}
      {note && <FormHelpText className="mt-0">{note}</FormHelpText>}

      {helpText && (
        <FormHelpText className="mt-0">{helpText}</FormHelpText>
      )}
    </div>
  );
}
