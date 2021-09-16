import fetch from "node-fetch";

import { loginUrl } from "./constants";
import { EnumHomesRes, LoginResBody } from "./types";

import { base } from "../common/base";
import { Home } from "../home";
import { AirConditioner } from "../airconditioner";

export class Core {
  async login(username: string, password: string): Promise<void> {
    const res = await fetch(loginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: username,
        password: password,
      }),
    });

    const body = (await res.json()) as LoginResBody;
    base.setToken(body.d);
  }

  async getHomes(): Promise<Array<Home>> {
    const enumHomes: EnumHomesRes = await base.post(
      "/HomeCloudService.svc/EnumHomes"
    );

    if (enumHomes.EnumHomesResult.ResponseStatus.Status !== 0) {
      throw Error(
        enumHomes.EnumHomesResult.ResponseStatus.Messages[0].Description
      );
    }

    return enumHomes.EnumHomesResult.Homes.map((rawHome) => new Home(rawHome));
  }

  async getDevices(): Promise<Array<AirConditioner>> {
    const homes = await this.getHomes();
    return (
      await Promise.all(homes.map((home) => home.getAirConditioners()))
    ).flat();
  }
}
