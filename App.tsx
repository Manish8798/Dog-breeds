import React from 'react';
import {
  FlatList,
  SafeAreaView,
  View,
  Text,
  ScrollView,
  Image,
} from 'react-native';

const App = () => {
  const [result, setResult] = React.useState([]);
  React.useEffect(() => {
    fetchApi();
  }, []);
  const fetchApi = () => {
    return fetch('https://api.thedogapi.com/v1/breeds/')
      .then(res => res.json())
      .then(json => {
        setResult(json);
        // console.log('fetch', json[0]?.name)
      })
      .catch(err => {
        console.log(err);
      });
  };

  const ListItem = React.memo(({ name, image, index }) => (
    <View
    // key={index}
    style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginHorizontal: 10,
      marginVertical: 10,
      borderRadius: 20,
      borderColor: '#fff',
      borderWidth: 1,
      padding: 10,
      backgroundColor: index % 2 == 0 ? '#1967D2' : '#0B8043',
    }}>
    <Text
      style={{
        padding: 10,
        fontWeight: 'bold',
        fontSize: 18,
        color: '#fff',
      }}>
      {name}
    </Text>
    <Image
      style={{width: 50, height: 50, borderRadius: 20}}
      source={{uri: image?.url}}
    />
  </View>
  ));

  const renderItem = React.useCallback(({ item, index }) => <ListItem name={item.name} image={item.image} index={index} />, []);


  return (
    <SafeAreaView>
      <FlatList
        data={result}
        contentContainerStyle={{
          backgroundColor: '#fff'
        }}
        // renderItem={({item, index}) => {
        //   return (
        //     <View
        //       key={index}
        //       style={{
        //         flexDirection: 'row',
        //         justifyContent: 'space-between',
        //         alignItems: 'center',
        //         marginHorizontal: 10,
        //         marginVertical: 10,
        //         borderRadius: 20,
        //         borderColor: '#fff',
        //         borderWidth: 1,
        //         padding: 10,
        //         backgroundColor: index % 2 == 0 ? '#1967D2' : '#0B8043',
        //       }}>
        //       <Text
        //         style={{
        //           padding: 10,
        //           fontWeight: 'bold',
        //           fontSize: 18,
        //           color: '#fff',
        //         }}>
        //         {item?.name}
        //       </Text>
        //       <Image
        //         style={{width: 50, height: 50, borderRadius: 20}}
        //         source={{uri: item?.image?.url}}
        //       />
        //     </View>
        //   );
        // }}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

export default App;
