'use client';

import { z } from 'zod';

import { useFormValidationMessages } from './use-form-validation-messages';

export default function useFormValidations() {
  const validationMessages = useFormValidationMessages();

  const getNameValidation = (control: string) =>
    z
      .string({
        required_error: validationMessages.getRequiredMessage(control),
      })
      .min(2, validationMessages.getMinMessage(control, 2))
      .regex(/^[a-z][a-z0-9-_]*$/, validationMessages.getIdMessage(control))
      .max(32, validationMessages.getMaxMessage(control, 12));

  const getTitleValidation = (control: string) =>
    z
      .string({
        required_error: validationMessages.getRequiredMessage(control),
      })
      .min(2, validationMessages.getMinMessage(control, 2))
      .max(32, validationMessages.getMaxMessage(control, 12));

  const getDescriptionValidation = (control: string) =>
    z.string().max(256, validationMessages.getMaxMessage(control, 256)).optional();
  const getWeightValidation = (control: string) =>
    z.coerce
      .number()
      .int({
        message: validationMessages.getIntMessage(control),
      })
      .optional();
  const getBooleanStringValidation = (control: string) => z.string();
  const getBooleanValidation = (control: string) => z.boolean().optional();
  const getMultipleImageValidation = (control: string) =>
    z
      .array(z.string().or(z.instanceof(File)))
      .optional()
      .nullable();
  const priceValidation = (control: string) =>
    z.coerce.number({
      required_error: validationMessages.getRequiredMessage(control),
    });

  const getTagsValidation = (control: string) => z.array(z.string()).optional();
  const getSelectMinOneValidation = (control: string) =>
    z.array(z.string()).min(1, validationMessages.getSelectOneMessage(control));

  const getTextValidation = (
    control: string,
    { min, max, isRequired = true }: { min?: number; max?: number; isRequired?: boolean },
  ) => {
    const zInstance = z
      .string({
        required_error: validationMessages.getRequiredMessage(control),
      })
      .min(isRequired ? min || 2 : 0, validationMessages.getMinMessage(control, min || 2))
      .max(max || 16, validationMessages.getMaxMessage(control, max || 16));
    return isRequired ? zInstance.optional() : zInstance;
  };

  const getEmailValidation = (control: string) =>
    z
      .string({
        required_error: validationMessages.getRequiredMessage(control),
      })
      .email(validationMessages.getEmailMessage(control));

  return {
    getNameValidation,
    getTitleValidation,
    getDescriptionValidation,
    getWeightValidation,
    getBooleanStringValidation,
    getMultipleImageValidation,
    priceValidation,
    getTagsValidation,
    getSelectMinOneValidation,
    getTextValidation,
    getBooleanValidation,
    getEmailValidation,
  };
}
