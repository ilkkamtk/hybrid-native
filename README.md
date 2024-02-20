# Bugeja

- Ohjeista home pois
- Expo ei tee src kansioita??
- Safe area: <https://docs.expo.dev/develop/user-interface/safe-areas/>
- Muista kommentoida DBTypes: graphql vs rest api
- Tyyppi korjattu:

  ```typescript
  const postMedia = (
   file: UploadResponse, // tässä oli väärä tyyppi
   inputs: Record<string, string>,
   token: string,
  )....
  ```

- Ei liity tähän: Comment tyyppi on Javascriptissa, joten tulevaisuudessa sen nimeä vois ehkä vaihtaa. Kenties.
- .env virtuaalikoneen osoitteista https->http
- Kuville sama: `item.thumbnail = item.thumbnail.replace('https', 'http');` ja `item.filename = item.filename.replace('https', 'http');`
