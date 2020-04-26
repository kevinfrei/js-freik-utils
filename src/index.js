// @flow
// @format

const FTON = require('./FTON');
const ObjUtil = require('./object');
const SeqNum = require('./SeqNum');
const ClientRPC = require('./ClientRPC');
const Comparisons = require('./Comparisons');

export type FTONData =
  | string
  | number
  | boolean
  | null
  | FTONObject
  | FTONArray
  | Map<string | number, FTONData>
  | Set<FTONData>;
export type FTONObject = { [key: string]: FTONData };
export type FTONArray = Array<FTONData>;

export type rpcMessageType = {
  func: string,
  args: FTONData,
  result?: string,
};

export type rpcHandlerType = Map<string, Function>;
export type SeqNumGenerator = {
  (): string,
  keyCompare: (a: string, b: string) => number,
};

module.exports = {
  FTON,
  ObjUtil,
  SeqNum,
  ClientRPC,
  Comparisons,
};
