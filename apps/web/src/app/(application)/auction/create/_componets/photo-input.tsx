"use client";
import { Icons } from "@/components/icons";

const PhotoInput = ({ key }: { key?: string }) => {
  return (
    <div className="flex h-[130px] w-[200px] items-center justify-center">
      <label
        htmlFor="dropzone-file"
        className="dark:hover:bg-bray-800 flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
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
        <input id="dropzone-file" type="file" className="hidden" />
      </label>
    </div>
  );
};

const PhotoInputField = () => {
  return <PhotoInput />;
};

export { PhotoInputField };
