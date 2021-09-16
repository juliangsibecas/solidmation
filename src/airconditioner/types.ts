import { Endpoint, EndpointValues } from "../home/";

export interface RawAirConditioner {
  endpoint: Endpoint;
  endpointValues: EndpointValues;
}

export interface IAirConditioner {
  id: number;
  endpointId: number;
  name: string;
  model: string;
  state: AirConditionerState;
  params: AirConditionerParams;
}

export enum AirConditionerEndpointValueTypes {
  Type = 0x0000000c,

  Mode = 14,
  SwingMode = 18,
  FanMode = 15,
  CurrentTemp = 13,
  TargetTemp = 20,
}

export enum AirConditionerEndpointParams {
  SetpointMin = "SetpointMinC",
  SetpointMax = "SetpointMaxC",
}

export enum AirConditionerFanModes {
  Slow = 1,
  Mid = 2,
  High = 3,
  Auto = 254,
  NoChange = 255,
}

export enum AirConditionerSwingModes {
  Off = 0,
  Turbo = 8,
  Horizontal = 16,
  TurboHorizontal = 24,
}

export enum AirConditionerModes {
  Off = 0,
  Cool = 1,
  Heat = 2,
  Dry = 3,
  Fan = 4,
  Auto = 254,
  NoChange = 255,
}

export interface AirConditionerState {
  mode: AirConditionerModes;
  fanMode: AirConditionerFanModes;
  swingMode: AirConditionerSwingModes;
  currentTemp: number;
  targetTemp: number;
}

export interface AirConditionerParams {
  temp: {
    min: number;
    max: number;
  };
}
