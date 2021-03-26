import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import { List } from 'react-native-paper';
import { Button } from 'react-native-paper';
import { ToggleButton } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import {showError, showSuccess} from '../util/ShowMessage';

const Accordions = ({datas, isFlag}) => {

  const [data, setData] = useState([]);
  const carts = useSelector(state => state.cartReducer.cart);
  const dispatch = useDispatch();
  
  useEffect(() => {
    const expanding = () => {
     
      if(carts || carts.length > 0) {
        const newState = datas.data.map((cur, i) => {
          cur.subService.map((current, key) => {
          
            const idx = carts.findIndex((el) => {
              return el.id === current.id;
            });

            if(idx !== -1){
              current.isAdds = false;
              current.isMins = true;
            } else {
              current.isAdds = true;
              current.isMins = false;
            }

           
            return {...current};
          })
          return {...cur};
         })

         setData(newState);
      } else {

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
    }
    expanding();
  }, [])

 const handleAddService = (obj) => {
  try {
    const newState = data.map((cur, i) => {
      cur.subService.map((current, key) => {
        if(current.id === obj.id) {
          current.isAdds = false;
          current.isMins = true;
        }
        return {...current};
      })
      return {...cur};
    })
    showSuccess('Success add to cart');
    dispatch({type: 'ADD_CART', value: obj});
    setData(newState);

  } catch (error) {
    showError('Failed add to cart');
    console.log(error);
  }
 };

 const handleMinService = (obj) => {
   try {
    const newState = data.map((cur, i) => {
      cur.subService.map((current, key) => {
        if(current.id === obj.id) {
          current.isAdds = true;
          current.isMins = false;
        }
        return {...current};
      })
      return {...cur};
     })
     showSuccess('Success delete');
     dispatch({type: 'DELETE_CART', value: obj});
     setData(newState); 
   } catch (error) {
     showError('Failed delete');
     console.log(error);
   }
};


  return (
    <>
      {data.length > 0 && data.map((current, i) => {
        return (
          <React.Fragment key={i}>
            <List.AccordionGroup>
              <List.Accordion title={current.name} id="1">
              {current.subService.length > 0 && current.subService.map((cur, key) => {
                return (
                  <List.Item title={cur.name} key={key} right={props => 
                    <>
                      {cur.isMins && <Button icon={require('../../img/glitz/minus.png')} mode="outlined" style={styles.buttons} onPress={() => handleMinService({id: cur.id, name: cur.name, price: cur.price, parent: current.name})} /> }
                      {cur.isAdds && <Button icon={require('../../img/glitz/adds.png')} mode="outlined" style={styles.buttons} onPress={() => handleAddService({id: cur.id, name: cur.name, price: cur.price, parent: current.name})} /> }
                    </>
                  }
                  />
                );
              })}
              </List.Accordion>
            </List.AccordionGroup>
          </React.Fragment> 
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
