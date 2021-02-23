import React, { Component, useEffect, useMemo, useRef, useState } from "react";
import { View, Text, Picker, Input } from "@tarojs/components";
import Taro, { render, useRouter } from "@tarojs/taro";
import { ConfigurationItem, ImageUploaderProps } from "./interface";
import { AtIcon, AtSwitch, AtTextarea } from "taro-ui";
import { getRange, getMonthRange, shallowEqual } from "./shared-utils";
import { InputProps } from "@tarojs/components/types/Input";
import { throttle } from "@/utils/performance";
import { useDatePicker } from "@/hooks/useDatePicker";
import { useRegionPicker } from "@/hooks/useRegionPicker";
import { useAgeRangePicker } from "@/hooks/useAgeRangePicker";
import { bunchy } from "@/utils/date";
import ImageUploader from "@/basic/image-uploader";
import { AtTextareaProps } from "taro-ui/types/textarea";
interface FormItemProps {
  onChoose: (e?: any, handler?: string, item?: ConfigurationItem) => void;
  data: ConfigurationItem;
  value: any;
}

const FormItem = React.memo(({ data, value, onChoose }: FormItemProps) => {
  // 设置控件懒加载
  const { type, props = {}, options = [] } = data.widget || {};
  const [val, setVal] = useState(value);
  const datePicker = useDatePicker();
  const regionPicker = useRegionPicker();
  const ageRangePicker = useAgeRangePicker();
  const fields = data.fields;

  if (type === 'date-picker') {
      console.log(val, 'vvvv')
  }

  const onClickItem = function () {
    if (type === "date-picker" || type === "date-month-picker") {
      const mode = type === "date-month-picker" ? "year-month" : "date";
      datePicker.show({
        date: val,
        mode,
        onChoose: function (value, handleType) {
            debugger
          const date = bunchy(value);
          setVal(date);
          onChoose && onChoose(date, handleType, data);
        },
      });
    } else if (type === "age-range-picker") {
      ageRangePicker.show({
        onChoose(value, handleType) {
          setVal(value);
          onChoose && onChoose(value, handleType, data);
        },
      });
    } else if (type === "region-picker") {
      regionPicker.show({
        onChoose(value, handleType) {
          // setVal({
          //     ...val
          // })
          onChoose && onChoose(value, handleType, data);
        },
      });
    } else if (type === "picker") {
    }
  };

  const onInput = function (e: InputProps.inputEventDetail) {
    setVal(e.value);
    onChoose && onChoose(e, "input", data);
  };

  const getClasses = function () {
    const className =
      typeof val !== "undefined" ? "placeholder selector" : "placeholder";
    return className;
  };

  const renderRight = () => {
    if (type === "input") {
      return (
        <Input
          {...(props as InputProps)}
          className="input"
          value={val}
          onInput={throttle(onInput, 300)}
        ></Input>
      );
    }

    if (type === "switch") {
      return (
        <AtSwitch
          checked={!!value}
          color="#FF345F"
          onChange={(value) => onChoose(value, "switch", data)}
        />
      );
    }

    const option = options.find((option) => {
      option.value === Number(value);
    });
    // debugger
    const hideArrows = data.readonly;
    let displayText = option ? option.label : val ? val : data.hint;

    if (type === "region-picker") {
      const regionName = (fields as string[]).find(
        (field) => typeof val[field] === "string"
      );
      const regionCode = (fields as string[]).find(
        (field) => typeof val[field] === "string"
      );
      if (regionName) {
        displayText = (regionName as string).split(",").join("-");
      }
      if (!regionCode) {
        displayText = "不限";
      }
    }

    if (type === "age-range-picker" && val) {
      const { start, end } = getRange();
      const [minKey, maxKey] = fields || [];
      const minOpt = start.find((item) => item.value === val[minKey]);
      const maxOpt = end.find((item) => item.value === val[maxKey]);
      displayText = minOpt?.label + "-" + maxOpt?.label;
      if (
        minOpt?.value === start[1].value &&
        maxOpt?.value === end[end.length - 1].value
      ) {
        displayText = "不限";
      }
    }
    return (
      <View
        style={{ display: "flex", alignItems: "center" }}
        className="card-right"
      >
        <Text className={getClasses()}>{displayText}</Text>
        {hideArrows ? null : (
          <AtIcon value="chevron-right" size="18" color="#999999"></AtIcon>
        )}
      </View>
    );
  };

  const spaceCls = data.required ? "label required" : "label";
  const statiCls = data.required ? "headline required" : "headline";

  if (type === "textarea") {
    return (
      <View className="card">
        <View className={statiCls}>{data.name}</View>
        <View style={{ marginTop: "10rpx" }}>
          <AtTextarea
            {...(props as AtTextareaProps)}
            value={val}
            onChange={throttle(onInput, 300)}
          ></AtTextarea>
        </View>
      </View>
    );
  }

  if (type === "image-picker") {
    return (
      <View className="card card-photo">
        <View className={statiCls}>
          {data.name}（最多{(props as ImageUploaderProps).count}张）
        </View>
        <ImageUploader onChange={() => {}} defaultUris={val as string} />
      </View>
    );
  }

  return (
    <View className="card card-item" onClick={onClickItem}>
      <View>
        <Text className={spaceCls}>{data.name}</Text>
      </View>
      {renderRight()}
    </View>
  );

  //  if (type === 'picker') {
  //      let defaultValue = pickerValue < 0 ? 0 : pickerValue;
  //      if (props.value && !defaultValue) {
  //          defaultValue = (options).findIndex((option) => {
  //              return option.value === props.value;
  //          })
  //      }
  //      return (
  //          <Picker
  //              mode="selector"
  //              value={defaultValue}
  //              range={options}
  //              rangeKey="label"
  //              onChange={onChange}>
  //              {innerView}
  //          </Picker>
  //      )
  //  }
});

function isEqual(prevProps, nextProps) {
    // return !shallowEqual(prevProps || {}, nextProps || {})
  //     const { maxAge, minAge} = prevProps.values || {};
  //     const nextValues = nextProps.values || {};
  //     const type = nextProps.data?.widget?.type;
  //     if (type === 'age-range-picker') {
  //         return nextValues.maxAge === maxAge && nextValues.minAge === minAge;
  //     }
  //     const { field, mapField } = prevProps.data || {};
  //     const preVal = prevProps.values[field];
  //     const nextVal = nextProps.values[field];
  //     const preName = prevProps.values[mapField];
  //     const nextName = nextProps.values[mapField];
  //     if (preVal !== nextVal || preName !== nextName) {
  //         return false;
  //     }
  //    return false;
  return false;
}

export default FormItem;
