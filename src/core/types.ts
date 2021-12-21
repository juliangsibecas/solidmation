import { ResponseStatus } from '../common/types'
import { RawHome } from '../home'

export interface LoginResBody {
  d: string;
}

export interface EnumHomesRes {
  EnumHomesResult: {
    Homes: Array<RawHome>;
    ResponseStatus: ResponseStatus;
  };
}
