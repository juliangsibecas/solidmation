import { GetDataPacketRes, RawHome } from "./types";
import { filterAirConditioners, parseHome } from "./utils";

import { base } from "../common/base";
import { AirConditioner } from "../airconditioner";

export class Home {
  private _id: number;
  private _name: string;
  private _dataPacketSerials = {
    Home: 0,
    Groups: 0,
    Devices: 0,
    Endpoints: 0,
    EndpointValues: 0,
    Scenes: 0,
    Macros: 0,
    Alarms: 0,
  };

  constructor(raw: RawHome) {
    const { id, name } = parseHome(raw);

    this._id = id;
    this._name = name;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  async getAirConditioners(): Promise<Array<AirConditioner>> {
    const data: GetDataPacketRes = await base.post(
      "/HomeCloudService.svc/GetDataPacket",
      {
        homeID: this.id,
        serials: this._dataPacketSerials,
        timeOut: 10000,
      }
    );

    return filterAirConditioners(data.GetDataPacketResult).map(
      (rawAirConditioner) => new AirConditioner(rawAirConditioner)
    );
  }
}

export * from "./types";
