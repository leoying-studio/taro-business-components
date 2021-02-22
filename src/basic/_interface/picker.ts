import { CSSProperties } from "react";

export interface PickerOption {
    label: string,
    value: string | number
}

export interface PickerPropsStyle {
    columnStyle?: CSSProperties
    textStyle?: CSSProperties
    activeTextStyle?: CSSProperties
    style?:CSSProperties
}