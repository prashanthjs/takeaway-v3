import React, { FC, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useFormContext } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { Button, Card, CardBody, cn, Image } from '@heroui/react';
import { XCircle } from 'lucide-react';
import { isFile } from '@/utils/common';

type FileInputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  label?: string;
  dropMessage?: string;
  name: string;
  accept?: Record<string, string[]>;
};

export const FileInput: FC<FileInputProps> = props => {
  const t = useTranslations('common.form.fileInput');
  const { name, label = name } = props;
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();
  const files: File[] | string[] = watch(name);

  const isDisabled = props.disabled || !props.multiple ? files?.length >= 1 : false;
  // @ts-ignore
  const onDrop = droppedFiles => {
    setValue(name, [...(files || []), ...droppedFiles], { shouldValidate: true });
  };

  const handleDelete = (fileName: string) => {
    const newFiles = files.filter(file => {
      if (isFile(file)) {
        return file.name !== fileName;
      } else {
        return file !== fileName;
      }
    });
    setValue(name, newFiles, { shouldValidate: true });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: props.accept || {
      'image/*': ['.png', '.gif', '.jpg', '.jpeg'],
    },
    multiple: props.multiple,
    disabled: isDisabled,
  });
  useEffect(() => {
    register(name);
  }, [register, name]);

  return (
    <div className="relative flex flex-col gap-2">
      <label className="text-foreground-500" htmlFor={name}>
        {label}
      </label>
      <div {...getRootProps()}>
        <Card className={cn(isDragActive ? 'bg-content2' : '', isDisabled ? 'opacity-20' : '')} isDisabled={isDisabled}>
          <CardBody>
            <input
              {...props}
              className={cn(
                'focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none',
              )}
              id={name}
              {...getInputProps()}
            />
            <p className="py-2 text-center">{props.dropMessage || t('dropMessage')}</p>
          </CardBody>
        </Card>
      </div>
      <div className="flex flex-row flex-wrap gap-2 pt-4">
        {files?.map(file => {
          return (
            <div key={isFile(file) ? file.name : file} className={'relative'}>
              <Image
                src={isFile(file) ? URL.createObjectURL(file) : file}
                alt={''}
                width={100}
                height={100}
                isZoomed={true}
              />
              <Button
                isIconOnly
                color="danger"
                aria-label="Delete"
                className="absolute -right-1 -top-1 z-10"
                size={'sm'}
                onPress={() => handleDelete(isFile(file) ? file.name : file)}
              >
                <XCircle size={20} />
              </Button>
            </div>
          );
        })}
      </div>

      {errors[name] && <p className="text-xs text-red-500">{(errors as any)?.[name]?.message}</p>}
    </div>
  );
};
