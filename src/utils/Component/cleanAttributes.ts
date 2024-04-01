export const JSON_ONLY_PROPERTIES = [
  'source',
  'use',
  'show_when',
  'options',
  'additionalValidation',
  'full_path',
  'fullPath',
  'formData'
];

const cleanAttributes = (options: Record<string, unknown>, alsoRemove: Array<[]>) => {
  const removeKeys = Array.isArray(alsoRemove) ? [...JSON_ONLY_PROPERTIES, ...alsoRemove] : JSON_ONLY_PROPERTIES;
  if (options && typeof options === 'object') {
    Object.keys(options).reduce((obj: object, key: string) => {
      if (!removeKeys.includes(key)) {
        return {
        ...obj,
        [key]: options[key]
        };
      }
      return obj;
    }, {});
  }
  return {};
};

export default cleanAttributes;
