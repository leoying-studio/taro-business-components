import { InputProps } from "@tarojs/components/types/Input";
import { PickerSelectorProps } from "@tarojs/components/types/Picker";
import { SwiperProps } from "@tarojs/components/types/Swiper";
type WidgetType = 'input' | 'switch' | 'picker' | 'image-picker' | 'text' | 'date-picker' | 'city-picker';

export interface FormItemOptions {
    label: string,
    value: string | number
}

export interface Rule {
    message: string,
    metch: RegExp,
}

export interface ConfigurationItem {
    name: string,
    type: WidgetType,
    options?: FormItemOptions[],
    rules?: Rule[],
    required?: boolean 
    field: string
    widgetProps: InputProps | SwiperProps | PickerSelectorProps
}

export interface ConfigurationProps {
    dataSource: ConfigurationItem[]
}