export interface Message {
  text: string | null;
  userId: string;
  userName: string;
  msgId: string;
  file: string | null;
  fileType: string | null;
}
