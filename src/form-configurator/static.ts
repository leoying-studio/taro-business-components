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

export interface FormItemOptions {
    label: string,
    value: string | number
}

export interface Rule {
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
	 * 跳转的目标屏幕
	 */
	targetScreen?: string
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
		 * 控件属性
		 */
		props?: TextInputProps | SwitchProps | TextProps
	}
}

export interface FormConfigurationProps {
	/**
	 * 绑定数据源
	 */
	dataSource: ConfigurationItem[]
	/**
	 * 改变值的监听
	 */
	onValueChange: (values: any) => void
	/**
	 * 当前点击项
	 */
	onPress: (dataSource:ConfigurationItem, index: number) => void
}