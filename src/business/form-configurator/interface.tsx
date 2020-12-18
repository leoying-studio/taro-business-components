import { InputProps } from "@tarojs/components/types/Input";
import { PickerDateProps } from "@tarojs/components/types/Picker";
import { SwitchProps } from "@tarojs/components/types/Switch";
import { TextProps } from "@tarojs/components/types/Text";
import { CSSProperties } from "react";

type WidgetType = 
 'switch' |
 'picker' | 
 'image-picker' | 
 'text' |
 'date-picker' | 
 'city-picker' | 
 'textarea' |
 'age-range-picker'|
 'input' | 
 'date-month';

export interface FormItemOptions {
    label: string,
    value: string | number
}

export interface Rule {
    test: any;
    message: string,
    metch: RegExp,
}

export interface ConfigurationItem {
	/**
	 * item左侧的名称
	 */
	name: string,
	/**
	 * 是否必填, true 会展示星号
	 */
	required?: boolean 
	/**
	 * 服务端对应的字段名称
	 */
	field: string
	/**
	 * 映射的key
	 */
	mapField?: string
	/**
	 * 跳转的目标屏幕
	 */
	targetScreen?: {
		name: string,
		params: any
	}
	/**
	 * 是否只读, 不可操作和修改
	 */
	readonly?: boolean
	/**
	 * 控件相关的属性
	 */
	widget: {
		type: WidgetType,
		/**
		 * 控件的options选项
		 */
		options?: FormItemOptions[]
	
		props?: InputProps | SwitchProps | TextProps | PickerDateProps | any
	}
	/**
	 * 没有值的时候的提示信息
	 */
	hint?: string,
	/**
	 * 单位 比如 cm,mm
	 */
	unit?: string
	/**
	 * 正则匹配验证规则，多用于文本框
	 */
	rules?: Rule[]
}


export interface FormConfigurationProps {
	/**
	 * 禁用
	 */
	disabled?: boolean
	/**
	 * 默认值，非value，使用的时候仅仅在初次给一个默认的，(不建议频繁更新默认值，如绑定当前值作为默认值)
	 */
	defaultValues?: any
	/**
	 * 绑定数据源
	 */
	dataSource: ConfigurationItem[]
	/**
	 * 改变值的监听
	 */
	onValueChange?: (values: any) => void
	/**
	 * 当前点击项
	 */
	onPress?: (dataSource: ConfigurationItem, index: number) => void
	/**
	 * itemStyle
	 */
	itemStyle?: CSSProperties
	/**
	 * wrapperStyle
	 */
	style?: CSSProperties
}