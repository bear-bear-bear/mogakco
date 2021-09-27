import { useCallback } from 'react';
import type { DragEvent } from 'react';
import { useDropzone } from 'react-dropzone';
import type { FileRejection } from 'react-dropzone';

const useCustomDropZone = () => {
  const onDropAccepted = useCallback((acceptedFiles: File[]) => {
    console.log(Array.isArray(acceptedFiles));
    console.log(acceptedFiles);
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log('파일 읽기가 중단되었습니다'); // TODO: 모달로 변경
      reader.onerror = () => console.log('파일 읽기가 실패했습니다.'); // TODO: 모달로 변경
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result;
        console.log('binaryStr', binaryStr);
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);

  const onDropRejected = useCallback((fileRejections: FileRejection[]) => {
    // TODO: Rejection 이유 한글로 매칭해서 모달로 띄워주기
    console.log('drop rejected', fileRejections);
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
