export type TPlan = {
  id?: number;
} & TPlanWriteRequest;

export type TPlanWriteRequest = {
  content: string;
  repository: string;
  register_date: string;
  member_id: number;
};
