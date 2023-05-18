export type TGithubRequest = {
  code: string;
};

export type TGithubResponse = {
  error?: string;
  error_description?: string;
  access_token?: string;
  token_type?: string;
};