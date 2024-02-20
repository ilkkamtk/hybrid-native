import {useState} from 'react';
import {
  Image,
  ImageStyle,
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';

const AsyncImage = ({
  source,
  style,
}: {
  source: {uri: string};
  style: ImageStyle;
}) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <Image
        onLoad={() => setLoaded(true)}
        source={source}
        resizeMode={'contain'}
        style={[
          style,
          {
            resizeMode: 'cover',
          },
        ]}
      />
      {!loaded && (
        <View style={styles.indicator}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  indicator: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AsyncImage;
