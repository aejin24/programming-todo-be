export type TGithubRequest = {
  code: string;
};

export type TGithubResponse = {
  error?: string;
  error_description?: string;
  access_token?: string;
  token_type?: string;
};

export type TMember = {
  id: number;
  login: string;
  email: string;
  name: string;
  repository: string;
};
