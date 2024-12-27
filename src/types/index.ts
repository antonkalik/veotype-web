export type Session = {
  id: number;
  name: string;
  email: string;
  token: string;
};

export type SessionData = {
  data: Session | null;
  logout: () => Promise<void>;
  login: (session: Session | null) => void;
};
