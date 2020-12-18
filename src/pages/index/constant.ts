import { ConfigurationItem } from "@/components/form-configurator/interface";
import { FormItemConfig } from "./static";

export enum VerifyStatusEnum {
    /**
     * 待完善
     */
    remain = 0,
    /**
     * 审核通过
     */
    ok = 2,
    /**
     * 审核中
     */
    reviewed = 1,
    /**
     * 驳回
     */
    reject = 3
}

export const BasicDataSource:ConfigurationItem[]  = [
    {
        name: '昵称',
        field: 'nickName',
        required: false,
        widget: {
           type: 'input',
           props: {
               placeholder: '请输入昵称'
           } 
        }
    },
    {
        name: '性别',
        field: 'gender',
        hint: '请选择',
        required: true,
        widget: {
           type: 'picker',
           props: {
              options: false
           },
           options: [
            { label: "男", value: 1 },
			{ label: "女", value: 2 },
           ]
        }
    },
    {
        name: '婚姻状况',
        field: 'maritalStatus',
        hint: '请选择',
        required: true,
        widget: {
           type: 'picker',
           props: {
              
           },
           options: [
			{ label: "未婚", value: 1 },
			{ label: "离异", value: 2 },
			{ label: "丧偶", value: 3 },
           ]
        }
    },
    {
        name: '所在地',
        field: 'areaCode',
        hint: '请选择',
        required: true,
        mapField: 'cityName',
        widget: {
           type: 'city-picker',
           props: {
               
           } 
        }
    },
    {
        name: '出生日期',
        field: 'birthday',
        hint: '请选择',
        required: true,
        widget: {
           type: 'date-month',
           props: {
               
           } 
        }
    },
    {
        name: '身高',
        field: 'height',
        hint: '请选择',
        required: true,
        widget: {
           type: 'picker',
           props: {
               value: 170
           },
           options: Array(61)
           .fill(null)
           .map((item, index) => {
               return {
                   value: index + 140,
                   label: index + 140 + "cm",
               };
           }),
        }
    },
    {
        name: '学历',
        field: 'educationBackground',
        hint: '请选择',
        required: true,
        widget: {
           type: 'picker',
           props: {
               
           },
           options: [
			{ label: "初中及以下", value: 1 },
            { label: "高中", value: 2 },
            { label: "大专", value: 3 },
            { label: "本科", value: 4 },
            { label: "研究生及以上", value: 5 },
		    ]
        }
    },
    {
        name: '月收入',
        field: 'monthlyProfile',
        hint: '请选择',
        required: true,
        widget: {
           type: 'picker',
           props: {
               
           },
           options:[
			{ label: "2000以下", value: 1 },
			{ label: "2000～4000", value: 2 },
			{ label: "4000~6000", value: 3 },
			{ label: "6000~10000", value: 4 },
			{ label: "10000~20000", value: 5 },
			{ label: "20000以上", value: 6 },
           ]
        }   
    }
]


export const DetailsDataSource:ConfigurationItem[]  = [
    {
        name: '是否购房',
        field: 'hasHouse',
        required: false,
        widget: {
           type: 'picker',
           props: {
               placeholder: '请选择'
           },
           options: [
            { label: "是", value: 1 },
			{ label: "否", value: 2 },
           ]
        }
    },
    {
        name: '是否购车',
        field: 'hasCar',
        hint: '请选择',
        required: false,
        widget: {
           type: 'picker',
           props: {
              options: false
           },
           options: [
			{ label: "是", value: 1 },
			{ label: "否", value: 2 },
		],
        }
    },
    {
        name: '体重',
        field: 'weight',
        hint: '请选择',
        required: false,
        widget: {
           type: 'picker',
           props: {
              defaultValue: 60
           },
           options: Array(71)
           	.fill(null)
            .map((item, index) => {
                return {
                    value: index + 30,
                    label: index + 30 + "kg",
                };
            }),
        }
    },
    {
        name: '职业',
        field: 'occupation',
        hint: '请选择',
        required: false,
        widget: {
           type: 'picker',
           props: {
               
           },
           options: [
			{ label: "公务员", value: 1 },
			{ label: "企事业单位", value: 2 },
			{ label: "私营业主", value: 3 },
			{ label: "高级管理", value: 4 },
			{ label: "仓储/物流/运输", value: 5 },
			{ label: "生产/加工/制造", value: 6 },
			{ label: "建筑/房地产", value: 7 },
			{ label: "餐饮/旅游", value: 8 },
			{ label: "销售/市场", value: 9 },
			{ label: "公关/商务", value: 10 },
			{ label: "医疗/美容/保健", value: 11 },
			{ label: "金融/证券/投资/保险", value: 12 },
			{ label: "教育/培训", value: 13 },
			{ label: "计算机/互联网/IT", value: 14 },
			{ label: "财会/审计", value: 15 },
			{ label: "法律", value: 16 },
			{ label: "在校学生", value: 17 },
			{ label: "其他", value: 18 },
		],
        }
    },
    {
        name: '有无子女',
        field: 'hasChildren',
        hint: '请选择',
        required: false,
        widget: {
           type: 'picker',
           props: {
               
           },
           options: [
			{ label: "有", value: 1 },
			{ label: "无", value: 2 },
		  ],
        }
    },
    {
        name: '家乡',
        field: 'nativeLand',
        hint: '请选择',
        mapField: 'nativeLandName',
        required: false,
        widget: {
           type: 'city-picker',
           props: {
               
           }
        }
    },
    {
        name: '户籍',
        field: 'householdRegister',
        mapField: 'householdRegisterName',
        hint: '请选择',
        required: false,
        widget: {
           type: 'city-picker',
           props: {
               
           }
        }   
    },
    {
        name: '是否独生子女',
        field: 'onlyChild',
        hint: '请选择',
        required: false,
        widget: {
           type: 'picker',
           props: {
               
           },
           options: [
			{ label: "是", value: 1 },
			{ label: "不是", value: 2 },
		],
        }   
    },
    {
        name: '家庭结构',
        field: 'familyStructure',
        hint: '请选择',
        required: false,
        widget: {
           type: 'picker',
           props: {
               
           },
           options: [
			{ label: "单亲", value: 1 },
			{ label: "非单亲", value: 2 },
		],
        }   
    },
    {
        name: '请上传照片',
        field: 'photo',
        required: false,
        widget: {
           type: 'image-picker',
           props: {
               count: 9
           }
        }   
    },
    {
        name: '补充信息',
        field: 'remark',
        required: false,
        widget: {
           type: 'textarea',
           props: {
               style: {
                height: '128rpx',
                border: 'none',
                padding: '0'
               },
               maxlength: 300,
               placeholderStyle: '#cccccc',
               placeholder: '您可以在这里补充更多信息 例如：性格、工作单位、父母工作情况、本人健康情况、爱好等等'
           }
        }   
    }
];


