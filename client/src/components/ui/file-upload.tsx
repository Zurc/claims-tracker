import { UploadCloud, File, X } from "lucide-react";
import { Button } from "./button";
import { Card } from "./card";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  onFileSelect: (files: FileList) => void;
  accept?: string;
  multiple?: boolean;
  className?: string;
}

export function FileUpload({
  onFileSelect,
  accept = "image/*,application/pdf",
  multiple = true,
  className
}: FileUploadProps) {
  return (
    <div className={cn("grid w-full gap-4", className)}>
      <label
        htmlFor="file-upload"
        className="relative flex min-h-[150px] cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-muted-foreground/25 bg-muted/25 px-6 py-4 text-center hover:bg-muted/50"
      >
        <UploadCloud className="h-10 w-10 text-muted-foreground" />
        <div className="mt-2 text-sm text-muted-foreground">
          <span className="font-semibold">Click to upload</span> or drag and drop
        </div>
        <p className="text-xs text-muted-foreground">
          Supported formats: Images, PDF
        </p>
        <input
          id="file-upload"
          type="file"
          className="absolute h-full w-full opacity-0 cursor-pointer"
          onChange={(e) => e.target.files && onFileSelect(e.target.files)}
          accept={accept}
          multiple={multiple}
        />
      </label>
    </div>
  );
}

interface FileListProps {
  files: Array<{ fileName: string; fileType: string }>;
  onRemove?: (index: number) => void;
}

export function FileList({ files, onRemove }: FileListProps) {
  if (!files.length) return null;

  return (
    <div className="grid gap-2">
      {files.map((file, index) => (
        <Card key={index} className="p-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <File className="h-4 w-4" />
            <span className="text-sm">{file.fileName}</span>
          </div>
          {onRemove && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => onRemove(index)}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Remove file</span>
            </Button>
          )}
        </Card>
      ))}
    </div>
  );
}
