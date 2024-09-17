import { contactTypeList } from '../../constants/contacts.js';

const parseType = (contactType) => {
  if (typeof contactType !== 'string') return;
  return contactTypeList.includes(contactType) ? contactType : undefined;
};

const parseIsFavourite = (isFavourite) => {
  if (typeof isFavourite !== 'string') return;

  return isFavourite.toLowerCase() === 'true';
};

export const parseContactFilterParams = (query) => {
  const { contactType, isFavourite } = query;

  const parsedContactType = parseType(contactType);
  const parsedIsFavourite = parseIsFavourite(isFavourite);

  return {
    contactType: parsedContactType,
    isFavourite: parsedIsFavourite,
  };
};
