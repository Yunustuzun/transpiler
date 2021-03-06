import {Character} from "../types";

export * from "./boolc";
export * from "./concat_lines_of";
export * from "./condense";
export * from "./count";
export * from "./escape";
export * from "./lines";
export * from "./reverse";
export * from "./strlen";
export * from "./substring";
export * from "./sy";
export * from "./to_lower";
export * from "./repeat";
export * from "./replace";
export * from "./to_upper";
export * from "./xstrlen";
export * from "./shift_left";
export * from "./abs";
export * from "./ceil";
export * from "./floor";
export * from "./frac";
export * from "./sign";
export * from "./trunc";
export * from "./nmin";
export * from "./nmax";
export const abap_true = new Character({length: 1}).set("X");
export const abap_false = new Character({length: 1}).set("");
export const abap_undefined = new Character({length: 1}).set("-");
export const space = new Character({length: 1}).set(" ");