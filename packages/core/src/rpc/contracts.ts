import * as S from "@effect/schema/Schema";
import { defineContract, rpc } from "electron-effect-rpc/contract";

export const AppRpcError = S.Struct({
  code: S.String,
  message: S.String,
});

export const GetBootstrapData = rpc(
  "GetBootstrapData",
  S.Struct({}),
  S.Struct({
    appName: S.String,
    message: S.String,
    timestamp: S.String,
  }),
  AppRpcError,
);

export const appContract = defineContract({
  methods: [GetBootstrapData] as const,
  events: [] as const,
});
