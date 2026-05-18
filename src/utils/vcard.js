export const generateVCard = (contact) => {
  const vcard = `BEGIN:VCARD
VERSION:3.0
N:${contact.lastName};${contact.firstName};;;
FN:${contact.fullName}
ORG:${contact.organization}
TITLE:${contact.title}
TEL;TYPE=WORK,VOICE:${contact.phone}
EMAIL;TYPE=PREF,INTERNET:${contact.email}
URL:${contact.url}
URL;TYPE=LinkedIn:${contact.linkedin}
URL;TYPE=YouTube:${contact.youtube}
URL;TYPE=Instagram:${contact.instagram}
URL;TYPE=Facebook:${contact.facebook}
URL;TYPE=GitHub:${contact.github}
END:VCARD`;

  return vcard;
};
