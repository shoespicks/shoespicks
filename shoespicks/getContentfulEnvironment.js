const contentfulManagement = require('contentful-management');

const managementAccessToken =
  'CFPAT-G_eY1IGR5nn4aH0SCGf_4jNR7USsS5DMilMQmbfEwAY';
const spaceId = 'ah6alnkqn7mz';
const environmentId = 'master';

module.exports = function () {
  const contentfulClient = contentfulManagement.createClient({
    accessToken: managementAccessToken
  });

  return contentfulClient
    .getSpace(spaceId)
    .then((space) => space.getEnvironment(environmentId));
};
