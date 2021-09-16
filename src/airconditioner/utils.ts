import { EndpointParameter, EndpointValues } from "../home";

import {
  AirConditionerEndpointParams,
  AirConditionerEndpointValueTypes,
  AirConditionerFanModes,
  AirConditionerModes,
  AirConditionerState,
  RawAirConditioner,
} from "./types";

const getEndpointValue = (
  data: EndpointValues["Values"],
  valueType: AirConditionerEndpointValueTypes
) => Number((data.find((row) => row.ValueType === valueType) || {}).Value || 0);

const getEndpointParameter = (
  data: Array<EndpointParameter>,
  valueName: AirConditionerEndpointParams
) => Number((data.find((row) => row.Name === valueName) || {}).Value) || 0;

const parseEndpointValues = (
  data: EndpointValues["Values"]
): AirConditionerState => {
  return {
    mode: getEndpointValue(
      data,
      AirConditionerEndpointValueTypes.Mode
    ) as AirConditionerModes,
    fanMode: getEndpointValue(
      data,
      AirConditionerEndpointValueTypes.FanMode
    ) as AirConditionerFanModes,
    targetTemp: getEndpointValue(
      data,
      AirConditionerEndpointValueTypes.TargetTemp
    ),
    currentTemp: getEndpointValue(
      data,
      AirConditionerEndpointValueTypes.CurrentTemp
    ),
    swingMode: getEndpointValue(
      data,
      AirConditionerEndpointValueTypes.SwingMode
    ),
  };
};

const parseEndpointParameters = (data: Array<EndpointParameter>) => {
  return {
    temp: {
      min: getEndpointParameter(data, AirConditionerEndpointParams.SetpointMin),
      max: getEndpointParameter(data, AirConditionerEndpointParams.SetpointMax),
    },
  };
};

export const parseAirConditioner = ({
  endpoint,
  endpointValues,
}: RawAirConditioner) => {
  return {
    id: endpoint.DeviceID,
    endpointId: endpoint.EndpointID,
    name: endpoint.Description,
    model: endpoint.DeviceModelDesc,
    state: parseEndpointValues(endpointValues.Values),
    params: parseEndpointParameters(endpoint.Parameters),
  };
};
