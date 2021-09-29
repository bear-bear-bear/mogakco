import { useCallback, useContext } from 'react';
import type { DragEvent } from 'react';
import { useDropzone } from 'react-dropzone';
import type { FileRejection } from 'react-dropzone';

import { uploadImage } from '@lib/apis';
import { logAxiosError } from '@lib/apiClient';
import type { GeneralAxiosError } from 'typings/common';

import { ChatContext } from '../ChatContext';

const useCustomDropZone = () => {
  const chat = useContext(ChatContext);

  const onDropAccepted = useCallback(
    async ([acceptedOneFile]: File[]) => {
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
    [chat],
  );

  const onDropRejected = useCallback((fileRejections: FileRejection[]) => {
    const errorMessages = fileRejections
      .map(({ errors }) => errors.map((error) => error.message))
      .flat();
    const deduplicatedErrorMessages = Array.from(new Set(errorMessages));

    // TODO: Rejection 이유 한글로 매칭해서 모달로 띄워주기
    alert(deduplicatedErrorMessages.join('\n'));
  }, []);

  const onDragEnter = useCallback((e: DragEvent<HTMLTextAreaElement>) => {
    // TODO: 파일 드롭 UI on
    console.log('drag enter');
  }, []);

  const onDragLeave = useCallback((e: DragEvent<HTMLTextAreaElement>) => {
    // TODO: 파일 드롭 UI off
    console.log('drag leave');
  }, []);

  return useDropzone({
    accept: 'image/*',
    maxSize: 5 * 10 ** 6, // 5MB - 임시
    multiple: false,
    noClick: true,
    noKeyboard: true,
    onDropAccepted,
    onDropRejected,
    onDragEnter,
    onDragLeave,
  });
};

export default useCustomDropZone;
