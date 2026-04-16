"use client";

import { useEffect, useId, useRef, useState, type ChangeEvent } from "react";

type UploadImageProps = {
	id?: string;
	title?: string;
	description?: string;
	accept?: string;
	maxSizeLabel?: string;
	file: File | null;
	onFileChange: (file: File | null) => void;
	className?: string;
};

function AvatarGlyph() {
	return (
		<svg aria-hidden="true" viewBox="0 0 24 24" className="h-9 w-9 text-slate-300/90">
			<path
				fill="currentColor"
				d="M12 12.75a4.5 4.5 0 1 0-4.5-4.5 4.5 4.5 0 0 0 4.5 4.5Zm0-7.5a3 3 0 1 1-3 3 3 3 0 0 1 3-3Zm0 8.25c-4.42 0-8 2.79-8 6.23a.75.75 0 0 0 1.5 0c0-2.55 3.12-4.73 6.5-4.73s6.5 2.18 6.5 4.73a.75.75 0 0 0 1.5 0c0-3.44-3.58-6.23-8-6.23Z"
			/>
		</svg>
	);
}

export default function UploadImage({
	id,
	title = "Upload avatar",
	description = "PNG, JPG up to 2MB",
	accept = "image/png, image/jpeg",
	maxSizeLabel = "2MB",
	file,
	onFileChange,
	className,
}: UploadImageProps) {
	const generatedId = useId();
	const inputId = id ?? generatedId;
	const inputRef = useRef<HTMLInputElement>(null);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);

	useEffect(() => {
		if (!file) {
			setPreviewUrl(null);
			return;
		}

		const objectUrl = URL.createObjectURL(file);
		setPreviewUrl(objectUrl);

		return () => URL.revokeObjectURL(objectUrl);
	}, [file]);

	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		const selectedFile = event.target.files?.[0] ?? null;
		onFileChange(selectedFile);
	};

	const handleClear = () => {
		if (inputRef.current) {
			inputRef.current.value = "";
		}
		onFileChange(null);
	};

	return (
		<div
			className={`relative overflow-hidden rounded-3xl border border-white/10 bg-[linear-gradient(180deg,rgba(11,18,36,0.95),rgba(9,14,28,0.84))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_18px_48px_rgba(2,6,23,0.45)] ${className ?? ""}`}
		>
			<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.16),transparent_45%),radial-gradient(circle_at_bottom,rgba(139,92,246,0.12),transparent_52%)]" />

			<div className="relative flex flex-col items-center text-center">
				<button
					type="button"
					onClick={() => inputRef.current?.click()}
					className="focus-ring group flex flex-col items-center gap-3 rounded-3xl px-2 py-2 transition-transform duration-200 hover:-translate-y-0.5"
				>
					<span className="relative grid h-28 w-28 place-content-center rounded-full border border-dashed border-white/18 bg-[radial-gradient(circle_at_top,rgba(15,23,42,0.92),rgba(2,6,23,0.98))] shadow-[0_0_0_1px_rgba(59,130,246,0.08),inset_0_0_0_1px_rgba(255,255,255,0.04)] transition-[border-color,transform,box-shadow] duration-200 group-hover:border-cyan-300/50 group-hover:shadow-[0_0_0_1px_rgba(34,211,238,0.18),0_0_30px_rgba(59,130,246,0.12)]">
						{previewUrl ? (
							<img
								src={previewUrl}
								alt={file ? `${title} preview` : title}
								className="h-full w-full rounded-full object-cover"
							/>
						) : (
							<AvatarGlyph />
						)}
					</span>

					<span className="space-y-1">
						<span className="block text-sm font-semibold tracking-[0.01em] text-(--text-strong)">
							{title}
						</span>
						<span className="block text-xs leading-5 text-(--text-muted)">
							{description}
						</span>
					</span>
				</button>

				<input
					ref={inputRef}
					id={inputId}
					type="file"
					accept={accept}
					className="sr-only"
					onChange={handleFileChange}
				/>

				<div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400">
					<span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
						Nhấn để chọn ảnh
					</span>
					<span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
						Tối đa {maxSizeLabel}
					</span>
					{file ? (
						<button
							type="button"
							onClick={handleClear}
							className="focus-ring rounded-full border border-cyan-300/20 bg-cyan-400/10 px-3 py-1.5 text-cyan-200 transition-colors hover:border-cyan-300/40 hover:bg-cyan-400/15"
						>
							Xóa ảnh
						</button>
					) : null}
				</div>

				{file ? (
					<p className="mt-3 max-w-full truncate text-xs text-slate-500" title={file.name}>
						{file.name}
					</p>
				) : null}
			</div>
		</div>
	);
}
