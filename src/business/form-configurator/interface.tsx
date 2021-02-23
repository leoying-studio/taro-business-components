import { ImageProps } from "@tarojs/components/types/Image";
import { InputProps } from "@tarojs/components/types/Input";
import { PickerDateProps } from "@tarojs/components/types/Picker";
import { SwitchProps } from "@tarojs/components/types/Switch";
import { TextProps } from "@tarojs/components/types/Text";
import { CSSProperties } from "react";
import { AtTextareaProps } from "taro-ui/types/textarea";

type WidgetType = 
 'switch' |
 'picker' | 
 'image-picker' | 
 'text' |
 'date-picker' | 
 'region-picker' | 
 'textarea' |
 'age-range-picker'|
 'input' | 
 'date-month-picker';
 
export interface FormItemOptions {
    label: string,
    value: string | number
}

export interface Rule {
    test: any;
    message: string,
    metch: RegExp,
}


export interface ImageUploaderProps extends ImageProps {
	count?: number
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
	 * 服务端对应的字段名称, 如果有范围值比如minAge, maxAge 等可以按照顺序填写多个
	 */
	fields: string | string[]
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
		/**
		 * 正则匹配验证规则，多用于文本框
		 */
		rules?: Rule[]
		/**
		 * 控件的默认属性
		 */
		props?: InputProps | SwitchProps | TextProps | PickerDateProps | ImageUploaderProps | AtTextareaProps
	}
	/**
	 * 没有值的时候的提示信息
	 */
	hint?: string
}


export interface FormConfigurationProps {
	jointsComponents?: [],
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
	 * itemStyle
	 */
	itemStyle?: CSSProperties
	/**
	 * wrapperStyle
	 */
	style?: CSSProperties
	/**
	 * 模板样式
	 */
	template?: React.FunctionComponent

}