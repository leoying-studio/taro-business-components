import React, { Component, useEffect, useMemo, useRef, useState } from "react";
import { View, Text, Picker } from "@tarojs/components";
import Taro, { render, useRouter } from "@tarojs/taro";
import { AtImagePicker } from "taro-ui";
import { AtImagePickerProps } from "taro-ui/types/image-picker";

interface FileModel {
	url: string
	file?: FileItem
}

interface FileItem {
	path: string
	size: number
}

interface ImageUploaderProps  {
	defaultUris?: string
	count?: number
	length?: number
	onChange: (urls: string) => void
}

const ImageUploader:React.FC<ImageUploaderProps> = ({
 defaultUris= '',
 length = 3,
 onChange,
 count = 9, ...otherProps}) => {
	const [imageIndex, setImageIndex] = useState(-1);
	const [urls, setUrls] = useState<string>(defaultUris);
	const onChangeCallRef = useRef(onChange);
	const callableRef = useRef(false);
	
	useEffect(() => {
		onChangeCallRef.current = onChange;
	})

	useEffect(() => {
		setUrls(defaultUris);
	}, [defaultUris])

	useEffect(() => {
		if (defaultUris !== urls && callableRef.current) {
			onChangeCallRef.current && onChangeCallRef.current(urls);
		}
	}, [defaultUris, urls])
	
	const files = useMemo(() => {
		if (!urls) {
			return [];
		}
		return urls.split(',').map((url, index) => {
			return {
				url,
				file: {
					path: url,
					size: 0
				}
			}
		})
	}, [urls]) as FileModel[]

	// 剩余的可以选择的数量
	const remainingQuantity = files.length ? count - files.length : 9;

	const onChangeImage = async function(files, operationType, index: number) {
		callableRef.current = true;
		let ps: string[] = urls ? urls.split(',') : [];
		const filesList = files.slice(9 - remainingQuantity)
			if (operationType === 'add') {
					Taro.showLoading({
						title: '图片上传中...',
					})
				for (let i = 0; i < filesList.length; i++) {
					// let resUpload = await uploadFile(filesList[i].url);
					// if (resUpload) {
					// 	ps.push(resUpload as string);
					// 	setUrls(ps.join(','))
					// }
				}
				Taro.hideLoading();
			} else if (operationType === 'remove') {
					ps?.splice(index, 1);
					setUrls(ps.join(','))
			}
	}

	return (
		<View>
			<AtImagePicker
				{...otherProps}
				length={length}
				files={files}
				count={count}
				onImageClick={(index, file) => {
					setImageIndex(index);
				}}
				onChange={onChangeImage}
			>
			</AtImagePicker> 
		</View>
	)
} 

export default ImageUploader;