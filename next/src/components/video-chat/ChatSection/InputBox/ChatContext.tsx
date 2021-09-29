import { createContext } from 'react';
import type { FC, SetStateAction, ChangeEvent } from 'react';
import useInput from '@hooks/useInput';
import useChatClient from '@hooks/chat/useChatClient';
import { ChatEvent } from '@lib/enum';

export const ChatContext = createContext<{
  get: () => string;
  set: (v: SetStateAction<string>) => void;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  send: (message: string) => void;
}>({
  get: () => '',
  set: () => undefined,
  onChange: () => undefined,
  send: () => undefined,
});

export const ChatProvider: FC = ({ children }) => {
  const socketClient = useChatClient();
  const [value, onChange, setValue] = useInput('');

  const initialValue = {
    get: () => value,
    set: (v: SetStateAction<string>) => setValue(v),
    send: (message: string) => {
      const clearedChat = message.trim();
      if (clearedChat === '') return;

      socketClient.emit(ChatEvent.SEND_CHAT, clearedChat);
      setValue('');
    },
    onChange,
  };

  return (
    <ChatContext.Provider value={initialValue}>{children}</ChatContext.Provider>
  );
};
