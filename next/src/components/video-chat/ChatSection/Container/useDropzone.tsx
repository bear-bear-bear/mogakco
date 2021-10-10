import { useCallback, useContext, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { DropzoneState, useDropzone } from 'react-dropzone';
import type { FileRejection } from 'react-dropzone';

import { uploadImage } from '@lib/apis';
import { logAxiosError } from '@lib/apiClient';
import type { GeneralAxiosError } from 'typings/common';

import { ChatContext } from '../ChatContext';

type ErrorMessages = string[];
type DropzoneErrorState = {
  curr: ErrorMessages;
  set: Dispatch<SetStateAction<ErrorMessages>>;
};

interface Props {
  setIsShowDropzoneUI: Dispatch<SetStateAction<boolean>>;
}

const useCustomDropZone = ({
  setIsShowDropzoneUI,
}: Props): [DropzoneState, DropzoneErrorState] => {
  const chat = useContext(ChatContext);
  const [errorMessages, setErrorMessages] = useState<ErrorMessages>([]);
  const dropzoneError: DropzoneErrorState = {
    curr: errorMessages,
    set: setErrorMessages,
  };

  const onDropAccepted = useCallback(
    async ([acceptedOneFile]: File[]) => {
      setIsShowDropzoneUI(false);

      try {
        const formData = new FormData();
        formData.append('image', acceptedOneFile);
        const { url } = await uploadImage(formData);

        const MarkdownImageString = `![image](${url})`;
        chat.set((prev) => prev + MarkdownImageString);
      } catch (err) {
        logAxiosError(err as GeneralAxiosError);
      }
    },
    [chat, setIsShowDropzoneUI],
  );

  const onDropRejected = useCallback(
    (fileRejections: FileRejection[]) => {
      setIsShowDropzoneUI(false);

      const fileRejectionMessages = fileRejections
        .map(({ errors }) => errors.map((error) => error.message))
        .flat();
      const deduplicatedFileRejectionMessages = Array.from(
        new Set(fileRejectionMessages),
      );

      // TODO: Rejection 이유 한글로 매칭하기 (현재 영어)
      setErrorMessages(deduplicatedFileRejectionMessages);
    },
    [setIsShowDropzoneUI],
  );

  const onDragEnter = () => {
    setIsShowDropzoneUI(true);
  };

  const onDragLeave = () => {
    setIsShowDropzoneUI(false);
  };

  return [
    useDropzone({
      accept: 'image/*',
      maxSize: 5 * 10 ** 6, // 5MB - 임시
      multiple: false,
      noClick: true,
      noKeyboard: true,
      onDropAccepted,
      onDropRejected,
      onDragEnter,
      onDragLeave,
    }),
    dropzoneError,
  ];
};

export default useCustomDropZone;
