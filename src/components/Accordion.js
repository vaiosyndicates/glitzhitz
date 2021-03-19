import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import { List } from 'react-native-paper';
import { Button } from 'react-native-paper';
import { ToggleButton } from 'react-native-paper';

const Accordions = ({datas}) => {

  const [data, setData] = useState([]);

  useEffect(() => {
    const expanding = () => {
      const newState = datas.data.map((cur, i) => {
       cur.subService.map((current, key) => {
         current.isAdds = true;
         current.isMins = false;
         return {...current};
       })
       return {...cur};
      })

      setData(newState);
    }
    expanding();
  }, [])

 const handleAddService = (ids) => {
  const newState = datas.data.map((cur, i) => {
    cur.subService.map((current, key) => {
      if(current.id === ids) {
        current.isAdds = false;
        current.isMins = true;
      }
      return {...current};
    })
    return {...cur};
   })

   setData(newState);
 };

 const handleMinService = (ids) => {
  const newState = datas.data.map((cur, i) => {
    cur.subService.map((current, key) => {
      if(current.id === ids) {
        current.isAdds = true;
        current.isMins = false;
      }
      return {...current};
    })
    return {...cur};
   })
   setData(newState);
};


  return (
    <>
      {data.length > 0 && data.map((current, i) => {
        return (
          <List.AccordionGroup>
            <List.Accordion title={current.name} id="1">
            {current.subService.length > 0 && current.subService.map((cur, key) => {
              console.log(cur);
              return (
                <List.Item title={cur.name} right={props => 
                  <>
                    {cur.isMins && <Button icon={require('../../img/glitz/minus.png')} mode="outlined" style={styles.buttons} onPress={() => handleMinService(cur.id)} /> }
                    {cur.isAdds && <Button icon={require('../../img/glitz/adds.png')} mode="outlined" style={styles.buttons} onPress={() => handleAddService(cur.id)} /> }
                  </>
                }
                />
              );
            })}
            </List.Accordion>
          </List.AccordionGroup>
        );
     })}
    </>
  );
}

export default Accordions

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'yellow',
    padding: 10,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 16,
    color: 'red',
    zIndex: 1,
  },
  buttons: {
    borderWidth: 0,
  }
})
