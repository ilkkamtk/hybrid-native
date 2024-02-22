# Bugeja

- Ohjeista home pois
- Expo ei tee src kansioita??
- Safe area: <https://docs.expo.dev/develop/user-interface/safe-areas/>. Tulee React Navigationin mukana, joten siihen ei tartte tässä vaiheessa mennä.
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

## Routing

- kokeilin useNavigationia MediaListItemissä. Ei tartte lähettää navigation objektia propsina. Tyyppien löytämisessä haasteita, mutta löytyi: `const navigation: NavigationProp<ParamListBase> = useNavigation();`

## Profile

- rneui Rating ei toimi. npm install react-native-star-rating-widget sen sijasta.

## Upload

- Uploudia varten apiHooksiin tartti tehdä uusi funktio `postExpoFile`, joka käyttää `expo-file-system` kirjastoa. FormData täytyy unohtaa TypeScriptin kanssa react nativella. Oikeastaan tää on helmpompikin.

- Tehtiin muuten vikalla React tunnilla update context jo etukenossa grpahQLHooksiin, joten setTimeout hässäkän voi jättää pois. Lisäksi backend palauttaa sit vasta kun thumbnail on luotu, joten sitä ei tartte odottaa.

- Korjattu varoitus:

  ```text
  Require cycle: src/contexts/UserContext.tsx -> src/hooks/apiHooks.ts -> src/hooks/ContextHooks.ts -> src/contexts/UserContext.tsx

  Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle.
  ```

  `useUserContext`ja `useUpdateContext` hookit siirretty omiin tiedostoihin ja laitettu export default. Ens kerralla täytyy huomioida myös React osiossa vaikkei se siitä valittanutkaan.

- Vaihdoin apissa kuvien osoitteksi `//osoite` koska se toimii sekä http että https. Ei aiheuta muutoksia React puolella, mutta React Nativen puolella tarttee laittaa esim `source={{uri: 'http:' + item.thumbnail}}` tms. Silti .env virtuaalikoneen osoitteiksi https->http. Mutta aiemmin mainittua https->http muutosta ei tartte tehdä.