export const SpouseStandardSource: ConfigurationItem[] = [
    {
        name: "TA的年龄",
		field: "minAge",
        required: true,
        widget: {
            type: 'age-range-picker'
        }
    },
    {
        name: "TA的所在城市",
        field: "areaCode",
        mapField: 'cityName',
        required: true,
        widget: {
            type: 'city-picker',
            props: {
                option: true,
                number: 2
            }
        }
    },
    {
        name: 'TA的家乡',
        field: 'nativeLand',
        hint: '请选择',
        mapField: 'nativeLandName',
        required: true,
        widget: {
           type: 'city-picker',
           props: {
            option: true,
            number: 2
           }
        }
    },
    {
        name: 'TA的户籍',
        field: 'householdRegister',
        mapField: 'householdRegisterName',
        hint: '请选择',
        required: false,
        widget: {
           type: 'city-picker',
           props: {
            option: true,
            number: 2
           }
        }   
    },
    {
        name: 'TA的婚姻状况',
        field: 'maritalStatus',
        hint: '请选择',
        required: false,
        widget: {
           type: 'picker',
           props: {
              
           },
           options: [
            {label:"不限",value:0},
			{ label: "未婚", value: 1 },
			{ label: "离异", value: 2 },
			{ label: "丧偶", value: 3 },
           ]
        }
    },
    {
        name: 'TA有无子女',
        field: 'hasChildren',
        hint: '请选择',
        required: false,
        widget: {
           type: 'picker',
           props: {
               
           },
           options: [
			{ label: "有", value: 1 },
			{ label: "无", value: 2 },
		  ],
        }
    },
    {
        name: 'TA的学历',
        field: 'educationBackground',
        hint: '请选择',
        required: false,
        widget: {
           type: 'picker',
           props: {
               
           },
           options: [
			{label:"不限",value:0},
			{ label: "初中及以下", value: 1 },
            { label: "高中", value: 2 },
            { label: "大专", value: 3 },
            { label: "本科", value: 4 },
            { label: "研究生及以上", value: 5 },
		    ]
        }
    },
    {
        name: 'TA的月收入',
        field: 'monthlyProfile',
        hint: '请选择',
        required: false,
        widget: {
           type: 'picker',
           props: {
               
           },
           options:[
            {label:"不限",value:0},
			{ label: "2000以下", value: 1 },
			{ label: "2000～4000", value: 2 },
			{ label: "4000~6000", value: 3 },
			{ label: "6000~10000", value: 4 },
			{ label: "10000~20000", value: 5 },
			{ label: "20000以上", value: 6 },
           ]
        }   
    },
    {
        name: '是否要求有房',
        field: 'hasHouse',
        required: false,
        hint: '请选择',
        widget: {
           type: 'picker',
           props: {
              
           },
           options: [
            { label: "是", value: 1 },
			{ label: "否", value: 2 },
           ]
        }
    },
    {
        name: '是否要求有车',
        field: 'hasCar',
        hint: '请选择',
        required: false,
        widget: {
           type: 'picker',
           props: {
              options: false
           },
           options: [
                { label: "是", value: 1 },
                { label: "否", value: 2 },
            ],
        }
    },
    {
        name: '补充信息',
        field: 'remark',
        required: false,
        widget: {
           type: 'textarea',
           props: {
               style: {
                height: '128rpx'
               },
               placeholderStyle: '#cccccc',
               placeholder: '您可以在这里补充更多信息 例如：性格、工作单位、父母工作情况、本人健康情况、爱好等等'
           }
        }   
    }
];


export const MatchmakerExtSource:ConfigurationItem[] = [
    {
        name: '嘉宾补充信息',
        field: 'ext',
        required: false,
        widget: {
            type: 'textarea',
            props: {
                style: {
                    height: '128rpx'
                },
                placeholderStyle: '#cccccc',
                placeholder: '您可以在这里补充更多信息例如：性格、工作单位、父母工作情况、本人健康情况、爱好等等'
            }
        }   
    },
    {
        name: '编号',
        field: 'no',
        required: false,
        widget: {
            type: 'input',
            props: {
                style: {
                    height: '128rpx'
                },
                placeholderStyle: '#cccccc',
                placeholder: '请输入嘉宾编号'
            }
        }   
    }
];