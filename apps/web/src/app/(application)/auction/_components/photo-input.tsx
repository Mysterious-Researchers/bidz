"use client";
import * as React from "react";
import { Icons } from "@/components/icons";
import PhotoApi from "@/lib/api/photo";
const BlankPhoto = () => {
  return (
    <div className="bg flex h-[130px] w-[200px] items-center justify-center rounded-xl bg-gray-50">
      <Icons.Camera />
    </div>
  );
};

interface PhotoInputFieldProps {
  photos: string[];
  onPhotoAdd: (url: string) => void;
  onPhotoDelete: (url: string) => void;
}

interface PhotoInputProps
  extends Omit<PhotoInputFieldProps, "photos" | "onPhotoDelete"> {
  index: number;
}
const PhotoInput = ({ onPhotoAdd, index }: PhotoInputProps) => {
  const handleFileSelected = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (!event.target.files) return;
    const file = event.target.files[0]!;
    const form = new FormData();
    form.append("photos", file, file.name);

    const {
      data: { link },
    } = await PhotoApi.createPhoto(form, index);

    onPhotoAdd(link);

    // reader.readAsArrayBuffer(file!);
  };

  return (
    <div className="flex h-[130px] w-[200px] items-center justify-center">
      <label
        htmlFor="dropzone-file"
        className="dark:hover:bg-bray-800 flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-blue-50 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        <div className="flex flex-col items-center justify-center px-5">
          <Icons.Upload />
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload</span>
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            SVG, PNG, JPG or GIF
          </p>
        </div>
        <input
          accept="image/png, image/jpeg"
          id="dropzone-file"
          type="file"
          className="hidden"
          onInput={handleFileSelected}
        />
      </label>
    </div>
  );
};

const FilledPhoto = ({
  url,
  onPhotoDelete,
}: {
  url: string;
  onPhotoDelete: (url: string) => void;
}) => {
  return (
    <div className="relative flex h-[130px] w-[200px] items-center justify-center overflow-hidden rounded-xl">
      <span
        className="absolute cursor-pointer opacity-0 transition hover:opacity-100"
        onClick={() => onPhotoDelete(url)}
      >
        <Icons.MinusCircle color="red" width={48} height={48} />
      </span>
      <img
        src={url}
        alt={"some photo"}
        className="h-full w-full object-cover"
      />
    </div>
  );
};

const PhotoInputField = ({
  onPhotoDelete,
  photos,
  onPhotoAdd,
}: PhotoInputFieldProps) => {
  const filledPhotosLength = photos.length;
  const blankPhotosLength = 8 - filledPhotosLength;
  photos = photos.slice(0, 8);

  const blankPhotos = Array.from(
    { length: blankPhotosLength },
    (_, i) => i + 1,
  );

  return (
    <div className="flex flex-wrap gap-4">
      {photos.map((url, index) => (
        <FilledPhoto key={url} url={url} onPhotoDelete={onPhotoDelete} />
      ))}
      {filledPhotosLength < 8 && (
        <PhotoInput onPhotoAdd={onPhotoAdd} index={filledPhotosLength + 1} />
      )}
      {blankPhotos.map((i) => (
        <BlankPhoto key={i} />
      ))}
    </div>
  );
};

export { PhotoInputField };
