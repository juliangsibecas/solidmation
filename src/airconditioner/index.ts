import { parseAirConditioner } from './utils'
import {
  AirConditionerState,
  AirConditionerModes,
  AirConditionerFanModes,
  AirConditionerParams,
  RawAirConditioner,
} from './types'

import { base } from '../common/base'

export class AirConditioner {
  _id: number
  _endpointId: number
  _name: string
  _model: string
  _state: AirConditionerState
  _params: AirConditionerParams

  constructor(raw: RawAirConditioner) {
    const { id, endpointId, name, model, state, params } =
      parseAirConditioner(raw)

    this._id = id
    this._endpointId = endpointId
    this._name = name
    this._model = model
    this._state = state
    this._params = params
  }

  get id() {
    return this._id
  }

  get endpointId() {
    return this._endpointId
  }

  get name() {
    return this._name
  }

  get model() {
    return this._model
  }

  get state() {
    return this._state
  }

  get params() {
    return this._params
  }

  async setStatus(state: Partial<AirConditionerState>) {
    this._state = {
      ...this._state,
      ...state,
    }

    base.post('/HomeCloudCommandService.svc/HVACSetModes', {
      endpointID: this._endpointId,
      mode: state.mode
        ? state.mode
        : state.mode === 0
          ? AirConditionerModes.Off
          : AirConditionerModes.NoChange,
      desiredTempC: state.targetTemp || -327.68,
      fanMode: state.fanMode || AirConditionerFanModes.NoChange,
      flags: 255,
    })
  }
}

export * from './types'
