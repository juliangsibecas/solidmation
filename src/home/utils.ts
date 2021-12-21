import { GetDataPacketRes, IHome, RawHome } from './types'

import {
  AirConditionerEndpointValueTypes,
  RawAirConditioner,
} from '../airconditioner'

export const parseHome = (raw: RawHome): IHome => ({
  id: raw.HomeID,
  name: raw.Description,
})

export const filterAirConditioners = (
  data: GetDataPacketRes['GetDataPacketResult']
): Array<RawAirConditioner> => {
  const { EndpointValues, Endpoints } = data

  if (!Endpoints) {
    return []
  }

  return Endpoints.filter(
    (endpoint) =>
      endpoint.EndpointType === AirConditionerEndpointValueTypes.Type
  ).map((endpoint) => {
    const endpointValues = EndpointValues.find(
      (values) => values.EndpointID === endpoint.EndpointID
    )

    if (!endpointValues) {
      throw new Error()
    }

    return { endpoint, endpointValues }
  })
}
