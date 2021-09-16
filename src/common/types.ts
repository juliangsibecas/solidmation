export interface ResponseStatus {
  Messages: Array<{
    Code: number;
    Description: string;
  }>;
  Status: number;
}
