import { ResponseStatus } from "../common/types";

export interface IHome {
  id: number;
  name: string;
}

export interface RawHome {
  HomeID: number;
  Description: string;
}

export interface GetDataPacketRes {
  GetDataPacketResult: {
    Endpoints?: Array<Endpoint>;
    EndpointValues: Array<EndpointValues>;
    ResponseStatus: ResponseStatus;
  };
}

export interface Endpoint {
  DeviceID: number;
  Description: string;
  DeviceModelDesc: string;
  EndpointID: number;
  EndpointType: number;
  Parameters: Array<EndpointParameter>;
}

export interface EndpointParameter {
  Name: string;
  Value: string;
}

export interface EndpointValues {
  EndpointID: number;
  Values: Array<{
    ValueType: number;
    Value: string;
  }>;
}
